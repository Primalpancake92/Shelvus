import Icon from "./Icon";
import {
    SearchIllustration,
    BorrowIllustration,
    AccountIllustration,
    InsightsIllustration
} from "./FeatureIllustrations";

const accents = {
    primary: {
        bar: "via-primary",
        tile: "border-primary/30 bg-primary/10 text-primary"
    },
    accent: {
        bar: "via-accent",
        tile: "border-accent/50 bg-accent/15 text-primary"
    }
};

// Quick overview shown under the section heading.
const highlights = [
    { icon: "layers", title: "Browse Books", description: "Explore our collection" },
    { icon: "calendarCheck", title: "Borrow & Return", description: "Manage your loans easily" },
    { icon: "user", title: "Your Library", description: "Track your reading history" }
];

const features = [
    {
        icon: "layers",
        title: "Browse and Search Books",
        description: `Explore the library's full collection with a fast, intuitive search.
        Filter by genre, author, or publication year to quickly find the books you need.`,
        chips: [["search", "Search"], ["filter", "Filter"], ["grid", "Explore"]],
        accent: "primary",
        Illustration: SearchIllustration
    },
    {
        icon: "calendarCheck",
        title: "Borrow and Return with Ease",
        description: `Quickly borrow available books and return them when you're done.
        Due dates are automatically tracked so you can stay on top of your loans.`,
        chips: [["book", "Borrow"], ["rotateCcw", "Return"], ["bell", "Due Dates"]],
        accent: "accent",
        Illustration: BorrowIllustration
    },
    {
        icon: "user",
        title: "Manage Your Library Account",
        description: `View your current loans, borrowing history, and due dates in one
        place. Keep your reading journey organised and up to date.`,
        chips: [["barChart", "Loan History"], ["bookmark", "Saved Books"], ["settings", "Account"]],
        accent: "primary",
        Illustration: AccountIllustration
    },
    {
        icon: "barChart",
        title: "Gain Insights into Your Reading",
        description: `See your reading activity at a glance with simple insights, including
        books borrowed, returns, and your most-read genres.`,
        chips: [["trendingUp", "Activity"], ["pieChart", "Statistics"], ["star", "Reading Trends"]],
        accent: "accent",
        Illustration: InsightsIllustration
    }
];

function Divider() {
    return (
        <div className="h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent"></div>
    );
}

// A full-window-width background layer behind a band of content. It sits past the
// 1500px body (html clips the sideways overflow), so its backdrop blur reaches
// the screen edges instead of stopping at the body. It uses 100cqw rather than
// w-screen so it stops at the scrollbar; running under it makes the blur sample
// past the window edge, which shows up as a flickering dark strip.
function Band({ className }) {
    return (
        <div aria-hidden="true" className={`absolute inset-y-0 left-1/2 -z-10 w-[100cqw]
        -translate-x-1/2 ${className}`}></div>
    );
}

function FeatureText({ icon, title, description, chips, accent }) {
    return (
        <div className="flex gap-6">
            <div className={`w-0.5 self-stretch rounded-full bg-linear-to-b from-transparent
            ${accents[accent].bar} to-transparent`}></div>
            <div className={`flex w-12 h-12 shrink-0 items-center justify-center rounded-xl
            border ${accents[accent].tile}`}>
                <Icon name={icon} />
            </div>
            <div>
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                    {chips.map(([chipIcon, label]) => (
                        <span key={label} className="inline-flex items-center gap-2
                        rounded-full border border-primary/30 bg-background/70 px-4 py-1.5 text-sm
                        text-foreground/90">
                            <Icon name={chipIcon} className="w-4 h-4 text-primary" />
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        // Frosted glass: lightly tinted sage with the waves blurred behind it.
        <section id="features" className="relative isolate">
            <Band className="bg-secondary/30 backdrop-blur-2xl" />
            <Divider />
            <div className="mx-auto max-w-7xl px-8">
                <div className="py-20 text-center">
                    <div className="flex items-center justify-center gap-6">
                        <span className="h-px w-24 bg-linear-to-r from-transparent
                        to-primary/60"></span>
                        <span className="text-sm font-semibold tracking-[0.25em] text-primary">
                            DISCOVER SHELVUS
                        </span>
                        <span className="h-px w-24 bg-linear-to-l from-transparent
                        to-primary/60"></span>
                    </div>
                    <h2 className="mt-6 text-5xl font-bold tracking-tight">
                        A smarter way to manage your library.
                    </h2>
                    <p className="mt-4 text-lg text-muted">
                        Browse, borrow, and keep track of your reading — all in one place.
                    </p>
                    <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-16">
                        {highlights.map((highlight) => (
                            <div key={highlight.title} className="flex flex-col items-center">
                                <div className="flex w-15 h-15 items-center justify-center
                                rounded-xl border border-primary/30 bg-background/70 text-primary">
                                    <Icon name={highlight.icon} className="w-7 h-7" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold">{highlight.title}</h3>
                                <p className="mt-1 text-muted">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {features.map(({ Illustration, ...feature }, index) => (
                    // Rows alternate between the frosted sage and solid ivory.
                    <div key={feature.title} className="relative isolate">
                        {index % 2 === 0 && <Band className="bg-background" />}
                        <div className="grid grid-cols-2 items-center gap-16 py-28">
                            <div className={index % 2 === 1 ? "order-2" : ""}>
                                <FeatureText {...feature} />
                            </div>
                            {/* Faded so the illustration sits behind the feature text. */}
                            <div>
                                <Illustration />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
