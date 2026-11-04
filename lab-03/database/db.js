
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./books.db", (err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("Lab 3 database connected successfully");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price REAL NOT NULL
        )
    `, (err) => {

        if (err) {
            console.log("Table creation failed:", err.message);
            return;
        }

        db.get("SELECT COUNT(*) AS count FROM books", (err, row) => {

            if (err) {
                console.log(err.message);
                return;
            }

            if (row.count === 0) {

                const books = [
                    ["C++ Programming", "Bjarne Stroustrup", 450],
                    ["Java Programming", "James Gosling", 500],
                    ["Python Crash Course", "Eric Matthes", 600],
                    ["Clean Code", "Robert Martin", 750],
                    ["The Alchemist", "Paulo Coelho", 350],
                    ["Atomic Habits", "James Clear", 400],
                    ["Rich Dad Poor Dad", "Robert Kiyosaki", 300],
                    ["Introduction to Algorithms", "Thomas Cormen", 900],
                    ["JavaScript Guide", "David Flanagan", 550],
                    ["Database System Concepts", "Abraham Silberschatz", 800]
                ];

                const stmt = db.prepare(
                    "INSERT INTO books (title, author, price) VALUES (?, ?, ?)"
                );

                books.forEach((book) => stmt.run(book));

                stmt.finalize(() => {
                    console.log("10 sample books inserted successfully");
                });

            } else {
                console.log("Books already exist");
            }
        });
    });
});

module.exports = db;
