import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../../features/auth/hooks/useRegister";
import Dots from "../../components/ui/Dots";
import RegisterForm from "../../features/auth/components/RegisterForm";
import WaveBackground from "../../components/layout/WaveBackground";

function Reg() {
    const { 
        error, loading, userRegistered, registerUser, closeModal, success
    } = useRegister();
    
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center px-4 py-10
        items-center">
            <RegisterForm 
                error={error} loading={loading} registerUser={registerUser} 
                userRegistered={userRegistered} closeModal={closeModal} 
            />
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