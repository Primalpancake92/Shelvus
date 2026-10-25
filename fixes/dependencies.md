# Dependencies

Files: `frontend/package.json`, `backend/package.json`

## Medium

- [ ] **Backend packages are installed in the frontend.** `better-sqlite3` and `express-session` are listed in `frontend/package.json`, but only the backend uses them. They are already correctly listed in `backend/package.json`, so remove them from the frontend:

  ```bash
  cd frontend
  npm uninstall better-sqlite3 express-session
  ```

- [ ] **An unknown package, `expression`, is in the backend.** `backend/package.json` lists `"expression": "^0.0.1"`, but nothing in `backend/src` uses it. It was probably a typo for `express`. Remove it:

  ```bash
  cd backend
  npm uninstall expression
  ```

## Low

- [ ] **Leftover packages in the home folder.** `better-sqlite3` and `express-session` are also installed in `/home/John/node_modules`. Node looks there when a project folder doesn't have a package, which hid the missing backend packages earlier. Once both `package.json` files are correct, delete `/home/John/node_modules` (and `/home/John/package.json` if there is one) so problems like this show up straight away.
