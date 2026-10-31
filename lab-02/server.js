/**
 * ============================================================================
 * Lab 2 – SQLite Database and CRUD Routes
 * Subject: Backend Development Fundamentals
 * Student Name: PONDURI GOPI KRISHNA
 * Registration Number: 252U1R1196
 * Section: CSE-2D
 * ============================================================================
 *
 * Description:
 * A production-ready RESTful API server using Express.js and SQLite.
 * Implements complete CRUD (Create, Read, Update, Delete) operations with
 * parameterized queries to prevent SQL Injection vulnerabilities.
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
 * PHASE 4: DATABASE CONNECTION & SERVER INITIALIZATION
 * ============================================================================
 * Opens SQLite database connection and starts Express server only after
 * the database connection is successfully established.
 */
const initializeDBAndServer = async () => {
  try {
    // 1. Open the SQLite database using sqlite and sqlite3 driver
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('[SQLite] Database connected successfully.');

    // 2. Ensure the 'book' table exists with the required schema
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL
      );
    `);

    // 3. Seed 10 realistic books if the table is newly created/empty
    const rowCount = await db.get(`SELECT COUNT(*) AS count FROM book;`);
    if (rowCount.count === 0) {
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

      // Parameterized INSERT query: guarantees protection against SQL Injection
      const insertQuery = `INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);`;
      for (const book of sampleBooks) {
        await db.run(insertQuery, book);
      }
      console.log('[SQLite] 10 sample books inserted successfully.');
    }

    // 4. Start the Express server only after database is ready
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` Lab 2 Server is running!`);
      console.log(` Port: ${PORT}`);
      console.log(` URL : http://localhost:${PORT}/`);
      console.log(` Books API: http://localhost:${PORT}/books/`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error(`[DB Error] Failed to connect to database: ${error.message}`);
    process.exit(1);
  }
};

// Initialize Database and Server
initializeDBAndServer();

// ============================================================================
// ROOT ENDPOINT
// ============================================================================
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Lab 2 - SQLite Database and CRUD API Server!');
});

// ============================================================================
// PHASE 5 & 6: CRUD API ENDPOINTS (WITH SQL INJECTION PREVENTION)
// ============================================================================

/**
 * Endpoint 1: GET /books/
 * Description: Retrieve all books from the database
 * Expected Status: 200 OK
 * Response: JSON array of book objects
 */
app.get('/books/', async (req, res) => {
  try {
    const getBooksQuery = `SELECT * FROM book ORDER BY id ASC;`;
    const books = await db.all(getBooksQuery);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * Endpoint 2: GET /books/:bookId/
 * Description: Retrieve one book using its ID
 * Expected Status: 200 OK (if exists) | 404 Not Found (if not found) | 400 Bad Request (invalid ID)
 * Security: Uses parameterized query '?' to eliminate SQL Injection risks
 */
app.get('/books/:bookId/', async (req, res) => {
  try {
    const { bookId } = req.params;

    // Validate that bookId is a positive integer
    if (isNaN(bookId) || parseInt(bookId) <= 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid book ID. It must be a positive integer.'
      });
    }

    // SQL Injection Prevention: Parameterized query binds user input safely
    const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
    const book = await db.get(getBookQuery, [bookId]);

    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Book with ID ${bookId} not found.`
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * Endpoint 3: POST /books/
 * Description: Add a new book to the database
 * Expected Status: 201 Created | 400 Bad Request
 * Security: Uses parameterized query with (?) placeholders
 */
app.post('/books/', async (req, res) => {
  try {
    const { title, author, price, pages } = req.body;

    // Validate request body fields
    if (!title || !author || price === undefined || pages === undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'All fields (title, author, price, pages) are required.'
      });
    }

    if (typeof price !== 'number' || typeof pages !== 'number' || price < 0 || pages <= 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Price and pages must be valid positive numbers.'
      });
    }

    // Parameterized INSERT query: SQLite engine treats inputs strictly as literal values
    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;
    const result = await db.run(addBookQuery, [title.trim(), author.trim(), price, pages]);

    res.status(201).json({
      message: 'Book Added Successfully',
      bookId: result.lastID
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * Endpoint 4: PUT /books/:bookId/
 * Description: Update the details of an existing book
 * Expected Status: 200 OK | 404 Not Found | 400 Bad Request
 * Security: Parameterized query ensures values cannot break out of SQL string literals
 */
app.put('/books/:bookId/', async (req, res) => {
  try {
    const { bookId } = req.params;

    if (isNaN(bookId) || parseInt(bookId) <= 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid book ID. It must be a positive integer.'
      });
    }

    const { title, author, price, pages } = req.body;

    // Validate request body fields
    if (!title || !author || price === undefined || pages === undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'All fields (title, author, price, pages) are required for update.'
      });
    }

    if (typeof price !== 'number' || typeof pages !== 'number' || price < 0 || pages <= 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Price and pages must be valid positive numbers.'
      });
    }

    // Check if the book exists prior to updating
    const checkBookQuery = `SELECT * FROM book WHERE id = ?;`;
    const existingBook = await db.get(checkBookQuery, [bookId]);

    if (!existingBook) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Book with ID ${bookId} not found.`
      });
    }

    // Parameterized UPDATE query
    const updateBookQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;
    await db.run(updateBookQuery, [title.trim(), author.trim(), price, pages, bookId]);

    res.status(200).json({
      message: 'Book Updated Successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * Endpoint 5: DELETE /books/:bookId/
 * Description: Delete an existing book by ID
 * Expected Status: 200 OK | 404 Not Found | 400 Bad Request
 * Security: Parameterized DELETE query
 */
app.delete('/books/:bookId/', async (req, res) => {
  try {
    const { bookId } = req.params;

    if (isNaN(bookId) || parseInt(bookId) <= 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid book ID. It must be a positive integer.'
      });
    }

    // Check if book exists before attempting deletion
    const checkBookQuery = `SELECT * FROM book WHERE id = ?;`;
    const existingBook = await db.get(checkBookQuery, [bookId]);

    if (!existingBook) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Book with ID ${bookId} not found.`
      });
    }

    // Parameterized DELETE query
    const deleteBookQuery = `DELETE FROM book WHERE id = ?;`;
    await db.run(deleteBookQuery, [bookId]);

    res.status(200).json({
      message: 'Book Deleted Successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// ============================================================================
// 404 UNKNOWN ROUTE MIDDLEWARE
// ============================================================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Route not found'
  });
});

module.exports = app;

