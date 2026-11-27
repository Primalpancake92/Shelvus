import fs from "fs";
import db from "../config/database_conn.js";
import path from "path";
import userData from "./userData.js";
import bookData from "./bookData.js";

const schema = fs.readFileSync(
    path.join(import.meta.dirname, "schema.sql"),
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
        INSERT INTO Book (id, title, genre, publication_year)
        VALUES (?, ?, ?, ?)
    `);

    for (const {id, title, genre, publication_year} of bookData) {
        prepStmt.run(id, title, genre, publication_year);
    }
};

function main () {
    seedUsers();
    seedBooks();
    console.log("Schema loaded");
}

main();