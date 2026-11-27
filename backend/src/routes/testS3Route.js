import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3Client.js";

const upload = multer({
    // Keep the file in memory so req.file.buffer can go straight to S3.
    storage: multer.memoryStorage(),

    // Reject files over 5 MB (the value is in bytes).
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    // Only accept images. cb(error, acceptFile)
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed."));
        }
    }
});
const testRouter = express.Router();

// this an admin route only.
testRouter.post("/book-cover-upload", upload.single("uploaded image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file was attached for the upload."
        });
    }

    const extension = path.extname(req.file.originalname);
    const key = `book-covers/${crypto.randomUUID()}${extension}`;

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    });

    try {
        await s3.send(command);

        return res.status(200).json({
            message: "The book cover file has been uploaded successfully.",
            key: key,
            url: `${process.env.PUBLIC_BASE_URL}`
        });
    } catch (err) {
        console.error("R2 book cover upload failed.");
        return res.status(400).json({
            message: "Book cover upload failed.",
            error: err.message
        });
    }
});

export default testRouter;
