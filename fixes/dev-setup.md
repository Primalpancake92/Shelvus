
# Dev setup

Things that make running Shelvus locally confusing.

## Low

- [ ] **Port 3000 clashes with the Voyage AI Docker container.** `voyage-ai-shared-frontend-1` also uses port 3000. While it's running, requests meant for Shelvus reach it instead, and the browser reports a CORS error that looks like a frontend bug. Either stop the container (`docker stop voyage-ai-shared-frontend-1`) before working on Shelvus, or run the backend on another port (`PORT=3001 node src/app.js`) and update the frontend's API address.

  To see what's using the port: `ss -ltnp | grep 3000` or `docker ps`.

- [ ] **Users are wiped every time the server starts.** `backend/src/Database/init.js` drops and recreates the tables, then re-adds the users from `userData.js`. Any account registered through the app disappears on restart, and the seeded emails (such as `john.smith@example.com`) are always taken. Fine for now, but change it before the app needs to keep real data, for example by only seeding when the tables are empty.

- [ ] **`localhost` and `127.0.0.1` are treated as different sites.** The frontend runs at `http://localhost:5173` but calls the API at `http://127.0.0.1:3000`. Browsers may refuse to store or send the login session cookie between them, so login can appear to work but you're logged out on the next request. Use `localhost` for both.

## Error messages and what they mean

| Browser console shows | Meaning |
|---|---|
| `ERR_CONNECTION_REFUSED` | Nothing is running on that port. Start the backend. |
| CORS error, "No 'Access-Control-Allow-Origin' header" | Something is on the port, but probably not Shelvus. Check what's using it. |
| `500 (Internal Server Error)` | The backend crashed while handling the request. Check its terminal. |
| `409 (Conflict)` | Email or username already registered. |
