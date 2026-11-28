import multer from "multer";

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

export default upload;