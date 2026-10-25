import { Link } from "react-router-dom";
import Icon from "../../../components/ui/Icon";

// Card inviting the user to browse the catalogue, over a scene of rolling line-drawn
// hills, a low sun and an open book.
export default function ContinueExploring() {
    return (
        <section className="flex flex-col overflow-hidden rounded-3xl border border-foreground/5
        bg-[#f4f3ee]/95 shadow-[0_20px_40px_rgba(40,62,53,0.06)]">
            <div className="flex items-start gap-4 p-7 pb-0">
                <span className="flex w-12 h-12 shrink-0 items-center justify-center rounded-full
                border border-foreground/10 text-primary">
                    <Icon name="feather" className="w-5 h-5" />
                </span>
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold">Continue Exploring</h2>
                    <p className="mt-1 text-muted">Browse our collection and find your next read.</p>
                </div>
                <Link to="/borrow" aria-label="Browse books" className="flex w-12 h-12 items-center
                justify-center rounded-xl border border-foreground/20 hover:bg-secondary
                transition-colors duration-300">
                    <Icon name="arrowRight" className="w-5 h-5" />
                </Link>
            </div>

            <svg viewBox="0 0 520 150" className="mt-auto w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="explore-sun" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#f2d3a4" />
                        <stop offset="1" stopColor="#f2d3a4" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <circle cx="210" cy="70" r="48" fill="url(#explore-sun)" />
                <path d="M0 110C80 70 140 60 220 90s160 0 300-40V150H0z" fill="#d5dfd3" opacity="0.6" />
                {[0, 6, 12, 18, 24, 30].map((o) => (
                    <path key={o} d={`M0 ${100 + o}C90 ${66 + o} 150 ${58 + o} 230 ${88 + o}S390 ${84 + o} 520 ${46 + o}`}
                    fill="none" stroke="#8aa596" strokeWidth="1" opacity="0.55" />
                ))}
                <path d="M240 140c14-8 30-8 44 0v-14c-14-8-30-8-44 0zM328 140c-14-8-30-8-44 0v-14c14-8 30-8 44 0z"
                fill="#4f7a66" />
            </svg>
        </section>
    );
}
