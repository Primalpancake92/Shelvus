import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../lib/api";

export default function useLogout() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        let loggedOut = false;

        try {
            setLoading(true);
            setError(false);
            
            const response = await fetch(`${API_URL}/user/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Logout failed: ${data.message}`);
            }

            navigate("/login");
            loggedOut = true;
            
            return loggedOut;
        } catch (err) {
            console.log(err.message);
            setError(true);
            return loggedOut;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, logout };
}
