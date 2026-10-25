import icons from "../../lib/icons";

// Renders a named icon from lib/icons, or custom children (e.g. gradient strokes).
export default function Icon({ name, className = "w-6 h-6", strokeWidth = 1.75, children }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round" className={className}
        aria-hidden="true">
            {children ?? icons[name]}
        </svg>
    );
}
