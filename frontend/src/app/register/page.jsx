import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../Hooks/useRegister";
import Dots from "../components/Dots";
import RegisterForm from "../components/RegisterForm";
import WaveBackground from "../components/WaveBackground";

function Reg() {
    const { error, loading, registerUser } = useRegister();
    
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center px-4 py-10
        items-center">
            <RegisterForm error={error} loading={loading} registerUser={registerUser} />
        </div>
    );
}

export default function Register() {
    return (
        <div>
            <WaveBackground />
            <Reg />
        </div>
    );
}