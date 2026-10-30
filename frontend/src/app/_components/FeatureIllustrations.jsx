import Icon from "../../components/ui/Icon";

// Mock UI pieces shown beside each feature on the landing page. Each one is a flat
// copy of the signed-in app: the same top bar as HomeNav, with that feature's
// page underneath. They are decorative only, so every illustration is hidden
// from screen readers.

const navLinks = [
    { label: "Home", icon: "home" },
    { label: "Browse Books", icon: "book" },
    { label: "My Library", icon: "bookmark" },
    { label: "History", icon: "clock" }
];

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

// A shrunk copy of HomeNav: logo, page links with one marked active, bell and avatar.
function AppBar({ active }) {
    return (
        <div className="flex items-center justify-between gap-2 border-b border-foreground/10
        px-4 py-3">
            <div className="flex items-center gap-1.5 text-sm font-bold">
                <Icon name="book" className="w-4 h-4" />
                Shelvus
            </div>
            <div className="flex items-center gap-0.5 rounded-full border border-foreground/5
            bg-background p-0.5">
                {navLinks.map(({ label, icon }) => (
                    <span key={label} className={`flex items-center gap-1 whitespace-nowrap
                    rounded-full px-2 py-1 text-[10px] font-medium ${label === active
                        ? "bg-primary text-background"
                        : "text-foreground"}`}>
                        <Icon name={icon} className="w-3 h-3" />
                        {label}
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-2.5">
                <Icon name="bell" className="w-3.5 h-3.5" />
                <span className="flex w-6 h-6 items-center justify-center rounded-full
                bg-foreground text-[9px] font-semibold text-background">
                    JL
                </span>
            </div>
        </div>
    );
}

// The flat app window every illustration sits in.
function AppWindow({ active, children }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-[#f4f3ee]
        text-foreground" aria-hidden="true">
            <AppBar active={active} />
            <div className="p-5">
                {children}
            </div>
        </div>
    );
}

export function SearchIllustration() {
    const covers = [
        "from-primary/80 to-secondary",
        "from-accent to-secondary",
        "from-[#7f9e8f] to-secondary",
        "from-[#b8a27b] to-secondary"
    ];

    return (
        <AppWindow active="Browse Books">
            <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center justify-between rounded-full border
                border-foreground/15 bg-background px-4 py-2 text-xs text-muted">
                    Search books, authors, or genres...
                    <Icon name="search" className="w-4 h-4 text-foreground" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-foreground/15
                bg-background px-3 py-2 text-xs">
                    <Icon name="filter" className="w-3.5 h-3.5 text-primary" />
                    Filter
                </span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
                {covers.map((colour) => (
                    <div key={colour}>
                        <Cover className={`aspect-3/4 ${colour}`} />
                        <div className="mt-2 h-1.5 rounded-full bg-foreground/20"></div>
                        <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-foreground/10"></div>
                    </div>
                ))}
            </div>
        </AppWindow>
    );
}

export function BorrowIllustration() {
    return (
        <AppWindow active="Browse Books">
            <div className="flex gap-6">
                <Cover className="w-32 aspect-3/4 from-primary/80 to-secondary" />
                <div className="flex flex-1 flex-col">
                    <p className="text-xl font-semibold">The Alchemist</p>
                    <p className="mt-1 text-sm text-muted">Paulo Coelho</p>
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full
                    border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Available
                    </span>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                        <Icon name="calendar" className="w-3.5 h-3.5" />
                        Due back in 14 days
                    </div>
                    <span className="mt-auto block w-fit rounded-full bg-primary px-8 py-2 text-sm
                    font-semibold text-background">
                        Borrow Book
                    </span>
                </div>
            </div>
        </AppWindow>
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
        <AppWindow active="My Library">
            <p className="font-semibold">My Library</p>
            <div className="mt-2">
                {loans.map((loan) => (
                    <div key={loan.status} className="flex items-center gap-3 border-b
                    border-foreground/5 py-2.5 last:border-0">
                        <Cover className={`w-8 h-10 ${loan.cover}`} />
                        <div className="flex-1">
                            <div className="h-1.5 w-32 rounded-full bg-foreground/40"></div>
                            <div className="mt-1.5 h-1.5 w-20 rounded-full bg-foreground/15"></div>
                        </div>
                        <span className={`rounded-full border px-3 py-0.5 text-xs ${loan.pill}`}>
                            {loan.status}
                        </span>
                    </div>
                ))}
            </div>
        </AppWindow>
    );
}

export function InsightsIllustration() {
    const stats = [
        { icon: "book", value: 3, label: "Books Borrowed" },
        { icon: "calendar", value: 1, label: "Due Soon" },
        { icon: "check", value: 12, label: "Books Read" }
    ];
    const bars = ["h-[20%]", "h-[35%]", "h-[50%]", "h-[72%]", "h-full", "h-[60%]", "h-[45%]"];

    return (
        <AppWindow active="Home">
            <div className="grid grid-cols-3 gap-3">
                {stats.map(({ icon, value, label }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-xl border
                    border-foreground/5 bg-background px-3 py-2.5">
                        <span className="flex w-7 h-7 items-center justify-center rounded-full
                        bg-secondary text-primary">
                            <Icon name={icon} className="w-3.5 h-3.5" />
                        </span>
                        <div>
                            <p className="text-lg font-semibold leading-none">{value}</p>
                            <p className="mt-1 text-[10px] text-muted">{label}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex h-28 items-end gap-3 rounded-xl border border-foreground/5
            bg-background px-4 pt-4">
                {bars.map((height, i) => (
                    <div key={i} className={`flex-1 rounded-t ${height}
                    ${i === 4 ? "bg-accent" : "bg-primary/70"}`}></div>
                ))}
            </div>
        </AppWindow>
    );
}
