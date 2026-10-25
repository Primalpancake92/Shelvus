import BookCover from "../../../features/books/components/BookCover";
import Icon from "../../../components/ui/Icon";

// One loan in the "Currently Borrowed" list: cover, title, author and days until due.
export default function BorrowedBook({ title, author, dueInDays, cover }) {
    return (
        <article className="flex gap-4">
            <BookCover title={title} {...cover} className="w-20 shrink-0" />
            <div className="flex min-w-0 flex-col justify-between py-1">
                <div>
                    <h3 className="truncate font-semibold">{title}</h3>
                    <p className="mt-1 truncate text-sm text-muted">{author}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full
                bg-[#f3e2c8]/70 px-2.5 py-1.5 text-xs font-medium text-[#7a5a2e]">
                    <Icon name="calendar" className="w-4 h-4" />
                    Due in {dueInDays} days
                </span>
            </div>
        </article>
    );
}
