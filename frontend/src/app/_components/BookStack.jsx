// Decorative isometric stack of three books (grey, sage green, grey) in the
// Shelvus palette. Purely visual, so it's hidden from screen readers.

const books = [
    {
        // bottom
        colours: { top: "#bfc3bc", spine: "#9da29b", edge: "#aab0a8" },
        top: "113.9,54.0 243.8,129.0 139.9,189.0 10.0,114.0",
        edge: "243.8,151.0 139.9,211.0 139.9,189.0 243.8,129.0",
        spine: "10.0,136.0 139.9,211.0 139.9,189.0 10.0,114.0",
        pages: "240.4,150.0 141.6,207.0 141.6,191.0 240.4,134.0",
        lines: [
            [238.6, 147.8, 143.4, 202.8], [238.6, 144.6, 143.4, 199.6],
            [238.6, 141.4, 143.4, 196.4], [238.6, 138.2, 143.4, 193.2]
        ]
    },
    {
        // middle, turned slightly
        colours: { top: "#9db38f", spine: "#7f9a74", edge: "#8ea783" },
        top: "90.9,37.7 251.5,89.1 180.3,163.3 19.6,111.9",
        edge: "251.5,111.1 180.3,185.3 180.3,163.3 251.5,89.1",
        spine: "19.6,133.9 180.3,185.3 180.3,163.3 19.6,111.9",
        pages: "249.2,110.6 181.5,181.1 181.5,165.1 249.2,94.6",
        lines: [
            [248.0, 108.6, 182.7, 176.6], [248.0, 105.4, 182.7, 173.4],
            [248.0, 102.2, 182.7, 170.2], [248.0, 99.0, 182.7, 167.0]
        ]
    },
    {
        // top
        colours: { top: "#c7cbc4", spine: "#a8ada6", edge: "#b3b8b0" },
        top: "113.9,10.0 243.8,85.0 139.9,145.0 10.0,70.0",
        edge: "243.8,107.0 139.9,167.0 139.9,145.0 243.8,85.0",
        spine: "10.0,92.0 139.9,167.0 139.9,145.0 10.0,70.0",
        pages: "240.4,106.0 141.6,163.0 141.6,147.0 240.4,90.0",
        lines: [
            [238.6, 103.8, 143.4, 158.8], [238.6, 100.6, 143.4, 155.6],
            [238.6, 97.4, 143.4, 152.4], [238.6, 94.2, 143.4, 149.2]
        ]
    }
];

export default function BookStack({ className = "w-72" }) {
    return (
        <svg viewBox="0 0 262 241" className={className} aria-hidden="true">
            <defs>
                <filter id="book-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" />
                </filter>
            </defs>
            <polygon points="113.9,86.0 253.8,161.0 139.9,226.0 10.0,146.0"
            fill="rgba(40,62,53,0.18)" filter="url(#book-shadow)" />
            {books.map((book) => (
                <g key={book.top} strokeLinejoin="round">
                    <polygon points={book.spine} fill={book.colours.spine} />
                    <polygon points={book.edge} fill={book.colours.edge} />
                    <polygon points={book.pages} fill="#f3f0e8" />
                    {book.lines.map(([x1, y1, x2, y2]) => (
                        <line key={y1} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#dcd7cc" strokeWidth="0.8" />
                    ))}
                    <polygon points={book.top} fill={book.colours.top} />
                </g>
            ))}
        </svg>
    );
}
