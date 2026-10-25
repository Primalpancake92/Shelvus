import Icon from "./Icon";

// Mock UI pieces shown beside each feature on the landing page. They are
// decorative only, so every illustration is hidden from screen readers.

function Mountains() {
    return (
        <svg viewBox="0 0 24 16" className="w-3/4" aria-hidden="true">
            <path d="M0 16 L8 6 L12 11 L16 7 L24 16Z" fill="rgba(255,255,255,0.6)" />
        </svg>
    );
}

function Cover({ className }) {
    return (
        <div className={`flex items-end justify-center overflow-hidden rounded-md
        bg-linear-to-b ${className}`}>
            <Mountains />
        </div>
    );
}

function WindowDots() {
    return (
        <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-foreground/30"></span>
            <span className="w-2 h-2 rounded-full bg-foreground/30"></span>
        </div>
    );
}

function Glow({ colour }) {
    return (
        <div className={`absolute inset-x-10 inset-y-6 rounded-full blur-3xl ${colour}`}></div>
    );
}

// Odd panels use primary, even panels use accent.
const panel = {
    primary: {
        glow: "bg-primary/10",
        back: "border-primary/25 bg-primary/5",
        front: "border-primary/50 shadow-[0_20px_40px_rgba(40,62,53,0.12)]"
    },
    accent: {
        glow: "bg-accent/20",
        back: "border-accent/40 bg-accent/5",
        front: "border-accent/70 shadow-[0_20px_40px_rgba(40,62,53,0.12)]"
    }
};

