import { Route, Routes } from "react-router-dom";
import Account from "./account/page";
import Borrow from "./borrow/page";
import Return from "./return/page"
import Home from "./home/page";
import Hero from "./page";
import Login from "./login/page";
import Register from "./register/page";
import Browse from "./browse/page";
import UserLayout from "../components/layout/UserLayout";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<UserLayout />}>
                <Route path="/account" element={<Account />} />
                <Route path="/home" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/borrow" element={<Borrow />} />
                <Route path="/return" element={<Return />} />
            </Route>
        </Routes>
    )
}