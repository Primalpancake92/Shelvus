import { Link } from "react-router-dom";
import WaveBackground from "../components/layout/WaveBackground";
import Icon from "../components/ui/Icon";
import Features from "./_components/Features";
import BookStack from "./_components/BookStack";
import Footer from "./_components/Footer";

function RegisterBtn() {
    return (
        <Link to="/register" className="flex h-14 min-w-40 items-center justify-center gap-2
        rounded-full bg-primary px-8 text-lg font-semibold text-background
        hover:bg-[#587464] transition-colors duration-300">
            Register
            <Icon name="arrowRight" className="w-5 h-5" />
        </Link>
    );
}

function LoginBtn() {
    return (
        <Link to="/login" className="flex h-14 min-w-40 items-center justify-center
        rounded-full border border-primary px-8 text-lg font-medium hover:bg-secondary
        transition-colors duration-300">
            Login
        </Link>
    );
}

function LearnMoreLink() {
    return (
        <a href="#features" className="mt-14 flex flex-col items-center gap-1 text-muted
        hover:text-primary transition-colors duration-300">
            Learn More
            <Icon name="chevronsDown" className="w-5 h-5 text-primary animate-bounce" />
        </a>
    );
}

function WelcomeTitle({ libraryName }) {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center">
            <Icon className="w-28 h-28 drop-shadow-[0_6px_14px_rgba(102,133,115,0.25)]">
                <defs>
                    <linearGradient id="hero-book-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#668573" />
                        <stop offset="1" stopColor="#c3ab8b" />
                    </linearGradient>
                </defs>
                <g stroke="url(#hero-book-gradient)" strokeWidth="1.5">
                    <path d="M2 4c3-1.5 7-1.5 10 1v15c-3-2.5-7-2.5-10-1z" />
                    <path d="M22 4c-3-1.5-7-1.5-10 1v15c3-2.5 7-2.5 10-1z" />
                </g>
            </Icon>

            <h1 className="mt-8 text-7xl font-bold tracking-tight">
                Welcome to{" "}
                {/* 45deg sage-to-sand blend; the 55% hint shifts the midpoint so sage
                    covers slightly more of the word. */}
                <span className="bg-[linear-gradient(45deg,var(--color-primary),55%,var(--color-accent))]
                bg-clip-text text-transparent">
                    {libraryName}
                </span>
            </h1>
            <p className="mt-6 text-3xl text-muted">
                The library shelf that is a touch away.
            </p>

            <div className="mt-12 flex items-center gap-8">
                <RegisterBtn />
                <LoginBtn />
            </div>

            <LearnMoreLink />
        </main>
    );
}

function GetStarted({ libraryName }) {
    return (
        <section className="relative px-8 py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-12
            rounded-3xl border border-foreground/10 bg-background/85 px-16 py-16
            shadow-[0_20px_40px_rgba(40,62,53,0.08)] backdrop-blur">
                <div className="flex flex-col items-center text-center">
                    <div className="flex w-14 h-14 items-center justify-center rounded-full
                    bg-secondary text-primary">
                        <Icon name="book" className="w-7 h-7" />
                    </div>
                    <h2 className="mt-6 text-5xl font-bold tracking-tight">
                        Your next chapter starts here.
                    </h2>
                    <p className="mt-5 max-w-xl text-xl text-muted">
                        Discover, borrow, and manage your books with ease. Your library
                        journey starts with {libraryName}.
                    </p>
                    <div className="mt-10 flex items-center gap-5">
                        <Link to="/register" className="inline-flex items-center gap-2
                        rounded-full bg-primary px-8 py-4 text-lg font-semibold text-background
                        hover:bg-[#587464] transition-colors duration-300">
                            Create an Account
                            <Icon name="arrowRight" className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="rounded-full border border-primary px-8 py-4
                        text-lg font-medium hover:bg-secondary transition-colors duration-300">
                            Already a member? Login
                        </Link>
                    </div>
                    <p className="mt-8 flex items-center gap-2 text-sm text-muted">
                        <Icon name="circleCheck" className="w-4 h-4" />
                        Simple registration · Easy borrowing · One library
                    </p>
                </div>
                <BookStack className="w-80" />
            </div>
        </section>
    );
}

export default function Hero() {
    return (
        <div className="relative font-display text-foreground">
            <WaveBackground />
            <WelcomeTitle libraryName="Shelvus" />
            <Features />
            <GetStarted libraryName="Shelvus" />
            <Footer libraryName="Shelvus" />
        </div>
    );
}
