import { Route, Routes } from "react-router-dom";
import Account from "./account/page";
import Borrow from "./borrow/page";
import Return from "./return/page"
import Home from "./home/page";
import Hero from "./page";
import Login from "./login/page";
import Register from "./register/page";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/home" element={<Home />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/return" element={<Return />} />
        </Routes>
    )
}