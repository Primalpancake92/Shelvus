import Field from "./Field";
import useForm from "../Hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import FormActions from "./FormActions";
import Icon from "./Icon";

export default function RegisterForm({ error, loading, registerUser }) {
    const { formValues, handleChange } = useForm({
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const register = async (e) => {
        e.preventDefault();

        await registerUser(
            formValues.email,
            formValues.password,
            formValues.username,
            formValues.firstName,
            formValues.lastName
        );

        if (error) {
            
        }
    };

    return (
        <form onSubmit={register} className="flex w-full max-w-xl flex-col rounded-3xl border
        border-foreground/10 bg-[#f4f3ee] px-8 py-10 font-display text-foreground
        shadow-[0_20px_40px_rgba(40,62,53,0.12)]">
            <div className="flex flex-col items-center text-center">
                <div className="flex w-14 h-14 items-center justify-center rounded-full
                bg-secondary text-primary">
                    <Icon name="book" className="w-6 h-6" />
                </div>
                <h1 className="mt-5 text-2xl font-bold">Create your account</h1>
                <p className="mt-2 text-muted">
                    Join Shelvus and start your reading journey.
                </p>
            </div>

            <div className="mt-8 flex flex-col gap-5 mx-5">
                <div className="grid grid-cols-2 gap-8">
                    <Field label={"First name"} name={"firstName"} type={"text"}
                    placeholder="John"
                    value={formValues.firstName} onChange={handleChange} />
                    <Field label={"Last name"} name={"lastName"} type={"text"}
                    placeholder="Smith"
                    value={formValues.lastName} onChange={handleChange} />
                </div>
                <Field label={"Email address"} name={"email"} type={"email"}
                placeholder="john.smith@email.com"
                value={formValues.email} onChange={handleChange}/>
                <Field label={"Username"} name={"username"} type={"text"}
                placeholder="Choose a username"
                value={formValues.username} onChange={handleChange} />
                <div>
                    <Field label={"Password"} name={"password"} type={"password"}
                    placeholder="Create a password"
                    value={formValues.password} onChange={handleChange}/>
                    <p className="mt-2 text-xs text-muted">Use at least 8 characters.</p>
                </div>
            </div>

            <FormActions backTo={"/"} submitText={"Create Account"} />

            <p className="border-t border-foreground/10 pt-6 text-center text-sm text-muted">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </form>
    );
} 