export function SearchIllustration() {
    const covers = [
        "from-primary/80 to-secondary",
        "from-accent to-secondary",
        "from-[#7f9e8f] to-secondary",
        "from-[#b8a27b] to-secondary"
    ];

    return (
        <div className="relative perspective-[1400px]" aria-hidden="true">
            <Glow colour={panel.primary.glow} />
            <div className="relative transform-[rotateY(-14deg)_rotateX(4deg)]">
                <div className={`absolute inset-0 translate-x-5 translate-y-4 rounded-2xl
                border ${panel.primary.back}`}></div>
                <div className={`relative rounded-2xl border-2 bg-background p-5
                ${panel.primary.front}`}>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="w-4 h-4 rounded bg-primary"></span>
                        Shelvus
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="flex flex-col gap-3 text-primary/80">
                            {["home", "book", "bookmark"].map((name) => (
                                <span key={name} className="flex w-9 h-9 items-center
                                justify-center rounded-lg bg-foreground/5">
                                    <Icon name={name} className="w-4 h-4" />
                                </span>
                            ))}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between rounded-full
                            border border-foreground/15 bg-foreground/5 px-4 py-2 text-xs
                            text-muted">
                                Search books, authors, or genres...
                                <Icon name="search" className="w-4 h-4 text-foreground" />
                            </div>
                            <div className="mt-4 grid grid-cols-4 gap-3">
                                {covers.map((colour) => (
                                    <div key={colour}>
                                        <Cover className={`aspect-3/4 ${colour}`} />
                                        <div className="mt-2 h-1.5 rounded-full bg-foreground/20"></div>
                                        <div className="mt-1.5 h-1.5 w-2/3 rounded-full
                                        bg-foreground/10"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function BorrowIllustration() {
    return (
        <div className="relative perspective-[1400px]" aria-hidden="true">
            <Glow colour={panel.accent.glow} />
            <div className="relative transform-[rotateY(14deg)_rotateX(4deg)]">
                <div className={`absolute inset-0 -translate-x-10 translate-y-6 rounded-2xl
                border ${panel.accent.back}`}></div>
                <div className={`absolute inset-0 -translate-x-5 translate-y-3 rounded-2xl
                border ${panel.accent.back}`}></div>
                <div className={`relative flex gap-6 rounded-2xl border-2 bg-background p-6
                ${panel.accent.front}`}>
                    <Cover className="w-32 aspect-3/4 from-primary/80 to-secondary" />
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold">The Alchemist</p>
                        <p className="mt-1 text-sm text-muted">Paulo Coelho</p>
                        <span className="mt-3 inline-flex w-fit items-center gap-1.5
                        rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs
                        text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Available
                        </span>
                        <div className="relative mt-auto">
                            <span className="block rounded-full bg-primary px-8 py-2 text-sm
                            font-semibold text-background">
                                Borrow Book
                            </span>
                            <Icon name="pointer" className="absolute -bottom-5 right-2 w-8 h-8
                            fill-background text-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AccountIllustration() {
    const loans = [
        {
            status: "Borrowed",
            pill: "border-primary/40 bg-primary/10 text-primary",
            cover: "from-primary/80 to-secondary"
        },
        {
            status: "Due Soon",
            pill: "border-amber-600/30 bg-amber-200/40 text-amber-800",
            cover: "from-accent to-secondary"
        },
        {
            status: "Returned",
            pill: "border-foreground/15 bg-foreground/5 text-muted",
            cover: "from-[#7f9e8f] to-secondary"
        }
    ];

    return (
        <div className="relative perspective-[1400px]" aria-hidden="true">
            <Glow colour={panel.primary.glow} />
            <div className="relative transform-[rotateY(-14deg)_rotateX(4deg)]">
                <div className={`absolute inset-0 translate-x-5 translate-y-4 rounded-2xl
                border ${panel.primary.back}`}></div>
                <div className={`relative rounded-2xl border-2 bg-background p-5
                ${panel.primary.front}`}>
                    <WindowDots />
                    <div className="mt-4 flex gap-5">
                        <div className="flex w-20 flex-col gap-3">
                            <Icon name="user" className="w-5 h-5 text-foreground/80" />
                            <div className="h-1.5 rounded-full bg-primary"></div>
                            <div className="h-1.5 w-3/4 rounded-full bg-foreground/15"></div>
                            <div className="h-1.5 w-3/4 rounded-full bg-foreground/15"></div>
                        </div>
                        <div className="flex-1 rounded-xl bg-secondary p-4">
                            <p className="font-semibold">My Library</p>
                            {loans.map((loan) => (
                                <div key={loan.status} className="flex items-center gap-3
                                border-b border-foreground/5 py-2.5 last:border-0">
                                    <Cover className={`w-8 h-8 ${loan.cover}`} />
                                    <div className="flex-1">
                                        <div className="h-1.5 w-24 rounded-full bg-foreground/40"></div>
                                        <div className="mt-1.5 h-1.5 w-16 rounded-full
                                        bg-foreground/15"></div>
                                    </div>
                                    <span className={`rounded-full border px-3 py-0.5 text-xs
                                    ${loan.pill}`}>
                                        {loan.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function InsightsIllustration() {
    const bars = ["h-[20%]", "h-[35%]", "h-[50%]", "h-[72%]", "h-full"];

    return (
        <div className="relative perspective-[1400px]" aria-hidden="true">
            <Glow colour={panel.accent.glow} />
            <div className="relative transform-[rotateY(14deg)_rotateX(4deg)]">
                <div className={`absolute inset-0 -translate-x-6 translate-y-5 rounded-2xl
                border ${panel.accent.back}`}></div>
                <div className={`relative rounded-2xl border-2 bg-background p-6
                ${panel.accent.front}`}>
                    <WindowDots />
                    <div className="mt-5 flex items-center gap-10">
                        <div className="flex h-36 flex-1 items-end gap-4 border-b border-l
                        border-foreground/15 px-4">
                            {bars.map((height, i) => (
                                <div key={height} className={`w-6 rounded-t ${height}
                                bg-linear-to-t ${i < 3 ? "from-primary/60 to-primary"
                                : "from-primary to-accent"}`}></div>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative flex w-20 h-20 items-center
                            justify-center">
                                <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
                                    <defs>
                                        <linearGradient id="insights-ring" x1="0" y1="0"
                                        x2="1" y2="1">
                                            <stop offset="0" stopColor="#668573" />
                                            <stop offset="1" stopColor="#c3ab8b" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="32" cy="32" r="27" fill="none"
                                    stroke="rgba(40,62,53,0.1)" strokeWidth="5" />
                                    <circle cx="32" cy="32" r="27" fill="none"
                                    stroke="url(#insights-ring)" strokeWidth="5"
                                    strokeLinecap="round" strokeDasharray="170"
                                    strokeDashoffset="45" />
                                </svg>
                                <Icon name="book" className="w-8 h-8 text-foreground" />
                            </div>
                            <div>
                                <p className="text-3xl font-semibold">12</p>
                                <p className="text-xs text-muted">Books Borrowed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
