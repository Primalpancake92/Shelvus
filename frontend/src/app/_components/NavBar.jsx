import Icon from "../../components/ui/Icon";
import { NavLink } from "react-router-dom";
import useGetMe from "../../features/users/hooks/useGetMe";
import DropDownMenu from "./DropDownMenu"

const navLinks = [
    { id: 1, to: "/home", name: "Home" },
    { id: 2, to: "/browse", name: "Browse" },
    { id: 3, to: "/borrow", name: "Borrow" },
    { id: 4, to: "/return", name: "Return" }
];

export default function NavBar() {
    const { me, loading, error } = useGetMe();

    return (
        <nav className="relative w-screen flex py-5 px-5 z-1 items-center
        h-20 justify-evenly">
            <header className="flex items-center gap-5 mr-auto">
                <div className="flex rounded-full bg-secondary w-12 h-12
                items-center justify-center">
                    <Icon name="book" className="w-8"/>
                </div>
                <span className="text-2xl font-bold">Shelvus</span>
            </header>

            <center className="flex items-center mr-auto gap-3
            rounded-full px-2 py-2 bg-white backdrop-blur-lg h-12">
                {navLinks.map((link) => (
                    <NavLink key={link.id} to={link.to} className=
                    {({ isActive }) => (
                        `${isActive ? `flex 
                            items-center justify-center
                            text-foreground bg-secondary`
                        : "text-primary"}
                        text-lg font-normal px-3 py-1 rounded-full
                        hover:text-foreground    transition-all duration-300
                        ease-in-out`
                    )}>
                        {link.name}
                    </NavLink>
                ))}
            </center>

            <div className="flex items-center">
                { !loading && me ?
                    <p className="mr-5 text-black">
                        {me.first_name} {me.last_name}
                    </p>
                    : 
                    <p className="mr-5">
                        User not found
                    </p>
                }
                <DropDownMenu />
            </div>
        </nav>
    )
}

