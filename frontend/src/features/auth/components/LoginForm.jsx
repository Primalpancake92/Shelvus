import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import { validateLogin } from "../validation/login";
import Field from "../../../components/ui/Field";
import FormActions from "./FormActions";
import FormHeader from "./FormHeader";
import Icon from "../../../components/ui/Icon";
import WaveBackground from "../../../components/layout/WaveBackground";

function LoginForm() {
    const navigate = useNavigate();
    const { loginUser, error, loading, user } = useAuth();
    const { formValues, handleChange } = useForm({
        email: "",
        password: ""
    });
    const [ formErrors, setFormErrors ] = useState({});
    const [ showPassword, setShowPassword ] = useState(false);

    const login = async (event) => {
        event.preventDefault();

        // Check the inputs first; only a well-formed form is sent to the server.
        const errors = validateLogin(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const loginSuccess = await loginUser(formValues.email, formValues.password);

        if (loginSuccess) {
            navigate("/home");
        }
    };

    return (
        <div className="relative flex w-full min-h-screen justify-center items-center
        z-11 px-4 font-display">
            <form onSubmit={login} className="flex w-full max-w-lg flex-col rounded-3xl border
            border-foreground/10 bg-[#f4f3ee] px-8 py-10 text-foreground
            shadow-[0_20px_40px_rgba(40,62,53,0.12)]">
                <FormHeader title="Welcome back" subtitle="Sign in to your Shelvus account" />

                <div className="mt-8 flex flex-col gap-2 mx-5">
                    <Field label="Email address" name="email" type="email" icon="mail"
                    placeholder="Enter your email"
                    value={formValues.email} onChange={handleChange}
                    error={formErrors.email} />

                    <Field label="Password" name="password" icon="lock"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formValues.password} onChange={handleChange}
                    error={formErrors.password}
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
                    <p className="m-0 p-0 relative flex items-center text-xs">{error}</p>
                </div>

                <FormActions backTo="/" submitText="Sign In" />

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
