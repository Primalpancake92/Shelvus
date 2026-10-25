<div align="center">

# 📚 Shelvus

**A smarter way to manage your library.**

Browse, borrow, and keep track of your reading, all in one place.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?logo=sqlite&logoColor=white)
![Status](https://img.shields.io/badge/status-in_development-orange)

</div>

---

## Why Shelvus?

Small libraries, like a school, a community centre, an office bookshelf or a book club, often keep track of their books with a paper sign-out sheet or a spreadsheet. That works until it doesn't: nobody knows who has a book, due dates get forgotten, and a reader has no easy way to see what they've borrowed before.

Shelvus is a web app that replaces the clipboard. Readers can find a book, see whether it's on the shelf, borrow it, and check their own history. The library always knows where every book is.

It's also a full-stack learning project: a React frontend and an Express + SQLite backend, built from scratch to practise designing a relational database, writing a REST API, handling sessions, and building a polished UI.

## Features

| | Feature | What it does | Status |
|---|---|---|---|
| 🔐 | **Accounts** | Register, log in and log out. You stay logged in with a session cookie, and the register form validates input before it's sent. | ✅ Working |
| 📖 | **Book catalogue** | Add, find, update and remove books. Each book has a title, genre and publication year. | 🛠️ API done, UI in progress |
| 🔎 | **Browse & search** | Search the collection and filter by genre, author or publication year. | 🛠️ In progress |
| 🔄 | **Borrow & return** | Borrow an available book and return it when you're done. Due dates are tracked automatically. | 🛠️ Database ready, routes in progress |
| 👤 | **Your library** | See your current loans, due dates and full borrowing history in one place. | 📝 Planned |
| 📊 | **Reading insights** | Books borrowed, returns, and your most-read genres at a glance. | 📝 Planned |

### Built-in rules for borrowing

The database enforces the library's rules itself, so the app can't get into a bad state:

- **One loan per book at a time.** A book can't be borrowed again until it's been returned.
- **Full history is kept.** Every loan is its own record, so the same reader can borrow the same book many times and none of it is lost.
- **Dates make sense.** A book can't be returned before it was borrowed.
- **Clean-up is automatic.** Removing a reader or a book also removes their loan records.

## Tech stack

| Layer | Tools |
|---|---|
| **Frontend** | React 19, React Router 7, Tailwind CSS 4, Vite |
| **Backend** | Node.js, Express 5, express-session, CORS |
| **Database** | SQLite via better-sqlite3 (WAL mode, foreign keys on) |
| **Testing** | Vitest, React Testing Library, jsdom |

## Data model

```
┌──────────────┐        ┌──────────────────┐        ┌──────────────────┐
│     User     │        │    Borrowing     │        │       Book       │
├──────────────┤        ├──────────────────┤        ├──────────────────┤
│ email (PK)   │──1───*─│ id (PK)          │─*───1──│ id (PK)          │
│ first_name   │        │ user_email (FK)  │        │ title            │
│ last_name    │        │ book_id (FK)     │        │ genre            │
│ username     │        │ borrow_date      │        │ publication_year │
│ password     │        │ due_date         │        │ available        │
│ account_     │        │ return_date      │        └──────────────────┘
│   active     │        └──────────────────┘
└──────────────┘
```

`Borrowing` links readers and books. One row is one loan, and `return_date` stays empty until the book comes back.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm

### 1. Clone the repo

```bash
git clone <repo-url>
cd Shelvus
```

### 2. Start the backend

```bash
cd backend
npm install
node src/app.js
```

The API runs on **http://localhost:3000**. On start-up it creates `Library.db` and fills it with sample users and books.

> [!NOTE]
> The database is reset every time the server starts, so accounts you register won't survive a restart yet.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Frontend scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check the code with ESLint |
| `npm test` | Run the tests with Vitest |

## API overview

| Method | Route | Description |
|---|---|---|
| `POST` | `/user/register` | Create an account |
| `POST` | `/user/login` | Log in and start a session |
| `POST` | `/user/logout` | End the session |
| `PUT` | `/user/forgotPassword` | Reset a password |
| `GET` | `/user/users` | List all users |
| `GET` | `/user/find` | Find a user by email |
| `PUT` | `/user/update` | Update user details |
| `POST` | `/book/add-book` | Add a book |
| `GET` | `/book/find-book` | Find a book by title |
| `PUT` | `/book/update-book` | Update a book |
| `DELETE` | `/book/delete-book` | Remove a book |

## Project structure

```
Shelvus/
├── backend/
│   └── src/
│       ├── app.js            # Express server, sessions and CORS
│       ├── config/           # Database connection
│       ├── Controllers/      # Request handlers for users and books
│       ├── Database/         # Schema, sample data and start-up script
│       ├── Models/           # Database queries
│       ├── routes/           # API routes
│       └── utils/            # Shared helpers (e.g. validation regexes)
├── frontend/
│   └── src/
│       ├── components/       # Reusable UI pieces
│       ├── Hooks/            # Custom React hooks (auth, forms, register)
│       ├── pages/            # Home, Login, Register, Borrow, Return, Account
│       ├── routes/           # Page routing
│       └── validation/       # Form validation rules
└── fixes/                    # Known issues still to sort out
```

## Roadmap

- [x] User registration and login
- [x] Book catalogue API
- [x] Borrowing table with loan rules
- [x] Landing page and design theme
- [ ] Borrow and return routes and pages
- [ ] Search and filter in the UI
- [ ] Account page with loan history
- [ ] Reading insights
- [ ] Admin role for managing books and users
- [ ] Keep data between server restarts

Known bugs and clean-up tasks are tracked in [`fixes/`](fixes/README.md).

## Troubleshooting

**CORS errors or "connection refused" in the browser?** Something else may be using port 3000. Check with `ss -ltnp | grep 3000`, or start the backend on another port with `PORT=3001 node src/app.js`. See [`fixes/dev-setup.md`](fixes/dev-setup.md) for more.

---

<div align="center">
Made with ☕ and a lot of borrowed books.
</div>
