// Decorative scene for the home page greeting: an arched window onto green hills,
// a shelf of sage books, a plant and a steaming mug, with vines over the arch.
// Purely visual, so it's hidden from screen readers.

const books = [
    { x: 196, w: 22, h: 104, colour: "#3f6656" },
    { x: 218, w: 18, h: 112, colour: "#5f8a74" },
    { x: 236, w: 24, h: 98, colour: "#4f7a66" },
    { x: 260, w: 16, h: 108, colour: "#6e9580" },
    { x: 276, w: 22, h: 114, colour: "#3f6656" },
    { x: 298, w: 18, h: 100, colour: "#8aa596" }
];

// Leaves along a vine: [x, y, rotation]
const leftLeaves = [[150, 70, -30], [140, 98, 20], [156, 126, -40], [146, 156, 30], [162, 40, 10],
    [134, 186, -20], [150, 210, 40]];
const rightLeaves = [[412, 62, 30], [424, 92, -20], [408, 120, 40], [420, 150, -30], [400, 36, -10],
    [432, 180, 20], [416, 204, -40]];

function Leaf({ x, y, r }) {
    return (
        <ellipse cx={x} cy={y} rx="11" ry="6" transform={`rotate(${r} ${x} ${y})`}
        fill="#6f9a52" stroke="#55803f" strokeWidth="0.8" />
    );
}

export default function WindowIllustration({ className = "" }) {
    return (
        <svg viewBox="0 0 560 340" className={className} aria-hidden="true">
            <defs>
                <linearGradient id="home-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#b9d6e2" />
                    <stop offset="1" stopColor="#eef3ea" />
                </linearGradient>
                <linearGradient id="home-wall" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f1ebe0" />
                    <stop offset="1" stopColor="#e3d6c3" />
                </linearGradient>
                <clipPath id="home-window">
                    <path d="M215 290V130a85 85 0 0 1 170 0v160z" />
                </clipPath>
            </defs>

            {/* Soft sage halo behind the scene */}
            <path d="M40 340a240 240 0 0 1 480 0z" fill="#d5dfd3" opacity="0.55" />

            {/* Wall arch and window */}
            <path d="M170 300V130a130 130 0 0 1 260 0v170z" fill="url(#home-wall)" />
            <path d="M215 290V130a85 85 0 0 1 170 0v160z" fill="url(#home-sky)" />
            <g clipPath="url(#home-window)">
                <ellipse cx="262" cy="96" rx="26" ry="9" fill="#fff" opacity="0.85" />
                <ellipse cx="340" cy="118" rx="20" ry="7" fill="#fff" opacity="0.75" />
                <path d="M200 230l50-58 40 34 38-46 70 70v60H200z" fill="#8fae86" />
                <path d="M200 252l60-40 52 30 44-26 44 30v44H200z" fill="#6f9a6a" />
                <path d="M200 272l80-26 70 18 50-12v40H200z" fill="#55805a" />
            </g>
            {/* Window frame and glazing bars */}
            <path d="M215 290V130a85 85 0 0 1 170 0v160" fill="none" stroke="#c8ab85" strokeWidth="7" />
            <path d="M300 45v245M215 160h170M215 225h170" stroke="#c8ab85" strokeWidth="4" />

            {/* Sunlight falling across the wall */}
            <path d="M380 60l60 0-120 240h-60z" fill="#fff" opacity="0.18" />

            {/* Shelf */}
            <rect x="120" y="288" width="360" height="14" rx="3" fill="#d6bf9c" />
            <rect x="130" y="302" width="340" height="6" rx="2" fill="#000" opacity="0.06" />

            {/* Books standing on the shelf */}
            {books.map(({ x, w, h, colour }) => (
                <g key={x}>
                    <rect x={x} y={288 - h} width={w} height={h} rx="2" fill={colour} />
                    <rect x={x + 3} y={288 - h + 12} width={w - 6} height="3" fill="#c9b07f" opacity="0.8" />
                    <rect x={x + 3} y={288 - 22} width={w - 6} height="3" fill="#c9b07f" opacity="0.8" />
                </g>
            ))}
            {/* A leaning book and a small pile */}
            <rect x="318" y="190" width="18" height="100" rx="2" fill="#e6dccb"
            transform="rotate(14 318 290)" />
            <rect x="336" y="276" width="70" height="12" rx="2" fill="#e8dfcf" />
            <rect x="340" y="266" width="62" height="10" rx="2" fill="#7f9a74" />

            {/* Plant pot */}
            <path d="M150 262h30l-4 26h-22z" fill="#e3d6c3" />
            <path d="M165 262c-6-14-18-18-24-16 6 2 14 8 18 16M165 262c4-16 14-22 22-20-6 4-12 10-16 20"
            fill="#6f9a52" />

            {/* Mug with steam */}
            <path d="M420 250h40v30a8 8 0 0 1-8 8h-24a8 8 0 0 1-8-8z" fill="#f4f0e8"
            stroke="#d9cdb9" strokeWidth="1.5" />
            <path d="M460 258h6a8 8 0 0 1 0 16h-6" fill="none" stroke="#d9cdb9" strokeWidth="3" />
            <path d="M432 264c3-1.5 5-1.5 8 0v10c-3-1.5-5-1.5-8 0zM448 264c-3-1.5-5-1.5-8 0v10c3-1.5 5-1.5 8 0z"
            fill="none" stroke="#668573" strokeWidth="1.2" />
            <path d="M434 240c-6-8 6-12 0-20M446 242c-6-8 6-12 0-20" fill="none" stroke="#fff"
            strokeWidth="3" strokeLinecap="round" opacity="0.8" />

            {/* Vines over the arch */}
            <path d="M190 20c-20 30-40 60-30 110s-20 90-10 110" fill="none" stroke="#55803f" strokeWidth="2" />
            <path d="M410 20c20 30 30 60 18 110s20 90 6 110" fill="none" stroke="#55803f" strokeWidth="2" />
            {leftLeaves.map(([x, y, r]) => <Leaf key={`l${x}${y}`} x={x} y={y} r={r} />)}
            {rightLeaves.map(([x, y, r]) => <Leaf key={`r${x}${y}`} x={x} y={y} r={r} />)}
        </svg>
    );
}
