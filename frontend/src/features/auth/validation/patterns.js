// Regex patterns for validating form fields, shared by the validation files.

// Something before an @, something after it, and a dot in the domain.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// At least 8 characters with a lowercase, an uppercase, a digit and a symbol.
export const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// 3-12 letters, digits or single spaces, not starting with a space, with an
// optional #123 or #1234 tag on the end.
export const USERNAME_RE = /^(?![ ])(?!.*[ ]{2})[a-zA-R0-9 ]{3,12}(#[0-9]{3,4})?$/;
