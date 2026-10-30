import { useState, useEffect } from "react";

function useGetUsers (apiEndpoint) {
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);

    const userFetch = async () => {
        const response = await fetch(`${API_URL}/users`,
            JSON.stringify({

        })
        )
    }
}