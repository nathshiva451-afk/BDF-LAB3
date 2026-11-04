
const express = require("express");
const router = express.Router();
const db = require("../database/db");

// 1. GET - Display all books
router.get("/", (req, res) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json(rows);
    });
});

// 2. GET - Display book by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(row);
    });
});

// 3. POST - Add a new book
router.post("/", (req, res) => {
    const { title, author, price } = req.body;

    const sql = "INSERT INTO books (title, author, price) VALUES (?, ?, ?)";

    db.run(sql, [title, author, price], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(201).json({
            message: "Book added successfully",
            id: this.lastID
        });
    });
});

// 4. PUT - Update a book
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { title, author, price } = req.body;

    const sql = `
        UPDATE books
        SET title = ?, author = ?, price = ?
        WHERE id = ?
    `;

    db.run(sql, [title, author, price, id], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully" });
    });
});

// 5. DELETE - Delete a book
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    });
});

module.exports = router;
