import { useState } from "react";

// Harmonic wave motion.
//
// Every point (x, y₀) on a wave moves vertically in simple harmonic motion:
//
//     y(t) = y₀ + A(x) · sin(θ − k·x),   θ = ωt + φ
//
//  - k·x makes the phase change along the curve, so the motion travels along
//    each line as a wave instead of the whole line bobbing in place.
//  - A(x) = A₀ · sin(π · (x − x₀) / (x₁ − x₀)) is an envelope that is zero at
//    both ends, so the wave's end points stay anchored.
//  - φ (the per-line delay) offsets each line's phase, so the motion also
//    ripples across the bundle.
//
// One period of θ (0 → 2π) is sampled at STEPS evenly spaced points and played
// with linear interpolation, so the browser follows the sine itself rather
// than an eased approximation.

const STEPS = 60;
const THETAS = Array.from({ length: STEPS + 1 }, (_, n) => (2 * Math.PI * n) / STEPS);
const AMPLITUDE = 22;               // A₀, in viewBox units
const WAVE_NUMBER = (2 * Math.PI) / 900; // k: one wavelength every 900 units

// A path is a list of segments: ["M", p], ["C", p, p, p], ["L", p] or ["Z"].
function displace(segments, theta, x0, x1) {
    const move = ([x, y]) => {
        const envelope = Math.sin((Math.PI * (x - x0)) / (x1 - x0));
        const dy = AMPLITUDE * envelope * Math.sin(theta - WAVE_NUMBER * x);
        return `${x} ${(y + dy).toFixed(1)}`;
    };
    return segments.map(([cmd, ...points]) => `${cmd}${points.map(move).join(" ")}`).join(" ");
}

const topLine = (i) => [
    ["M", [-40, 330 + i * 12]],
    ["C", [220, 230 + i * 12], [360, 250 + i * 4], [480, 150 + i * 6]],
    ["C", [560, 80 + i * 6], [620, 10 + i * 4], [720, -30 + i * 2]]
];

const bottomLine = (i) => [
    ["M", [760, 940 - i * 4]],
    ["C", [1000, 830 - i * 10], [1200, 780 - i * 8], [1340, 660 - i * 10]],
    ["C", [1440, 570 - i * 10], [1520, 520 - i * 8], [1660, 470 - i * 10]]
];

const crossLine = (i) => [
    ["M", [900, 960 - i * 3]],
    ["C", [1150, 900 - i * 6], [1300, 760 - i * 8], [1460, 700 - i * 6]],
    ["C", [1540, 670 - i * 5], [1600, 640 - i * 4], [1660, 600 - i * 4]]
];

const topBand = [
    ["M", [-40, 330]],
    ["C", [220, 230], [360, 250], [480, 150]],
    ["C", [560, 80], [620, 10], [720, -30]],
    ["L", [860, -30]],
    ["C", [760, 30], [660, 140], [560, 210]],
    ["C", [400, 320], [200, 300], [-40, 440]],
    ["Z"]
];

const bottomBand = [
    ["M", [760, 940]],
    ["C", [1000, 830], [1200, 780], [1340, 660]],
    ["C", [1440, 570], [1520, 520], [1660, 470]],
    ["L", [1660, 600]],
    ["C", [1520, 650], [1440, 720], [1320, 790]],
    ["C", [1160, 880], [980, 920], [860, 960]],
    ["Z"]
];

// Honour the system "reduce motion" setting by drawing the waves still.
const reduceMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// x0/x1 are where the envelope pins the wave; dur is the period in seconds;
// delay is the phase offset φ, expressed in seconds.
//
// clock is the wall-clock time (in seconds) when the background mounted. Starting
// each animation (clock mod dur) seconds into its cycle puts every page at the same
// point in the motion, so navigating between pages doesn't restart the waves.
function Wave({ segments, x0, x1, dur, delay = 0, clock, ...props }) {
    const offset = (clock % dur) + delay;

    return (
        <path d={displace(segments, 0, x0, x1)} {...props}>
            {!reduceMotion && (
                <animate attributeName="d" dur={`${dur}s`} begin={`-${offset.toFixed(3)}s`}
                repeatCount="indefinite" calcMode="linear"
                values={THETAS.map((theta) => displace(segments, theta, x0, x1)).join(";")} />
            )}
        </path>
    );
}

export default function WaveBackground() {
    const lines = Array.from({ length: 10 }, (_, i) => i);
    // Read once on mount; the SVG's own timeline starts at that same moment.
    const [clock] = useState(() => Date.now() / 1000);

    return (
        <div className="fixed inset-0 overflow-hidden bg-background" aria-hidden="true">
            <div className="absolute inset-0
            bg-[radial-gradient(ellipse_at_bottom,rgba(195,171,139,0.2),transparent_60%)]">
            </div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="hero-wave-top" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#668573" />
                        <stop offset="0.55" stopColor="#c3ab8b" />
                        <stop offset="1" stopColor="#c3ab8b" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="hero-wave-bottom" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#c3ab8b" stopOpacity="0" />
                        <stop offset="0.5" stopColor="#668573" />
                        <stop offset="1" stopColor="#c3ab8b" />
                    </linearGradient>
                    <filter id="hero-wave-blur">
                        <feGaussianBlur stdDeviation="18" />
                    </filter>
                </defs>

                <Wave clock={clock} segments={topBand} x0={-40} x1={860} dur={12}
                fill="url(#hero-wave-top)" opacity="0.45" filter="url(#hero-wave-blur)" />
                <g fill="none" stroke="url(#hero-wave-top)" strokeWidth="1.2">
                    {lines.map((i) => (
                        <Wave clock={clock} key={i} segments={topLine(i)} x0={-40} x1={720} dur={12}
                        delay={i * 0.35} opacity={0.4 + i * 0.06} />
                    ))}
                </g>

                <Wave clock={clock} segments={bottomBand} x0={760} x1={1660} dur={14}
                fill="url(#hero-wave-bottom)" opacity="0.4" filter="url(#hero-wave-blur)" />
                <g fill="none" stroke="url(#hero-wave-bottom)" strokeWidth="1.2">
                    {lines.map((i) => (
                        <Wave clock={clock} key={i} segments={bottomLine(i)} x0={760} x1={1660} dur={14}
                        delay={i * 0.35} opacity={0.4 + i * 0.06} />
                    ))}
                    {lines.map((i) => (
                        <Wave clock={clock} key={`cross-${i}`} segments={crossLine(i)} x0={900} x1={1660}
                        dur={16} delay={4 + i * 0.4} opacity={0.15 + i * 0.04} />
                    ))}
                </g>
            </svg>
        </div>
    );
}
