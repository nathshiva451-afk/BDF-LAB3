
const express = require("express");
const app = express();

const db = require("./database/db");
const booksRouter = require("./routes/books");

app.use(express.json());

app.use("/books", booksRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
