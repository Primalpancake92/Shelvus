import { useState } from "react";

export default function useRegister() {
    const [ loading, setLoading ] = useState(null);
    const [ error, setError ] = useState(false);
    const [ userRegistered, setUserRegistered ] = useState(false);

    const registerUser = async (email, password, username, firstName, lastName) => {
        setLoading(true);
        setError(false);
        setUserRegistered(false);
        let success = true;

        // making a fetch call on the register endpoint.
        try {
            const response = await fetch("http://127.0.0.1:3000/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "username": username,
                    "first_name": firstName,
                    "last_name": lastName,
                    "account_active": 1
                }),
                credentials: "include"
            });
            
            // jsonifies returned data into object literal.
            const data = await response.json();

            if (!response.ok) {
                throw new Error (
                    `${data.message}`
                )
            }

            if (response.status === "Error") {
                throw new error("User could not be registered");
            }

            if (!data) {
                throw new error("Registration failed.");
            }
            
            setUserRegistered(true);
            
            return success;

        } catch (error) {
            setError(true);
            success = false;
            console.log("Error registering user: " + error.message);
            return success;
        } finally {
            setLoading(false);
        }
    };
    
    // returns the fetch call via the endpoint, loading flag, and error flag.
    return { error, loading, userRegistered, registerUser };
}