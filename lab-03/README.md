# Lab 3: SQLite Database and Advanced CRUD Operations

## Overview

This project implements a RESTful API using Node.js, Express.js, and SQLite3. It extends basic CRUD operations by introducing advanced database features such as searching, sorting, pagination, price filtering, input validation, and error handling.

The application manages book records stored in an SQLite database and provides API endpoints to perform different operations.

## Technologies Used

- Node.js
- Express.js
- SQLite3
- JavaScript
- Postman
- Nodemon
- Git and GitHub

## Project Structure

```text
lab-03/
│
├── database/
│   └── db.js
│
├── routes/
│   └── books.js
│
├── screenshots/
│   ├── 1-getall.png
│   ├── 2-searchbooks.png
│   ├── 3-sortasc.png
│   ├── 4-sortdesc.png
│   ├── 5-paginationfirst.png
│   ├── 6-paginationlast.png
│   ├── 7-pricefilter.png
│   ├── 8-combined_parameters.png
│   ├── 9-post.png
│   ├── 10-postmissing.png
│   ├── 11-post_missing_author.png
│   ├── 12-post_invalid_price.png
│   ├── 13-put_update.png
│   ├── 14-delete.png
│   ├── 15-not_found.png
│   └── 16-invalid_query.png
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Features

### 1. Database Connection

- Connects to an SQLite database.
- Creates the books table automatically.
- Inserts 10 sample books when the table is empty.

### 2. CRUD Operations

- Create new book records.
- Retrieve all books.
- Retrieve a specific book using its ID.
- Update existing book details.
- Delete book records.

### 3. Search Functionality

Search books using the `search_q` query parameter.

Example:

```http
GET /books?search_q=Java
```

### 4. Sorting

Sort books using a selected column and sorting order.

Example:

```http
GET /books?order_by=price&order=ASC
```

Supported sorting columns:

- id
- title
- author
- price

Sorting options:

- ASC – Ascending order
- DESC – Descending order

### 5. Pagination

Retrieve books in smaller groups using `limit` and `offset`.

Example:

```http
GET /books?limit=5&offset=0
```

```http
GET /books?limit=5&offset=5
```

### 6. Price Filtering

Filter books based on minimum and maximum prices.

Example:

```http
GET /books?min_price=300&max_price=600
```

Individual filters are also supported:

```http
GET /books?min_price=300
```

```http
GET /books?max_price=600
```

### 7. Combined Query Parameters

Multiple query parameters can be used in a single request.

Example:

```http
GET /books?search_q=Java&order_by=price&order=ASC&limit=5&offset=0&min_price=300&max_price=600
```

### 8. Input Validation and Error Handling

- Validates book titles and authors.
- Checks that prices are numeric and non-negative.
- Validates book IDs.
- Checks sorting columns and sorting order.
- Validates pagination values.
- Checks minimum and maximum price ranges.
- Returns appropriate HTTP status codes and JSON error messages.

## API Endpoints

Base URL:

`http://localhost:3001`

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Display API welcome page |
| GET | `/books` | Retrieve books with search and filters |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nathshiva451-afk/BDF-LAB3.git
```

### 2. Navigate to the Project Folder

```bash
cd BDF-LAB3
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The server will start at:

`http://localhost:3001`

## Available Scripts

Start the application:

```bash
npm start
```

Start the application in development mode using Nodemon:

```bash
npm run dev
```

## Testing

The API was tested using Postman.

The following test cases were performed:

| No. | Test Case | Screenshot |
|---|---|---|
| 1 | Retrieve all books | 1-getall.png |
| 2 | Search books | 2-searchbooks.png |
| 3 | Sort books in ascending order | 3-sortasc.png |
| 4 | Sort books in descending order | 4-sortdesc.png |
| 5 | First-page pagination | 5-paginationfirst.png |
| 6 | Next-page pagination | 6-paginationlast.png |
| 7 | Price filtering | 7-pricefilter.png |
| 8 | Combined query parameters | 8-combined_parameters.png |
| 9 | Add a new book | 9-post.png |
| 10 | Validate missing title | 10-postmissing.png |
| 11 | Validate missing author | 11-post_missing_author.png |
| 12 | Validate invalid price | 12-post_invalid_price.png |
| 13 | Update a book | 13-put_update.png |
| 14 | Delete a book | 14-delete.png |
| 15 | Handle book not found | 15-not_found.png |
| 16 | Handle invalid query parameters | 16-invalid_query.png |

All screenshots are available in the `screenshots` directory.

## GitHub Repository

[View Lab 3 GitHub Repository](https://github.com/nathshiva451-afk/BDF-LAB3)

## Deployment

**Live Deployment URL:** To be added after deployment.

## Learning Outcomes

- Understanding SQLite database operations.
- Implementing RESTful API endpoints.
- Performing CRUD operations.
- Implementing search, sorting, and pagination.
- Applying price filters using SQL queries.
- Validating API request parameters.
- Handling errors and HTTP status codes.
- Testing REST APIs using Postman.

---

**Subject:** Backend Development Fundamentals  
**Lab:** 3 – SQLite Database and Advanced CRUD Operations