# Auth backend

Files: `backend/src/Controllers/User/userAuthController.js`, `backend/src/Models/userModel.js`, `backend/src/app.js`

## High

- [ ] **Forgot-password changes nothing.** In `UserModel.updatePassword`, `prepStmt.run(email, newPassword)` has its values the wrong way round. It sets the password to the email and looks for a user whose email is the new password, so no rows change. The endpoint still replies with success. Fix: `prepStmt.run(newPassword, email)`.

- [ ] **Anyone can reset anyone's password.** `forgotPassword` only needs an email and a new password. There's no reset link, code or login check, so knowing someone's email is enough to take over their account. Usual fix: email a one-time reset link, or require the user to be logged in.

- [ ] **Login crashes for an email that isn't registered.** `loginUser` calls `User.findByEmail(email)` and then reads `user.password`. If no user is found, `user` is `undefined` and reading `.password` throws, so the reply is a 500 "Server error during login" instead of "invalid credentials". Fix: check `if (!user || user.password !== password)`.

- [ ] **Passwords are stored as plain text.** Anyone who sees `Library.db` can read every password. Hash them on register and compare hashes on login, for example with `bcrypt` (`bcrypt.hash` / `bcrypt.compare`). The ER diagram says argon2id, which is the `argon2` package; pick one and rename the column to `password_hash` to match. Do this before the password reset flow, because the reset endpoint has to save a hashed password too.

- [ ] **Register trusts `account_active` (and soon `role`) from the client.** Anyone could register as inactive, or as an Admin once `role` exists. The server should set both: active by default, and `role` always `member` on self-registration.

## Medium

- [ ] **The same email with different capitals makes a second account.** `john@example.com` and `JOHN@example.com` are both accepted. Lowercase the email (`email.trim().toLowerCase()`) before saving in `registerUser`, and before looking it up in `loginUser` and `forgotPassword`.

- [ ] **500 replies send raw error details to the browser.** `registerUser` and `loginUser` include `error: error.message` in their 500 responses, which can expose table and column names. Log the error on the server with `console.error` and send only a general message.

- [ ] **The session secret is hard-coded.** `app.js` uses `secret: "test-secret"`. Move it into a `.env` file (already git-ignored) and read it with `process.env`.

- [ ] **Sessions are lost on every server restart.** express-session's default memory store keeps sessions in RAM, so restarting the server logs everyone out (and it leaks memory over time). The ER diagram expects a session table created by a store package, such as `better-sqlite3-session-store`. Store `userId` and `role` in the session.

## Password reset plan

Replaces the current `forgotPassword`, which is the "anyone can reset anyone's password" item above. Uses the `PasswordResetToken` table from the ER diagram.

**Making the token (no outside service needed, Node's built-in `crypto` does it):**
- [ ] Create a long random token: about 32 random bytes from `crypto.randomBytes`, turned into a hex or base64url string.
- [ ] Store only its SHA-256 hash (`crypto.createHash`) in `token_hash`, never the raw token. If the database leaks, the hashes can't be used as reset links.
- [ ] Set `expires_at` to a short window, around 15–60 minutes.
- [ ] Always reply with the same message whether the email exists or not, so the endpoint can't be used to find out who has an account.

**Using the token:**
- [ ] The user clicks a link like `/reset-password?token=...`.
- [ ] Hash the token from the link and look up that hash. Reject it if it's not found, expired, or `used_at` is already set.
- [ ] Hash and save the new password, then set `used_at` so the link can't be used again.

**Sending the email (needs a provider, nothing is installed yet):**
- [ ] For development: log the reset link to the console instead of sending email, until the flow works.
- [ ] Then pick a provider:
  - **AWS SES** (`@aws-sdk/client-sesv2`): reuses the AWS credentials already set up for S3. New accounts start in "sandbox" mode and can only send to email addresses you've verified, which is fine for development.
  - **Resend or SendGrid:** simple HTTP APIs with free tiers.
  - **Nodemailer + SMTP:** for testing, use Mailtrap or Ethereal so no real emails go out.

**Suggested order:** password hashing → token table and endpoints (link logged to console) → real email through SES.

## Low

- [ ] **`UserModel.isUserUnique` is unused and wouldn't work.** It uses `AND` (should be `OR`), compares the whole result object to `0` (should be `numbersFound.count > 0`), and returns `true` when the user is *not* unique. The `catch` in `registerUser` now handles duplicates, so this can be deleted.

- [ ] **`backend/src/utils/authRegex.js` is unused.** The patterns are strings rather than regexes, so `\d` and `\.` lose their backslash, and nothing is exported. Either delete it or use it to check email and password format in `registerUser`. Checking on the server matters even with frontend validation, because requests can be sent straight to the API.

## Done

- [x] Duplicate email or username returns `409` with a clear message instead of a 500.
- [x] Successful register returns `201 Created`.
