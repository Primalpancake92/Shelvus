import express from "express";
const bookRouter = express.Router();
import bookController from "../Controllers/Book/bookController.js";

// This is the POST HTTP method route
bookRouter.post("/add-book", bookController.addBook);

// This is the GET HTTP method 
bookRouter.get("/find-book", bookController.findBookByTitle);

// This is the PUT HTTP method
bookRouter.put("/update-book", bookController.updateBook);

// This is the DELETE HTTP method
bookRouter.delete("/delete-book", bookController.deleteBook);

export default bookRouter;