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
| 🔐 | **Accounts** | Register, log in and log out. You stay logged in with a session cookie, the register form validates input before it's sent, and login tells you whether your details were wrong or the server had a problem. | ✅ Working |
| 🧭 | **App layout** | Once you're logged in, every page shares one navbar, so Home, Browse, Borrow, Return and Account are a click away. | ✅ Working |
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
cp .env.example .env
npm install
node src/app.js
```

The API runs on **http://localhost:3000**. On start-up it creates `Library.db` and fills it with sample users and about 100 books.

The backend's `.env` has two settings:

| Variable | Default | What it's for |
|---|---|---|
| `PORT` | `3000` | Port the API listens on |
| `CLIENT_URL` | `http://localhost:5173` | Frontend address allowed through CORS |

> [!NOTE]
> The database is reset every time the server starts, so accounts you register won't survive a restart yet.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

The frontend's `.env` holds `VITE_API_URL`, the address of the backend (`http://127.0.0.1:3000` by default). If you change the backend's `PORT`, change this to match. Anything in this file ends up in the browser, so never put secrets in it.

### 4. Log in

You can register a new account, or use one of the sample accounts:

| Email | Password |
|---|---|
| `john.smith@example.com` | `Shelves@2024` |
| `emma.johnson@example.com` | `Bookworm!88` |

The full list is in [`backend/src/Database/userData.js`](backend/src/Database/userData.js).

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

## Pages

| Route | Page | Shared navbar |
|---|---|---|
| `/` | Landing page | |
| `/login` | Log in | |
| `/register` | Create an account | |
| `/home` | Your home page (being rebuilt) | ✅ |
| `/browse` | Browse the catalogue (in progress) | ✅ |
| `/borrow` | Borrow a book (in progress) | ✅ |
| `/return` | Return a book (in progress) | ✅ |
| `/account` | Your account | ✅ |

Pages marked ✅ sit inside `UserLayout`, which adds the shared navbar.

## Project structure

```
Shelvus/
├── backend/
│   ├── .env.example          # PORT and CLIENT_URL
│   └── src/
│       ├── app.js            # Express server, sessions and CORS
│       ├── config/           # Database connection
│       ├── Controllers/      # Request handlers (User/, Book/)
│       ├── Database/         # Schema, sample users and books, start-up script
│       ├── Models/           # Database queries
│       ├── routes/           # API routes
│       └── utils/            # Shared helpers
├── frontend/
│   ├── .env.example          # VITE_API_URL
│   └── src/
│       ├── app/              # One folder per page (page.jsx) plus AppRouter
│       │   └── _components/  # Pieces used by the landing page and navbar
│       ├── components/
│       │   ├── layout/       # UserLayout, backgrounds, nav
│       │   └── ui/           # Small reusable pieces (Field, Label, Modal, Icon)
│       ├── features/         # Code grouped by feature
│       │   ├── auth/         # Login/register forms, hooks and validation
│       │   ├── books/        # Book components
│       │   └── users/        # User hooks
│       ├── hooks/            # Shared hooks (useForm)
│       └── lib/              # API client, icons and helpers
└── fixes/                    # Known issues still to sort out
```

## Roadmap

- [x] User registration and login
- [x] Book catalogue API
- [x] Borrowing table with loan rules
- [x] Landing page and design theme
- [x] Shared navbar layout for logged-in pages
- [ ] Home page dashboard
- [ ] Borrow and return routes and pages
- [ ] Search and filter in the UI
- [ ] Account page with loan history
- [ ] Reading insights
- [ ] Admin role for managing books and users
- [ ] Keep data between server restarts

Known bugs and clean-up tasks are tracked in [`fixes/`](fixes/README.md).

## Troubleshooting

**CORS errors or "connection refused" in the browser?** Something else may be using port 3000. Check with `ss -ltnp | grep 3000`, or move the backend to another port by setting `PORT=3001` in `backend/.env` and `VITE_API_URL=http://127.0.0.1:3001` in `frontend/.env`. See [`fixes/dev-setup.md`](fixes/dev-setup.md) for more.

---

<div align="center">
Made with ☕ and a lot of borrowed books.
</div>
