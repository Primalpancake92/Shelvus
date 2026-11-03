import Label from "./Label";
import Icon from "./Icon";

export default function Field ({
    label, name, icon, labelAction, trailing, type = "text", error, hint,
    ...inputProps
}) {

    return(
        <div className="relative flex w-full flex-col mb-1 gap-0.5">
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
            <div className="flex justify-left text-xs mt-1">{hint}</div>
            <div className="relative text-red-500 text-xs h-2">
                {error}
            </div>
        </div>
    )
}
