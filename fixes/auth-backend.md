# Auth backend

Files: `backend/src/Controllers/User/userAuthController.js`, `backend/src/Models/userModel.js`, `backend/src/app.js`

## High

- [ ] **Forgot-password changes nothing.** In `UserModel.updatePassword`, `prepStmt.run(email, newPassword)` has its values the wrong way round. It sets the password to the email and looks for a user whose email is the new password, so no rows change. The endpoint still replies with success. Fix: `prepStmt.run(newPassword, email)`.

- [ ] **Anyone can reset anyone's password.** `forgotPassword` only needs an email and a new password. There's no reset link, code or login check, so knowing someone's email is enough to take over their account. Usual fix: email a one-time reset link, or require the user to be logged in.

- [ ] **Login crashes for an email that isn't registered.** `loginUser` calls `User.findByEmail(email)` and then reads `user.password`. If no user is found, `user` is `undefined` and reading `.password` throws, so the reply is a 500 "Server error during login" instead of "invalid credentials". Fix: check `if (!user || user.password !== password)`.

- [ ] **Passwords are stored as plain text.** Anyone who sees `Library.db` can read every password. Hash them on register and compare hashes on login, for example with `bcrypt` (`bcrypt.hash` / `bcrypt.compare`).

## Medium

- [ ] **The same email with different capitals makes a second account.** `john@example.com` and `JOHN@example.com` are both accepted. Lowercase the email (`email.trim().toLowerCase()`) before saving in `registerUser`, and before looking it up in `loginUser` and `forgotPassword`.

- [ ] **500 replies send raw error details to the browser.** `registerUser` and `loginUser` include `error: error.message` in their 500 responses, which can expose table and column names. Log the error on the server with `console.error` and send only a general message.

- [ ] **The session secret is hard-coded.** `app.js` uses `secret: "test-secret"`. Move it into a `.env` file (already git-ignored) and read it with `process.env`.

## Low

- [ ] **`UserModel.isUserUnique` is unused and wouldn't work.** It uses `AND` (should be `OR`), compares the whole result object to `0` (should be `numbersFound.count > 0`), and returns `true` when the user is *not* unique. The `catch` in `registerUser` now handles duplicates, so this can be deleted.

- [ ] **`backend/src/utils/authRegex.js` is unused.** The patterns are strings rather than regexes, so `\d` and `\.` lose their backslash, and nothing is exported. Either delete it or use it to check email and password format in `registerUser`. Checking on the server matters even with frontend validation, because requests can be sent straight to the API.

## Done

- [x] Duplicate email or username returns `409` with a clear message instead of a 500.
- [x] Successful register returns `201 Created`.
