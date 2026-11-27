// Must stay the first import: loads .env before any other module reads it.
import "./config/env.js";

import express from "express";
import db from "./config/database_conn.js";
import session from "express-session";
import cors from "cors";
import "./Database/init.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import testS3Route from "./routes/testS3Route.js";

const app = express();
const port = process.env.PORT || "3000";

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: "test-secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 60000 * 15
    },
}));

app.use("/user", userRoutes);
app.use("/book", bookRoutes);
app.use("/s3Test-routes", testS3Route);

const serverConn = app.listen(port, () => {
    console.log("The server has successfully connected.");
});

process.on("SIGINT", () => {
    console.log("Shutting down server...");

    serverConn.close(() => {
        console.log("HTTP server closed.");
        db.close();
        console.log("Library database has closed.");
        process.exit(0);
    });
});