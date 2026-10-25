const fs = require("fs");
const db = require("../config/database_conn");
const path = require("path");
const userData = require("./userData");
const bookData = require("./bookData");

const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

db.exec(schema);

const seedUsers = () => {
    db.exec(`
        BEGIN;
        DELETE FROM User;
        COMMIT;
    `)

    const prepStmt = db.prepare(`
        INSERT INTO user (email, first_name, last_name,
        username, password, account_active)
        VALUES (?, ?, ?, ?, ?, ?)
    `);


    for (const {email, first_name, last_name,
        username, password, account_active
    } of userData) {
        prepStmt.run(email, first_name, last_name,
        username, password, account_active);
    }
};

const seedBooks = () => {
    db.exec(`
        BEGIN;
        DELETE FROM Book;
        COMMIT;
    `)

    const prepStmt = db.prepare(`
        INSERT INTO Book (id, title, genre, publication_year,
        available) VALUES (?, ?, ?, ?, ?)
    `);

    for (const {id, title, genre, publication_year,
        available
    } of bookData) {
        prepStmt.run(id, title, genre, publication_year,
        available);
    }
};

function main () {
    seedUsers();
    seedBooks();
    console.log("Schema loaded");
}

main();