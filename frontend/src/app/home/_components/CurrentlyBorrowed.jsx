import { Link } from "react-router-dom";
import BorrowedBook from "./BorrowedBook";
import Icon from "../../../components/ui/Icon";

// Card listing the user's active loans on the home page.
export default function CurrentlyBorrowed({ loans }) {
    return (
        <section className="rounded-3xl border border-foreground/5 bg-[#f4f3ee]/95 p-7
        shadow-[0_20px_40px_rgba(40,62,53,0.06)]">
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-4 text-2xl font-semibold">
                    <Icon name="layers" className="w-8 h-8 text-primary" />
                    Currently Borrowed
                </h2>
                <Link to="/account" className="flex items-center gap-1.5 text-sm font-medium
                text-primary hover:underline">
                    View All
                    <Icon name="arrowRight" className="w-4 h-4" />
                </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
                {loans.map((loan) => <BorrowedBook key={loan.title} {...loan} />)}
            </div>
        </section>
    );
}
