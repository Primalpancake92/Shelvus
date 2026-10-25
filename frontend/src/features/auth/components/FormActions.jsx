import { Link } from "react-router-dom";
import Icon from "../../../components/ui/Icon";

// Back + submit pills side by side, used by the sign-in and register forms. Each
// button centres one inner div holding its arrow and text; the text-box trim and
// the arrow's small negative margin make the label look optically centred.
export default function FormActions({ backTo, submitText }) {
    return (
        <div className="my-6 flex justify-center gap-3">
            <Link to={backTo} className="flex w-32 items-center justify-center rounded-full
            border border-foreground/30 py-3.5 font-medium leading-none
            hover:bg-secondary transition-colors duration-300">
                <div className="flex items-center gap-1.5">
                    <Icon name="arrowLeft" className="-ml-0.75 w-4 h-4" />
                    <span className="[text-box:trim-both_cap_alphabetic]">Back</span>
                </div>
            </Link>
            <button type="submit" className="flex min-w-32 items-center justify-center
            rounded-full bg-primary px-6 py-3.5 font-semibold text-background leading-none
            hover:bg-[#587464] transition-colors duration-300">
                <div className="flex items-center gap-1.5">
                    <span className="[text-box:trim-both_cap_alphabetic]">{submitText}</span>
                    <Icon name="arrowRight" className="-mr-0.75 w-4 h-4" />
                </div>
            </button>
        </div>
    );
}
