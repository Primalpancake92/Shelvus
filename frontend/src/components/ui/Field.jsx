import Label from "./Label";
import Icon from "./Icon";

// A labelled input that any form can reuse.
//
//   label        text for the label
//   name         input name (also used as its id, so the label is linked to it)
//   icon         optional icon name shown inside the input on the left
//   labelAction  optional element on the right of the label row (e.g. a link)
//   trailing     optional element inside the input on the right (e.g. a toggle)
//   ...inputProps  everything else (type, value, onChange, placeholder, required,
//                  autoComplete, ...) is passed straight to the <input>
export default function Field ({
    label, name, icon, labelAction, trailing, type = "text", ...inputProps
}) {

    return(
        <div className="relative flex w-full flex-col gap-2">
            <Label name={label} htmlFor={name}>{labelAction}</Label>
            <div className="relative">
                {icon && (
                    <Icon name={icon} className="pointer-events-none absolute left-4 top-1/2
                    w-4 h-4 -translate-y-1/2 text-muted" />
                )}
                <input id={name} name={name} type={type} {...inputProps}
                className={`w-full rounded-full border border-foreground/15 bg-white py-3.5
                ${icon ? "pl-11" : "pl-4"} ${trailing ? "pr-12" : "pr-4"} text-foreground
                placeholder:text-muted/70 outline-none focus:border-primary transition-colors`} />
                {trailing && (
                    <div className="absolute right-4 top-1/2 flex -translate-y-1/2">
                        {trailing}
                    </div>
                )}
            </div>
        </div>
    )
}
