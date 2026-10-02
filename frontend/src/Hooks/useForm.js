import { useState } from "react";

export default function useForm(initialValues) { 
    const [ formValues, setFormValues ] = useState(
        initialValues
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValues((prev) => ({
            ...prev, [name]: value
        }));    
    };

    return { formValues, handleChange };
}

