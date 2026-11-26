-- Child table is dropped first so no foreign key is left dangling.
DROP TABLE IF EXISTS Loan;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS BookCopy;

CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('User', 'Admin')),
    account_active NUMBER NOT NULL DEFAULT 1 CHECK(account_active IN (0, 1)),
    created_at TEXT
);

CREATE TABLE IF NOT EXISTS Book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT NOT NULL CHECK (genre IN (
        'Fiction', 'Horror', 'Non-Fiction', 'Sci-fi', 'Romance', 'Fantasy',
        'Mystery', 'Thriller', 'Historical Fiction', 'Young Adult',
        'Graphical Fiction'
    )),
    publication_year TEXT NOT NULL,
    available NUMBER NOT NULL DEFAULT 1 CHECK(available IN (0,1))
);

CREATE TABLE IF NOT EXISTS BookCopy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    barcode TEXT UNIQUE,
    FOREIGN KEY (book_id) REFERENCES Book(id)
);

-- Associative entity resolving the many-to-many relationship between
-- User and Book. One row == one loan.
-- A surrogate "id" (instead of a composite PK on user_email + book_id) is
-- used on purpose so the same user can borrow the same book many times,
-- which keeps a full borrowing history.
CREATE TABLE IF NOT EXISTS Loan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    book_id INTEGER NOT NULL,
    borrow_date TEXT NOT NULL DEFAULT (datetime('now')),
    due_date TEXT,
    return_date TEXT,
    FOREIGN KEY (user_id) REFERENCES User(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    -- return_date stays NULL until the book is returned.
    CHECK (return_date IS NULL OR return_date >= borrow_date)
);

-- A single book may only have one active (not yet returned) loan at a time.
CREATE UNIQUE INDEX IF NOT EXISTS idx_borrowing_active_book
    ON Loan (book_id)
    WHERE return_date IS NULL;

-- Speeds up "which books has this user borrowed?" lookups.
CREATE INDEX IF NOT EXISTS idx_borrowing_user
    ON Loan (user_id);