import WaveBackground from "../../components/layout/WaveBackground";
import WelcomeSection from "./components/WelcomeSection";
import StatsTiles from "./components/StatsTiles";

export default function Home() {

    return (
        <div className="relative font-display text-foreground">
            <WaveBackground />
            <WelcomeSection />
            <StatsTiles />
        </div>
    );
}
