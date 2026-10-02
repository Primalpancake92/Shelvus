export default function Field ({
    label, name, type = "text", value, onChange
}) {

    return(
        <div className="relative flex flex-col m-2 w-full gap-2">
            <label htmlFor={name} className="relative text-white">
                {label}:
            </label>
            <input name={name} type={type} value={value} onChange={onChange}
            className="relative border border-white rounded-full h-9 text-white
            px-3">
            </input>
        </div>
    )
}