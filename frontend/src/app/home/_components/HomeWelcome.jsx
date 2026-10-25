import { Link } from "react-router-dom";
import Icon from "../../../components/ui/Icon";
import WindowIllustration from "./WindowIllustration";

// Greeting at the top of the home page, with the main actions and the window scene.
export default function HomeWelcome({ firstName }) {
    return (
        <section className="grid grid-cols-[1fr_auto] items-center gap-12 pt-6">
            <div className="pl-12">
                <p className="text-sm font-semibold tracking-[0.2em] text-muted uppercase">
                    Your personal library
                </p>
                <h1 className="mt-3 whitespace-nowrap font-serif text-6xl font-bold tracking-tight">
                    Welcome back, {firstName}!
                </h1>
                <p className="mt-5 max-w-lg text-xl leading-relaxed text-muted">
                    Discover new books, manage your loans, and continue your reading journey.
                </p>
                <div className="mt-9 flex items-center gap-5">
                    <Link to="/borrow" className="flex items-center gap-2 rounded-full bg-primary
                    px-8 py-4 text-lg font-semibold text-background hover:bg-[#587464]
                    transition-colors duration-300">
                        Explore Books
                        <Icon name="arrowRight" className="w-5 h-5" />
                    </Link>
                    <Link to="/account" className="flex items-center gap-2 rounded-full border
                    border-foreground/30 px-8 py-4 text-lg font-medium hover:bg-secondary
                    transition-colors duration-300">
                        <Icon name="bookmark" className="w-5 h-5" />
                        My Library
                    </Link>
                </div>
            </div>
            <WindowIllustration className="w-140" />
        </section>
    );
}
