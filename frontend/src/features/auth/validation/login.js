import { API_URL } from "../../../lib/api";
import { EMAIL_RE, PASSWORD_RE } from "./patterns";

const validateEmail = (email) => {
    if (!email) {
        return false;
    }

    if (!EMAIL_RE.test(email)) {
        return false;
    }

    return true;
};

const validatePassword = (password) => {
    if (!password) {
        return false;
    }
    
    if (!PASSWORD_RE.test(password)) {
        return false;
    }
    
    return true;
};

export const validateLogin = (loginFormValues) => {
    const { email, password } = loginFormValues;

    const validations = {
        email: validateEmail(email),
        password: validatePassword(password)
    };

    const errorMsgs = {
        email: "Please enter a valid email address.",
        password: "Please enter a valid password."
    }

    const loginErrs = {};

    for (const [key, value] of Object.entries(validations)) {
        if (value === false) {
            loginErrs[key] = errorMsgs[key];
        }
    }

    return loginErrs;
}