import Icon from "../../components/ui/Icon";
import {
    SearchIllustration,
    BorrowIllustration,
    AccountIllustration,
    InsightsIllustration
} from "./FeatureIllustrations";// What goes here?

const accents = {
    primary: "border-primary/30 bg-primary/10 text-primary",
    accent: "border-accent/50 bg-accent/15 text-primary"
};

const features = [
    {
        icon: "layers",
        feature_name: "Discover",
        title: "Browse and Search Books",
        description: `Explore the library's full collection with a fast, intuitive search.
        Filter by genre, author, or publication year to quickly find the books you need.`,
        chips: [["search", "Search"], ["filter", "Filter"], ["grid", "Explore"]],
        accent: "primary",
        Illustration: SearchIllustration
    },
    {
        icon: "calendarCheck",
        feature_name: "Browse",
        title: "Borrow and Return with Ease",
        description: `Quickly borrow available books and return them when you're done.
        Due dates are automatically tracked so you can stay on top of your loans.`,
        chips: [["book", "Borrow"], ["rotateCcw", "Return"], ["bell", "Due Dates"]],
        accent: "accent",
        Illustration: BorrowIllustration
    },
    {
        icon: "user",
        feature_name: "Manage",
        title: "Manage Your Library Account",
        description: `View your current loans, borrowing history, and due dates in one
        place. Keep your reading journey organised and up to date.`,
        chips: [["barChart", "Loan History"], ["bookmark", "Saved Books"], ["settings", "Account"]],
        accent: "primary",
        Illustration: AccountIllustration
    },
    {
        icon: "barChart",
        feature_name: "Track",
        title: "Gain Insights into Your Reading",
        description: `See your reading activity at a glance with simple insights, including
        books borrowed, returns, and your most-read genres.`,
        chips: [["trendingUp", "Activity"], ["pieChart", "Statistics"], ["star", "Reading Trends"]],
        accent: "accent",
        Illustration: InsightsIllustration
    }
];


// One large rounded panel per feature: text on one half, the illustration filling
// the other. Every other panel is flipped so the illustration swaps sides.
function FeatureRow({ number, feature_name, icon, title, description, accent, flipped, children }) {
    return (
        <div className="grid min-h-120 grid-cols-2 overflow-hidden rounded-[2.5rem]
        bg-[#f4f3ee]">
            <div className={`flex items-center justify-center rounded-[2.5rem] bg-primary/15
            px-10 ${flipped ? "order-2" : ""}`}>
                <div className="w-full">
                    {children}
                </div>
            </div>
            <div className="flex flex-col justify-center px-16 py-16">
                <p className="text-xs font-semibold tracking-[0.15em] text-primary">
                    {String(number).padStart(2, "0")} / {feature_name}
                </p>
                <div className="mt-4 flex items-center gap-4">
                    <div className={`flex w-12 h-12 shrink-0 items-center justify-center
                    rounded-xl border ${accents[accent]}`}>
                        <Icon name={icon} className="w-6 h-6" />
                    </div>
                    <h3 className="whitespace-nowrap text-3xl font-semibold leading-none
                    tracking-tight text-primary">
                        {title}
                    </h3>
                </div>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section id="features" className="relative">
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
                </div>

                <div className="flex flex-col gap-20 pb-28">
                    {features.map(({ Illustration, ...feature }, index) => (
                        <FeatureRow key={feature.title} {...feature} number={index + 1}
                        flipped={index % 2 === 1}>
                            <Illustration />
                        </FeatureRow>
                    ))}
                </div>
            </div>
        </section>
    );
}
