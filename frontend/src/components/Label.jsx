// A form label. Anything passed as children (e.g. a "Forgot password?" link)
// sits on the right-hand side of the same row.
export default function Label({ name, htmlFor, children }) {
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={htmlFor} className="font-medium text-foreground">
                {name}
            </label>
            {children}
        </div>
    );
}
