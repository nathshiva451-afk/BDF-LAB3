
const express = require("express");
const app = express();

const db = require("./database/db");
const booksRouter = require("./routes/books");

app.use(express.json());
// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to Lab 3 REST API</h1>
        <h2>Book Management System</h2>
        <p>Server is running successfully!</p>
        <a href="/books">View All Books</a>
    `);
});

app.use("/books", booksRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Lab 3 server running at: http://localhost:${PORT}`);
});