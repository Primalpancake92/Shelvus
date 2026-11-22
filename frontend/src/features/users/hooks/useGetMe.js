import { useState, useEffect } from "react";
import { API_URL } from "../../../lib/api";

export default function useGetMe () {
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await fetch(`${API_URL}/user/me`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }

                const data = await response.json();

                if (!data) {
                    throw new Error("No user data found for current user.");
                }

                setMe(data);
            } catch (err) {
                console.error(err)
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [])

    return { me, loading, error};
}