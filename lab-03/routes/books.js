
const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Allowed sorting columns
const allowedColumns = ["id", "title", "author", "price"];

// Validate book details
function validateBook(body) {
    const { title, author, price } = body || {};

    if (typeof title !== "string" || !title.trim()) {
        return "Title is required";
    }

    if (typeof author !== "string" || !author.trim()) {
        return "Author is required";
    }

    if (price === undefined || price === null ||
        price === "" || !Number.isFinite(Number(price))) {
        return "Price must be a valid number";
    }

    if (Number(price) < 0) {
        return "Price cannot be negative";
    }

    return null;
}

// 1. GET - All books with search, sorting, pagination and price filter
router.get("/", (req, res) => {

    const {
        search_q = "",
        order_by = "id",
        order = "ASC",
        limit = "10",
        offset = "0",
        min_price,
        max_price
    } = req.query;

    // Validate sorting column
    if (!allowedColumns.includes(order_by)) {
        return res.status(400).json({
            message: "Invalid order_by value"
        });
    }

    // Validate sorting order
    const sortOrder = order.toUpperCase();

    if (!["ASC", "DESC"].includes(sortOrder)) {
        return res.status(400).json({
            message: "Order must be ASC or DESC"
        });
    }

    // Validate limit and offset
    const pageLimit = Number(limit);
    const pageOffset = Number(offset);

    if (!Number.isInteger(pageLimit) || pageLimit < 1 ||
        pageLimit > 100 ||
        !Number.isInteger(pageOffset) || pageOffset < 0) {
        return res.status(400).json({
            message: "Invalid limit or offset"
        });
    }

    // Validate price filters
    const min = min_price === undefined ? null : Number(min_price);
    const max = max_price === undefined ? null : Number(max_price);

    if (
        (min_price !== undefined && (!Number.isFinite(min) || min < 0)) ||
        (max_price !== undefined && (!Number.isFinite(max) || max < 0)) ||
        (min !== null && max !== null && min > max)
    ) {
        return res.status(400).json({
            message: "Invalid price range"
        });
    }

    let sql = "SELECT * FROM books WHERE 1=1";
    const params = [];

    // Search by partial title
    if (search_q.trim()) {
        sql += " AND title LIKE ?";
        params.push(`%${search_q.trim()}%`);
    }

    // Minimum price
    if (min !== null) {
        sql += " AND price >= ?";
        params.push(min);
    }

    // Maximum price
    if (max !== null) {
        sql += " AND price <= ?";
        params.push(max);
    }

    // Sorting and pagination
    sql += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?`;

    params.push(pageLimit, pageOffset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to retrieve books"
            });
        }

        res.status(200).json(rows);
    });
});

// 2. GET - Book by ID
router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid book ID"
        });
    }

    db.get(
        "SELECT * FROM books WHERE id = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to retrieve book"
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json(row);
        }
    );
});

// 3. POST - Add a new book
router.post("/", (req, res) => {

    const error = validateBook(req.body);

    if (error) {
        return res.status(400).json({
            message: error
        });
    }

    const { title, author, price } = req.body;

    const sql = `
        INSERT INTO books (title, author, price)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [title.trim(), author.trim(), Number(price)], function (err) {
        if (err) {
            return res.status(500).json({
                message: "Failed to add book"
            });
        }

        res.status(201).json({
            message: "Book added successfully",
            id: this.lastID
        });
    });
});

// 4. PUT - Update a book
router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid book ID"
        });
    }

    const error = validateBook(req.body);

    if (error) {
        return res.status(400).json({
            message: error
        });
    }

    const { title, author, price } = req.body;

    const sql = `
        UPDATE books
        SET title = ?, author = ?, price = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [title.trim(), author.trim(), Number(price), id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Failed to update book"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book updated successfully"
            });
        }
    );
});

// 5. DELETE - Delete a book
router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid book ID"
        });
    }

    db.run(
        "DELETE FROM books WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Failed to delete book"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book deleted successfully"
            });
        }
    );
});

module.exports = router;
