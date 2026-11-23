import { NavLink } from "react-router-dom";

export default function PopUpModal({ listOptions, actions, onClose, isOpen }) { 
    return (
        <div className={`absolute right-0 top-full mt-5 flex flex-col rounded-4xl
        bg-white backdrop-blur-lg p-4 w-60 gap-3 justify-center 
        transition-all duration-300 ease-in-out shadow-[0_0_10px_1px_rgba(0,0,0,0.1)]
        shadow-grey-500
        ${isOpen
            ? "visible scale-100 opacity-100"
            : "invisible pointer-events-none scale-99 opacity-0"
        }`}>
            {listOptions.map((option) => (
                option.to ? (
                    <NavLink key={option.id} to={option.to} onClick={onClose}
                    className="py-2 bg-secondary px-3 rounded-full ">
                        {option.name}
                    </NavLink>
                ) : (
                    <button key={option.id} type="button" onClick={() => {
                        onClose();

                        const logoutFn = actions[option.action];
                        if (typeof logoutFn === "function") {
                            logoutFn();
                        }
                    }}
                    >{option.name}</button>
                )
            ))}
        </div>
    );
}