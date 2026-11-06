/**
 * ============================================================================
 * Lab 3 – REST API, Query Parameters, Validation and Debugging
 * Subject: Backend Development Fundamentals
 * Student Name: PONDURI GOPI KRISHNA
 * Registration Number: 252U1R1196
 * Section: CSE-2D
 * GitHub Repository: Gopi-Krishna
 * ============================================================================
 *
 * Description:
 * Advanced RESTful Book Management API implementing:
 * - Query parameters: search_q, order_by, order, limit, offset, min_price, max_price
 * - Strict allowlists for SQL keywords/identifiers (SQL injection prevention)
 * - Strict request body validation with standardized HTTP status codes
 * - Centralized, secure error handling
 */

const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Database connection instance (shared across routes)
let db = null;

// Path to SQLite database file
const dbPath = path.join(__dirname, 'database.db');

/**
 * ============================================================================
 * DATABASE INITIALIZATION & SERVER STARTUP
 * ============================================================================
 */
const initializeDBAndServer = async () => {
  try {
    // 1. Open SQLite database using promise-based wrapper
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('[SQLite] Lab 3 Database connected successfully.');

    // 2. Ensure table 'book' exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL DEFAULT 0
      );
    `);

    // 3. Seed 10 realistic books if the table is empty
    const countResult = await db.get(`SELECT COUNT(*) AS count FROM book;`);
    if (countResult.count === 0) {
      console.log('[SQLite] Seeding 10 realistic book records...');
      const sampleBooks = [
        ['The Pragmatic Programmer', 'David Thomas, Andrew Hunt', 750, 352],
        ['Clean Code', 'Robert C. Martin', 650, 464],
        ["You Don't Know JS: Scope & Closures", 'Kyle Simpson', 420, 144],
        ['Designing Data-Intensive Applications', 'Martin Kleppmann', 1200, 616],
        ['JavaScript: The Good Parts', 'Douglas Crockford', 380, 176],
        ['Atomic Habits', 'James Clear', 450, 320],
        ['Node.js Design Patterns', 'Mario Casciaro', 890, 660],
        ['Learning SQL', 'Alan Beaulieu', 550, 380],
        ['Introduction to Algorithms', 'Thomas H. Cormen', 1400, 1312],
        ['Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 790, 448]
      ];

      const insertQuery = `INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);`;
      for (const book of sampleBooks) {
        await db.run(insertQuery, book);
      }
      console.log('[SQLite] 10 sample books seeded successfully.');
    }

    // 4. Start the Express server only after database is ready
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` Lab 3 Server is running!`);
      console.log(` Port: ${PORT}`);
      console.log(` URL : http://localhost:${PORT}/`);
      console.log(` Books API: http://localhost:${PORT}/books`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error(`[DB Error] Failed to connect to database: ${error.message}`);
    process.exit(1);
  }
};

// Start initialization
initializeDBAndServer();

// ============================================================================
// ROOT ENDPOINT
// ============================================================================
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Lab 3 - REST API, Query Parameters, Validation and Debugging Server!');
});

// ============================================================================
// PHASE 2, 3, 4: REST API ENDPOINTS & QUERY PARAMETERS
// ============================================================================

/**
 * Endpoint 1: GET /books
 * Description: Retrieve books with search, sort, pagination, and price filtering.
 * Query Parameters:
 *   - search_q: partial title search (SQL LIKE)
 *   - order_by: valid column name (allowlist: id, title, author, price, pages) [default: id]
 *   - order: sort direction (allowlist: ASC, DESC) [default: ASC]
 *   - limit: maximum records to return (positive integer) [default: 10]
 *   - offset: records to skip (non-negative integer) [default: 0]
 *   - min_price: filter price >= min_price (non-negative number)
 *   - max_price: filter price <= max_price (non-negative number)
 */
