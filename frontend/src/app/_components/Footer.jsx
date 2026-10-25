import Icon from "../../components/ui/Icon";

export default function Footer({ libraryName = "Shelvus" }) {
    return (
        <footer className="relative isolate pt-10 pb-8 text-background">
            {/* Full-window-width dark band, same approach as the features bands. */}
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen
            -translate-x-1/2 bg-foreground"></div>
            {/* Same container as the features section, so edges line up with the page. */}
            <div className="mx-auto max-w-7xl px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Icon name="book" className="w-6 h-6" />
                        <span className="text-xl font-bold">{libraryName}</span>
                    </div>
                    <p className="text-background/70">Your library, simplified.</p>
                </div>
                <div className="mt-8 border-t border-background/15 pt-6 text-sm
                text-background/60">
                    © {new Date().getFullYear()} {libraryName}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
