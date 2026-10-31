import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function PopUpModal({ listOptions }) {
    const [ active, setActive ] = useState(false); 

    return (
        <div className="absolute right-0 top-full mt-2 flex flex-col rounded-3xl
        bg-accent/40 backdrop-blur-lg p-6 w-60 h-50 gap-5 justify-center">
            {listOptions.map((option) => (
                <NavLink key={option.id} to={option.to} className="py-1
                 border border-black">
                    {option.name}
                </NavLink>
            ))}
        </div>
    );
}