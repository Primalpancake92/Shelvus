import db from "../config/database_conn.js";

class mediaAsset {
    static getAllMedia() {
        const prepStmt = db.prepare(`
            SELECT * FROM MediaAsset
        `);

        return prepStmt.all();
    }

    static createBookMediaAsset(uploadedMedia) {
        const { 
            storageKey, contentType, sizeBytes, width, height, userId
        } = uploadedMedia;

        if (!storageKey) {
            throw new Error("There is no associated storage key.");
        };

        const prepStmt = db.prepare(`
            INSERT INTO MediaAsset (storage_key, content_type, size_bytes, 
            width, height, uploaded_by) 
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const createdBookMediaAsset = prepStmt.run(
            storageKey, contentType, sizeBytes, width, 
            height, userId
        );

        return createdBookMediaAsset;
    }

    static fetchBookCovers() {
        const prepStmt = db.prepare(`
            SELECT 
                b.id,
                b.title,
                b.author,
                b.isbn,
                b.publication_year,
                ma.storage_key
            FROM Book AS b
            INNER JOIN BookImage as bi
                ON b.id = bi.book_id
            INNER JOIN MediaAsset as ma
                ON bi.media_id = ma.id
        `);
        
        return prepStmt.all();
    }

    static getBookCover(book) {
        const { id } = book;

        const prepStmt = db.prepare(`
            SELECT 
                b.id,
                b.title,
                b.author,
                b.isbn,
                b.publication_year,
                ma.storage_key
            FROM Book AS b
            INNER JOIN BookImage as bi
                ON b.id = bi.book_id
            INNER JOIN MediaAsset as ma
                ON bi.media_id = ma.id
            WHERE
                b.id = ?
        `);

        const bookCover = prepStmt.get(id);

        return bookCover;
    }

    static removeBookMediaAsset(book) {
        const { storageKey } = book;

        const prepStmt = db.prepare(`
            DELETE FROM MediaAsset
            WHERE storage_key = ?
        `);

        const deletedEntry = prepStmt.run(storageKey);

        return (deletedEntry ? true : false);
    }
    
    static fetchProfilePictures() {

    }

    static getProfilePicture(profile) {

    }
}