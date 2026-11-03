// A drawn book cover: a two-colour gradient, an optional desert scene, and the title.
// Stands in for real cover images until books have them.
export default function BookCover({ title, colours, textColour = "#fff", scene, className = "" }) {
    const [top, bottom] = colours;

    return (
        <div className={`relative flex aspect-[2/3] items-center justify-center overflow-hidden
        rounded-md shadow-[0_8px_16px_rgba(40,62,53,0.2)] ${className}`}
        style={{ background: `linear-gradient(to bottom, ${top}, ${bottom})` }}>
            {scene === "desert" && (
                <svg viewBox="0 0 90 135" className="absolute inset-0 w-full h-full" aria-hidden="true">
                    <circle cx="62" cy="92" r="12" fill="#ffd27a" opacity="0.85" />
                    <path d="M0 135V112l30-26 26 30 34-14v33z" fill="#000" opacity="0.35" />
                </svg>
            )}
            <span className="relative px-1.5 text-center font-serif text-[11px] font-bold uppercase
            leading-tight tracking-wide" style={{ color: textColour }}>
                {title}
            </span>
        </div>
    );
}
