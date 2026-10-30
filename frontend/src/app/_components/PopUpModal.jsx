import { NavLink } from "react-router-dom";

export default function PopUpModal({ listOptions=[] }) {
    return (
        <div className="absolute flex rounded-3xl bg-accent">
            {listOptions.map((option) => (
                <NavLink key={option.id} to={option.to}>
                    {option.name}
                </NavLink>
            ))}
        </div>
    );
}