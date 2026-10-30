/**
 * ============================================================================
 * Lab 1 – Node.js and Express Server
 * Student Name: PONDURI GOPI KRISHNA
 * Registration Number: [LEAVE A PLACEHOLDER]
 * Section: [LEAVE A PLACEHOLDER]
 * ============================================================================
 * 
 * Objective:
 * Implement a lightweight, modular RESTful web server using Express.js with
 * defined route handlers and custom 404 error-handling middleware.
 */

// 1. Import Express
const express = require('express');

// 2. Initialize the application using const app = express()
const app = express();

// 3. Server Configuration: Port configuration for local development & cloud deployment (e.g. Render)
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing middleware (standard practice for Express APIs)
app.use(express.json());

// ============================================================================
// ROUTE DEFINITIONS
// ============================================================================

/**
 * Route: GET /
 * Description: Root welcome route
 * Status: 200 OK
 */
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Lab 1 - Node.js and Express Server!');
});

/**
 * Route: GET /about
 * Description: Returns student details in JSON format
 * Status: 200 OK
 */
app.get('/about', (req, res) => {
  res.status(200).json({
    studentName: 'PONDURI GOPI KRISHNA',
    registrationNumber: '[LEAVE A PLACEHOLDER]',
    section: '[LEAVE A PLACEHOLDER]'
  });
});

/**
 * Route: GET /time
 * Description: Returns the current date and time using new Date()
 * Status: 200 OK
 */
app.get('/time', (req, res) => {
  const now = new Date();
  res.status(200).json({
    currentTime: now.toISOString(),
    formattedTime: now.toString()
  });
});

// ============================================================================
// ERROR HANDLING MIDDLEWARE
// ============================================================================

/**
 * Middleware: 404 Not Found Handler
 * Matches any request that did not match the routes defined above.
 * Status: 404 Not Found
 */
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// ============================================================================
// SERVER INITIALIZATION
// ============================================================================

// Start the Express application using app.listen()
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Express Server is running!`);
  console.log(` Port: ${PORT}`);
  console.log(` URL : http://localhost:${PORT}`);
  console.log(`====================================================`);
});

// Export app for modularity and testing purposes
module.exports = app;

