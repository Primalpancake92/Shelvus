import Icon from "../../../components/ui/Icon";

const tones = {
    sage: { tile: "bg-secondary text-primary", wave: "#a9bfa9" },
    sand: { tile: "bg-[#f3e2c8] text-[#b98a4e]", wave: "#e2cba7" }
};

// One headline number on the home page (e.g. "3 Books Borrowed"), with a soft
// wave drawn in the card's corner.
export default function StatCard({ icon, value, label, tone = "sage" }) {
    const { tile, wave } = tones[tone];

    return (
        <div className="relative flex items-center gap-8 overflow-hidden rounded-3xl border
        border-foreground/5 bg-[#f4f3ee]/95 px-8 py-5 shadow-[0_20px_40px_rgba(40,62,53,0.06)]">
            <div className={`flex w-20 h-20 shrink-0 items-center justify-center rounded-2xl ${tile}`}>
                <Icon name={icon} className="w-10 h-10" />
            </div>
            <div>
                <p className="text-4xl font-bold tabular-nums">{value}</p>
                <p className="mt-1 text-lg text-muted">{label}</p>
            </div>

            <svg viewBox="0 0 200 100" className="pointer-events-none absolute right-0 bottom-0 w-56"
            aria-hidden="true">
                <path d="M0 100C60 100 90 40 200 20V100z" fill={wave} opacity="0.35" />
                {[0, 6, 12, 18, 24].map((offset) => (
                    <path key={offset} d={`M${20 + offset} 100C80 ${95 - offset} 110 ${45 - offset / 2} 200 ${30 + offset}`}
                    fill="none" stroke={wave} strokeWidth="1" opacity="0.7" />
                ))}
            </svg>
        </div>
    );
}
