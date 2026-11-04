# Lab 2: SQLite Database and CRUD Routes

## Overview

This project implements a RESTful API using **Node.js, Express.js, and SQLite**. It demonstrates basic database operations (CRUD) by managing a collection of books.

The API allows users to create, retrieve, update, and delete book records stored in an SQLite database.

## Technologies Used

- Node.js
- Express.js
- SQLite3
- JavaScript
- Postman
- Nodemon

## Project Structure

BDF-LAB2,3
lab-02/
├── database/
│   └── db.js
├── routes/
│   └── books.js
├── screenshot/
│   ├── getall.png
│   ├── getone.png
│   ├── post.png
│   ├── put.png
│   └── delete.png
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


## Features

- SQLite database connection.
- Automatic creation of the books table.
- Insertion of 10 sample books when the database is empty.
- Retrieve all books.
- Retrieve a book using its ID.
- Add a new book.
- Update an existing book.
- Delete a book.
- JSON request and response handling.
- Error handling for invalid or unavailable book IDs.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Installation and Setup

### 1. Clone the repository

```bash
git clone <YOUR_LAB_2_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project folder

```bash
cd lab-02
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The server will run at:

`http://localhost:3000`

## Testing

All API endpoints were tested using Postman.

The following operations were tested:

1. Retrieve all books.
2. Retrieve a book by ID.
3. Add a new book.
4. Update an existing book.
5. Delete a book.
6. Check the response for a deleted or unavailable book.

Screenshots of the API testing results are available in the `screenshot` folder.

## GitHub Repository

[Lab 2 GitHub Repository](<YOUR_LAB_2_GITHUB_REPOSITORY_URL>)

## Deployment

**Live API URL:** Add your deployment URL after deploying the project.

## Learning Outcomes

- Understanding REST API fundamentals.
- Connecting Node.js applications with SQLite.
- Performing CRUD operations.
- Using Express.js routes.
- Testing APIs using Postman.
- Handling HTTP status codes and errors.

---
**Lab 2 – Backend Development Fundamentals**
