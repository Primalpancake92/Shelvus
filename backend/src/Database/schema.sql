-- Foreign keys are switched off while dropping, because User and MediaAsset
-- reference each other, so no drop order alone can avoid a dangling key.
PRAGMA foreign_keys = OFF;

-- Child tables are dropped first.
DROP TABLE IF EXISTS Borrowing; -- old name for Loan, kept so old databases are cleaned up
DROP TABLE IF EXISTS BookImage;
DROP TABLE IF EXISTS MediaAsset;
DROP TABLE IF EXISTS Loan;
DROP TABLE IF EXISTS BookCopy;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS PasswordResetToken;
DROP TABLE IF EXISTS User;

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar_id INTEGER,
    account_active NUMBER NOT NULL DEFAULT 1 CHECK(account_active IN (0, 1)),
    created_at TEXT DEFAULT(datetime('now')),
    FOREIGN KEY (avatar_id) REFERENCES MediaAsset(id)
);

CREATE TABLE IF NOT EXISTS PasswordResetToken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token_hashed TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    FOREIGN KEY (user_id) REFERENCES User(id)
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT,
    isbn TEXT UNIQUE,
    genre TEXT NOT NULL CHECK (genre IN (
        'Fiction', 'Horror', 'Non-Fiction', 'Sci-fi', 'Romance', 'Fantasy',
        'Mystery', 'Thriller', 'Historical Fiction', 'Young Adult',
        'Graphical Fiction'
    )),
    publication_year INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS BookCopy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    barcode TEXT UNIQUE,
    condition TEXT,
    FOREIGN KEY (book_id) REFERENCES Book(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Associative entity resolving the many-to-many relationship between
-- User and BookCopy. One row == one loan.
-- A surrogate "id" (instead of a composite PK on user_id + copy_id) is
-- used on purpose so the same user can borrow the same copy many times,
-- which keeps a full borrowing history.
CREATE TABLE IF NOT EXISTS Loan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    copy_id INTEGER NOT NULL,
    borrow_date TEXT NOT NULL DEFAULT (datetime('now')),
    due_date TEXT,
    return_date TEXT,
    FOREIGN KEY (user_id) REFERENCES User(id)
        ON DELETE RESTRICT,
    FOREIGN KEY (copy_id) REFERENCES BookCopy(id)
        ON DELETE RESTRICT,
    -- return_date stays NULL until the book is returned.
    CHECK (return_date IS NULL OR return_date >= borrow_date)
);

CREATE TABLE IF NOT EXISTS MediaAsset (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    storage_key TEXT NOT NULL UNIQUE,
    content_type TEXT,
    size_bytes INT,
    width INT,
    height INT,
    uploaded_by INTEGER,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'ready')),
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (uploaded_by) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS BookImage (
    book_id INTEGER NOT NULL,
    position INTEGER NOT NULL,
    media_id INTEGER UNIQUE NOT NULL,
    PRIMARY KEY (book_id, position),
    FOREIGN KEY (book_id) REFERENCES Book(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES MediaAsset(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- A single copy may only have one active (not yet returned) loan at a time.
CREATE UNIQUE INDEX IF NOT EXISTS idx_loan_active_copy
    ON Loan (copy_id)
    WHERE return_date IS NULL;

-- Speeds up "which copies has this user borrowed?" lookups.
CREATE INDEX IF NOT EXISTS idx_loan_user
    ON Loan (user_id);