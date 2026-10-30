import Icon from "../../components/ui/Icon";
import { NavLink } from "react-router-dom";

const navLinks = [
    { id: 1, to: "/home", name: "Home" },
    { id: 2, to: "/browse", name: "Browse" },
    { id: 3, to: "/borrow", name: "Borrow" },
    { id: 4, to: "/return", name: "Return" }
];

export default function NavBar() {
    return (
        <nav className="relative w-screen flex py-5 px-10 z-1 items-center
        justify-between">
            <header className="flex items-center gap-5">
                <div className="flex rounded-full bg-secondary w-13 h-13
                items-center justify-center">
                    <Icon name="book" className="w-8 h-8"/>
                </div>
                <span className="text-2xl font-bold">Shelvus</span>
            </header>

            <center className="flex items-center justify-evenly gap-10 mx-5">
                {navLinks.map((link) => (
                    <NavLink key={link.id} to={link.to} className=
                    {({ isActive }) => (
                        `${isActive ? "text-accent" : "text-primary"}
                        text-2xl font-normal
                        hover:text-accent transition-all duration-300
                        ease-in-out`
                    )}>
                        {link.name}
                    </NavLink>
                ))}
            </center>

            <right classname="flex items-center">
                
            </right>
        </nav>
    )
}