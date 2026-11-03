import { Link, NavLink } from "react-router-dom";
import Icon from "../ui/Icon";

const links = [
    { to: "/home", label: "Home", icon: "home" },
    { to: "/borrow", label: "Browse Books", icon: "book" },
    { to: "/account", label: "My Library", icon: "bookmark" },
    { to: "/return", label: "History", icon: "clock" }
];

// Top bar for signed-in pages: logo, page links, notifications and the account menu.
export default function HomeNav({ initials, hasNotifications }) {
    return (
        <header className="flex items-center justify-between py-6">
            <Link to="/home" className="flex items-center gap-3 text-2xl font-bold">
                <Icon name="book" className="w-8 h-8 text-foreground" />
                Shelvus
            </Link>

            <nav className="flex items-center gap-1 rounded-full border border-foreground/5
            bg-[#f4f3ee]/70 p-1">
                {links.map(({ to, label, icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) =>
                        `flex items-center gap-2 rounded-full px-6 py-3 font-medium
                        transition-colors duration-300 ${isActive
                            ? "bg-primary text-background"
                            : "text-foreground hover:bg-secondary"}`
                    }>
                        <Icon name={icon} className="w-5 h-5" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="flex items-center gap-6">
                <button type="button" aria-label="Notifications" className="relative
                text-foreground hover:text-primary transition-colors">
                    <Icon name="bell" className="w-6 h-6" />
                    {hasNotifications && (
                        <span className="absolute -top-0.5 right-0 w-2.5 h-2.5 rounded-full
                        bg-[#c98a4b] ring-2 ring-background"></span>
                    )}
                </button>
                <button type="button" aria-label="Account menu" className="flex items-center gap-2">
                    <span className="flex w-11 h-11 items-center justify-center rounded-full
                    bg-foreground text-sm font-semibold text-background">
                        {initials}
                    </span>
                    <Icon name="chevronDown" className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
