import ContinueExploring from "./_components/ContinueExploring";
import CurrentlyBorrowed from "./_components/CurrentlyBorrowed";
import HomeNav from "../../components/layout/HomeNav";
import HomeWelcome from "./_components/HomeWelcome";
import StatCard from "./_components/StatCard";
import WaveBackground from "../../components/layout/WaveBackground";

// Sample data until the backend has endpoints for the signed-in user, their loans
// and reading stats. Swap these for real values once those exist.
const sampleUser = { firstName: "John", initials: "JL" };

const sampleStats = [
    { icon: "book", value: 3, label: "Books Borrowed", tone: "sage" },
    { icon: "calendar", value: 1, label: "Due Soon", tone: "sand" },
    { icon: "check", value: 12, label: "Books Read", tone: "sage" }
];

const sampleLoans = [
    {
        title: "The Alchemist", author: "Paulo Coelho", dueInDays: 7,
        cover: { colours: ["#e2672b", "#7a1f12"], scene: "desert" }
    },
    {
        title: "Atomic Habits", author: "James Clear", dueInDays: 14,
        cover: { colours: ["#fbf6ec", "#efe6d4"], textColour: "#e0a24a" }
    },
    {
        title: "Dune", author: "Frank Herbert", dueInDays: 21,
        cover: { colours: ["#2f5f7a", "#d0763a"], scene: "desert" }
    }
];

export default function Home() {
    return (
        <div className="relative min-h-screen font-display text-foreground">
            <WaveBackground />
            <div className="relative mx-auto max-w-7xl px-8 pb-16">
                <HomeNav initials={sampleUser.initials} hasNotifications />
                <HomeWelcome firstName={sampleUser.firstName} />

                <div className="mt-4 grid grid-cols-3 gap-7">
                    {sampleStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
                </div>

                <div className="mt-7 grid grid-cols-[1.5fr_1fr] gap-7">
                    <CurrentlyBorrowed loans={sampleLoans} />
                    <ContinueExploring />
                </div>
            </div>
        </div>
    );
}
