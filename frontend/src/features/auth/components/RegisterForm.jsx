import { useState } from "react";
import { Link } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { validateRegistration } from "../validation/registration";
import Field from "../../../components/ui/Field";
import FormActions from "./FormActions";
import FormHeader from "./FormHeader";
import Modal from "../../../components/ui/Modal";

export default function RegisterForm({ error, loading, userRegistered, registerUser }) {
    const { formValues, handleChange, resetForm } = useForm({
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [ formErrors, setFormErrors ] = useState({});
    const [ openModal, setOpenModal ] = useState(false);

    const register = async (e) => {
        e.preventDefault();

        // Check the inputs first; a form with problems never opens the modal.
        const errors = validateRegistration(formValues);
        setFormErrors(errors); // schedules a re-render with the new messages

        if (Object.keys(errors).length > 0) {
            return;
        }

        setOpenModal(true); // schedules a re-render that shows the modal

        const registered = await registerUser(
            formValues.email,
            formValues.password,
            formValues.username,
            formValues.firstName,
            formValues.lastName
        );

        if (registered) {
            resetForm();
        }
    };

    // What this render shows on screen.
    return (
        <div>
            <form onSubmit={register} className="flex w-full max-w-xl flex-col rounded-3xl border
            border-foreground/10 bg-[#f4f3ee] px-8 py-8 font-display text-foreground
            shadow-[0_20px_40px_rgba(40,62,53,0.12)]">
                <FormHeader title="Create your account"
                subtitle="Join Shelvus and start your reading journey." />

                <div className="mt-6 flex flex-col gap-1.5 mx-5">
                    <div className="grid grid-cols-2 gap-8">
                        <Field label="First name" name="firstName" placeholder="John"
                        value={formValues.firstName} onChange={handleChange}
                        error={formErrors.firstName} />
                        <Field label="Last name" name="lastName" placeholder="Smith"
                        value={formValues.lastName} onChange={handleChange}
                        error={formErrors.lastName} />
                    </div>
                    <Field label="Email address" name="email" type="email"
                    placeholder="john.smith@email.com"
                    value={formValues.email} onChange={handleChange}
                    error={formErrors.email} />
                    <Field label="Username" name="username" placeholder="Choose a username"
                    value={formValues.username} onChange={handleChange}
                    error={formErrors.username} />
                    <div>
                        <Field label="Password" name="password" type="password"
                        placeholder="Create a password" hint="User at least 8 characters."
                        value={formValues.password} onChange={handleChange}
                        error={formErrors.password} />
                    </div>
                </div>

                <FormActions backTo="/" submitText="Create Account" />

                <p className="border-t border-foreground/10 pt-6 text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>

            {openModal && (
                <Modal
                    modalName="Registration"
                    loading={loading}
                    error={error}
                    userOperation={userRegistered}
                    onClose={() => setOpenModal(false)}
                />
            )}
        </div>
    );
}
