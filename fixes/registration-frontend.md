# Registration frontend

Files: `frontend/src/Hooks/useRegister.js`, `frontend/src/components/RegisterForm.jsx`, `frontend/src/util/registration.js`, `frontend/src/util/patterns.js`

## Medium

- [ ] **The user isn't told when registration fails.** In `RegisterForm`, the `if (error) { }` block after `registerUser` is empty. It also reads `error` straight after the `await`, before React has re-rendered, so it still holds the old value. Use the `true`/`false` that `registerUser` returns instead, and show the server's message on the form.

- [ ] **The hook throws away the server's message.** `useRegister` only keeps `error` as `true`/`false`. Store the message, for example `setError(error.message)`, so the form can show "The email or username is already taken."

- [ ] **Validation isn't wired up.** `validateRegistration` in `util/registration.js` exists, but `RegisterForm` never imports or calls it, so every submit goes straight to the server.

- [ ] **The username pattern rejects capital S to Z.** In `validateUsername`, `[a-zA-R0-9 ]` should be `[a-zA-Z0-9 ]`. As written, "Sam" or "Zoe" fails.

- [ ] **The username length check compares text to a number.** `username < 5` should be `username.length < 5`. Note the regex already allows 3 to 12 characters, so decide which minimum you actually want.

- [ ] **Names under 5 letters are rejected.** `validateName` fails anything shorter than 5 characters, which blocks real names like "John", "Eve" or "Li". Checking that the name isn't empty is usually enough.

## Low

- [ ] **`new error(...)` should be `new Error(...)`.** In `useRegister.js`, the lowercase `error` is the state variable (`false`), so these lines throw "error is not a constructor" instead of the intended message.

- [ ] **The `response.status === "Error"` check can never be true.** `response.status` is a number like `200` or `409`. This check can be removed, since `!response.ok` already covers failures.

- [ ] **`loading` starts as `null`.** `useState(false)` is clearer for a true/false flag.

- [ ] **The API address is written out in each hook.** `http://127.0.0.1:3000` is hard-coded in the hooks. Put it in one place, such as a `VITE_API_URL` in `frontend/.env`, read with `import.meta.env.VITE_API_URL`, so changing the port is a one-line change.

## Done

- [x] `loading` resets after every request (`finally` block).
- [x] The password is no longer logged on failure; the hook throws `data.message` instead.
- [x] Tests for `useRegister` in `useRegister.test.js` (run with `npm test` in `frontend/`).