app.get('/books', async (req, res) => {
  try {
    const {
      search_q = '',
      order_by = 'id',
      order = 'ASC',
      limit = '10',
      offset = '0',
      min_price,
      max_price
    } = req.query;

    // --- Strict Allowlist Validation for order_by ---
    const allowedOrderBy = ['id', 'title', 'author', 'price', 'pages'];
    const sanitizedOrderBy = order_by.toLowerCase();
    if (!allowedOrderBy.includes(sanitizedOrderBy)) {
      return res.status(400).json({
        message: `Invalid order_by field. Allowed fields: ${allowedOrderBy.join(', ')}`
      });
    }

    // --- Strict Allowlist Validation for order (ASC / DESC) ---
    const sanitizedOrder = order.toUpperCase();
    if (sanitizedOrder !== 'ASC' && sanitizedOrder !== 'DESC') {
      return res.status(400).json({
        message: 'Invalid order value. Allowed values: ASC, DESC'
      });
    }

    // --- Validation for limit ---
    const parsedLimit = Number(limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({
        message: 'Invalid limit. Must be a positive integer'
      });
    }

    // --- Validation for offset ---
    const parsedOffset = Number(offset);
    if (!Number.isInteger(parsedOffset) || parsedOffset < 0) {
      return res.status(400).json({
        message: 'Invalid offset. Must be a non-negative integer'
      });
    }

    // --- Validation for min_price & max_price ---
    let parsedMinPrice = undefined;
    let parsedMaxPrice = undefined;

    if (min_price !== undefined) {
      parsedMinPrice = Number(min_price);
      if (isNaN(parsedMinPrice) || parsedMinPrice < 0) {
        return res.status(400).json({
          message: 'Invalid min_price. Must be a non-negative number'
        });
      }
    }

    if (max_price !== undefined) {
      parsedMaxPrice = Number(max_price);
      if (isNaN(parsedMaxPrice) || parsedMaxPrice < 0) {
        return res.status(400).json({
          message: 'Invalid max_price. Must be a non-negative number'
        });
      }
    }

    if (parsedMinPrice !== undefined && parsedMaxPrice !== undefined) {
      if (parsedMinPrice > parsedMaxPrice) {
        return res.status(400).json({
          message: 'Minimum price cannot be greater than maximum price'
        });
      }
    }

    // --- Construct Parameterized SQL Query ---
    const conditions = [];
    const params = [];

    // Search partial title using SQL LIKE with ? placeholder
    if (search_q.trim() !== '') {
      conditions.push(`title LIKE ?`);
      params.push(`%${search_q.trim()}%`);
    }

    // Price range filtering
    if (parsedMinPrice !== undefined && parsedMaxPrice !== undefined) {
      conditions.push(`price BETWEEN ? AND ?`);
      params.push(parsedMinPrice, parsedMaxPrice);
    } else if (parsedMinPrice !== undefined) {
      conditions.push(`price >= ?`);
      params.push(parsedMinPrice);
    } else if (parsedMaxPrice !== undefined) {
      conditions.push(`price <= ?`);
      params.push(parsedMaxPrice);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // SQL Injection Prevention:
    // sanitizedOrderBy and sanitizedOrder are strictly checked against allowlists.
    // All user values (search, price, limit, offset) are bound via parameterized '?' placeholders.
    const getBooksQuery = `
      SELECT * FROM book
      ${whereClause}
      ORDER BY ${sanitizedOrderBy} ${sanitizedOrder}
      LIMIT ? OFFSET ?;
    `;
    params.push(parsedLimit, parsedOffset);

    const books = await db.all(getBooksQuery, params);
    res.status(200).json(books);
  } catch (error) {
    console.error(`Error fetching books: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint 2: GET /books/:bookId
 * Description: Retrieve a single book by ID.
 */
app.get('/books/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const parsedId = Number(bookId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Parameterized query prevents SQL injection
    const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
    const book = await db.get(getBookQuery, [parsedId]);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(`Error fetching book ${req.params.bookId}: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint 3: POST /books
 * Description: Add a new book with strict body validation.
 * Validation Rules:
 *   1. Reject missing or empty title
 *   2. Reject missing or empty author
 *   3. Reject missing, non-numeric, or negative price
 */
app.post('/books', async (req, res) => {
  try {
    const { title, author, price, pages = 0 } = req.body;

    // 1 & 2: Title validation
    if (title === undefined || title === null) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    // 3 & 4: Author validation
    if (author === undefined || author === null) {
      return res.status(400).json({ message: 'Author is required' });
    }
    if (typeof author !== 'string' || author.trim() === '') {
      return res.status(400).json({ message: 'Author cannot be empty' });
    }

    // 5, 6, 7: Price validation
    if (price === undefined || price === null) {
      return res.status(400).json({ message: 'Price is required' });
    }
    if (typeof price !== 'number' || isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }
    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    // Pages validation (optional, non-negative integer)
    const parsedPages = Number(pages);
    if (isNaN(parsedPages) || parsedPages < 0) {
      return res.status(400).json({ message: 'Pages must be a non-negative number' });
    }

    // Parameterized INSERT query
    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;
    const result = await db.run(addBookQuery, [
      title.trim(),
      author.trim(),
      Math.round(price),
      Math.round(parsedPages)
    ]);

    res.status(201).json({
      message: 'Book created successfully',
      bookId: result.lastID
    });
  } catch (error) {
    console.error(`Error adding book: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint 4: PUT /books/:bookId
 * Description: Update an existing book with validation and existence check.
 */
app.put('/books/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const parsedId = Number(bookId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Check if book exists first
    const checkQuery = `SELECT * FROM book WHERE id = ?;`;
    const existingBook = await db.get(checkQuery, [parsedId]);

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const { title, author, price, pages = existingBook.pages } = req.body;

    // Title validation
    if (title === undefined || title === null) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    // Author validation
    if (author === undefined || author === null) {
      return res.status(400).json({ message: 'Author is required' });
    }
    if (typeof author !== 'string' || author.trim() === '') {
      return res.status(400).json({ message: 'Author cannot be empty' });
    }

    // Price validation
    if (price === undefined || price === null) {
      return res.status(400).json({ message: 'Price is required' });
    }
    if (typeof price !== 'number' || isNaN(price)) {
      return res.status(400).json({ message: 'Price must be a valid number' });
    }
    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    // Pages validation
    const parsedPages = Number(pages);
    if (isNaN(parsedPages) || parsedPages < 0) {
      return res.status(400).json({ message: 'Pages must be a non-negative number' });
    }

    // Parameterized UPDATE query
    const updateQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;
    await db.run(updateQuery, [
      title.trim(),
      author.trim(),
      Math.round(price),
      Math.round(parsedPages),
      parsedId
    ]);

    res.status(200).json({
      message: 'Book updated successfully'
    });
  } catch (error) {
    console.error(`Error updating book ${req.params.bookId}: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint 5: DELETE /books/:bookId
 * Description: Delete an existing book by ID.
 */
app.delete('/books/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const parsedId = Number(bookId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    // Check if book exists
    const checkQuery = `SELECT * FROM book WHERE id = ?;`;
    const existingBook = await db.get(checkQuery, [parsedId]);

    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Parameterized DELETE query
    const deleteQuery = `DELETE FROM book WHERE id = ?;`;
    await db.run(deleteQuery, [parsedId]);

    res.status(200).json({
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting book ${req.params.bookId}: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ============================================================================
// 404 UNKNOWN ROUTE MIDDLEWARE
// ============================================================================
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

module.exports = app;

