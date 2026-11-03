import { EMAIL_RE, PASSWORD_RE, USERNAME_RE } from "./patterns";

const validateEmail = (email) => {
    if (!email) {
        return false;
    }

    if (!EMAIL_RE.test(email) || email.length < 6) {
        return false;
    }

    return true;
};

const validatePassword = (password) => {
    if (!password) {
        return false;
    }

    if (!PASSWORD_RE.test(password) || password.length < 8) {
        return false;
    }

    return true;
};

const validateName = (name) => {
    if (!name) {
        return false;
    }

    if (name.length < 2) {
        return false;
    }

    return true;
};

const validateUsername = (username) => {
    if (!username) {
        return false;
    }

    if (!USERNAME_RE.test(username) || username < 5) {
        return false;
    }

    return true;
}

export const validateRegistration = (values) => {
    const { email, password, firstName, lastName, username } = values;
    
    const validations = {
        email: validateEmail(email),
        password: validatePassword(password),
        firstName: validateName(firstName),
        lastName: validateName(lastName),
        username: validateUsername(username)
    };

    const messages = {
        email: "You have entered an invalid email. Please enter a valid email.",
        password: `You have entered an invalid password. Please enter a valid
        password.`,
        firstName: "Please enter a valid first name.",
        lastName: "Please enter a valid last name.",
        username: "You entered an invalid username. Please enter a valid username."
    }
    
    const errors = {};

    for (const [key, value] of Object.entries(validations)) {
        if (!value) {
            errors[key] = messages[key];
        }
    }

    return errors;
}