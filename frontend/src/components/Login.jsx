import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import WaveBackground from "./WaveBackground";
import Icon from "./Icon";
import Field from "./Field";

function LoginForm() {
    const navigate = useNavigate();
    const { loginUser, error, loading, user } = useAuth();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const login = await loginUser(email, password);

        if (login) {
            navigate("/home");
        }
    };

    return (
        <div className="relative flex w-full min-h-screen justify-center items-center
        z-11 px-4 font-display">
            <form className="flex w-full max-w-md flex-col rounded-3xl border
            border-foreground/10 bg-[#f4f3ee] px-8 py-10 text-foreground
            shadow-[0_20px_40px_rgba(40,62,53,0.12)]"
            onSubmit={handleSubmit}>
                <div className="flex flex-col items-center text-center">
                    <div className="flex w-14 h-14 items-center justify-center rounded-full
                    bg-secondary text-primary">
                        <Icon name="book" className="w-6 h-6" />
                    </div>
                    <h1 className="mt-5 text-2xl font-bold">Welcome back</h1>
                    <p className="mt-2 text-muted">Sign in to your Shelvus account</p>
                </div>

                <div className="mt-8 flex flex-col gap-6">
                    <Field label="Email address" name="email" type="email" icon="mail"
                    placeholder="Enter your email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Field label="Password" name="password" icon="lock"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    labelAction={
                        // No forgot-password page yet; wire this up once one exists.
                        <button type="button" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </button>
                    }
                    trailing={
                        <button type="button" onClick={() => setShowPassword((shown) => !shown)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="text-muted hover:text-foreground">
                            <Icon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
                        </button>
                    } />
                </div>

                <div className="my-8 flex justify-center gap-3">
                    {/* Each button centres one inner div holding its arrow + text. The
                        text-box trim removes the font's uneven top/bottom spacing, and the
                        arrow's 3px negative margin cancels the empty space built into the
                        icon, so the div's edges match what you actually see. */}
                    <Link to="/" className="flex w-32 items-center justify-center rounded-full
                    border border-foreground/30 py-3.5 font-medium leading-none
                    hover:bg-secondary transition-colors duration-300">
                        <div className="flex items-center gap-1.5">
                            <Icon name="arrowLeft" className="-ml-0.75 w-4 h-4" />
                            <span className="[text-box:trim-both_cap_alphabetic]">Back</span>
                        </div>
                    </Link>
                    <button type="submit" className="flex w-32 items-center justify-center
                    rounded-full bg-primary py-3.5 font-semibold text-background leading-none
                    hover:bg-[#587464] transition-colors duration-300">
                        <div className="flex items-center gap-1.5">
                            <span className="[text-box:trim-both_cap_alphabetic]">Sign In</span>
                            <Icon name="arrowRight" className="-mr-0.75 w-4 h-4" />
                        </div>
                    </button>
                </div>

                <p className="border-t border-foreground/10 pt-6 text-center text-sm text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default function LoginComponent() {
    return (
        <>
            <WaveBackground />
            <LoginForm />
        </>
    );
}
