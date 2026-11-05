import { useState, useRef, useEffect } from "react";
import Icon from "../../components/ui/Icon";
import PopUpModal from "./PopUpModal";

const accountOptions = [
    { id: 1, to: "/account", name: "My Account" },
    { id: 2, to: "/settings", name: "My Settings" },
    { id: 3, to: "/history", name: "History" },
    { id: 4, to: "/logout", name: "Logout"}
];


/**
 * **User Account settings button**
 * 
 * Renders a structured profile card for an application user, featuring 
 * their avatar, bio, and dynamic follow/unfollow interactions.
 *
 * @component
 * @param { accountName } - This is the accountName that is passed through the 
 * component
 * 
 * 
 */

export default function DropDownMenu({ accountName }) {
    const [ clickedAccount, setClickedAccount ] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setClickedAccount(false);
            }
        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative w-12 h-12 flex justify-center items-center">
            <div className="flex w-12 h-12 items-center justify-center 
            rounded-full shrink-0 border-2 border-transparent hover:cursor-pointer
            transition-all bg-foreground
            duration-50 ease-in-out" onClick={() => setClickedAccount(!clickedAccount)}>
                <Icon name="person" className="w-8 text-white" />
            </div>
            <PopUpModal listOptions={accountOptions} 
            onClose={() => setClickedAccount(false)} isOpen={clickedAccount}/> 
        </div>
    );
}