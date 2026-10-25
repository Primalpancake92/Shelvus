import Icon from "../../../components/ui/Icon";

// Book icon, title and subtitle at the top of the sign-in and register cards.
export default function FormHeader({ title, subtitle }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="flex w-14 h-14 items-center justify-center rounded-full
            bg-secondary text-primary">
                <Icon name="book" className="w-6 h-6" />
            </div>
            <h1 className="mt-5 text-2xl font-bold">{title}</h1>
            <p className="mt-2 text-muted">{subtitle}</p>
        </div>
    );
}
