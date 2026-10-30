import { Outlet } from "react-router-dom";
import NavBar from "../../app/_components/NavBar";

export default function UserLayout() {
    return (
        <div className="min-h-screen border-black border">
            <NavBar />
            
            <main className="mx-auto max-w-7xl px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}

