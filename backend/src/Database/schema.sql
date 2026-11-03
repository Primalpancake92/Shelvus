-- Child table is dropped first so no foreign key is left dangling.
DROP TABLE IF EXISTS Borrowing;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS User;

CREATE TABLE IF NOT EXISTS User (
    email TEXT NOT NULL UNIQUE PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    account_active NUMBER NOT NULL DEFAULT 1 CHECK(account_active IN (0, 1))
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

-- Associative entity resolving the many-to-many relationship between
-- User and Book. One row == one loan.
-- A surrogate "id" (instead of a composite PK on user_email + book_id) is
-- used on purpose so the same user can borrow the same book many times,
-- which keeps a full borrowing history.
CREATE TABLE IF NOT EXISTS Borrowing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    book_id INTEGER NOT NULL,
    borrow_date TEXT NOT NULL DEFAULT (datetime('now')),
    due_date TEXT,
    return_date TEXT,
    FOREIGN KEY (user_email) REFERENCES User(email)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    -- return_date stays NULL until the book is returned.
    CHECK (return_date IS NULL OR return_date >= borrow_date)
);

-- A single book may only have one active (not yet returned) loan at a time.
CREATE UNIQUE INDEX IF NOT EXISTS idx_borrowing_active_book
    ON Borrowing (book_id)
    WHERE return_date IS NULL;

-- Speeds up "which books has this user borrowed?" lookups.
CREATE INDEX IF NOT EXISTS idx_borrowing_user
    ON Borrowing (user_email);