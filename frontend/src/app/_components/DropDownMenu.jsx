import { useState } from "react";
import Icon from "../../components/ui/Icon";
import PopUpModal from "./PopUpModal";

const accountOptions = [
    { id: 1, to: "/placeholder", name: "placeholder" },
    { id: 2, to: "/placeholder", name: "placeholder" },
    { id: 3, to: "/placeholder", name: "placeholder" }
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
    
    return (
        <div className="relative flex w-15 h-15 justify-center items-center">
            <div className="flex w-13 h-13 items-center justify-center 
            rounded-full shrink-0 bg-secondary hover:cursor-pointer
            hover:border-2 hover:border-primary-100 transition-all 
            duration-50 ease" onClick={() => setClickedAccount(!clickedAccount)}>
                <Icon name="person" className="w-10"/>
            </div>
            {
                clickedAccount && <PopUpModal listOptions={accountOptions} /> 
            }
        </div>
    );
}