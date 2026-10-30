/**
 * ============================================================================
 * Lab 1 - Plain Node.js HTTP Server
 * Student Name: PONDURI GOPI KRISHNA
 * Registration Number: [LEAVE A PLACEHOLDER]
 * Section: [LEAVE A PLACEHOLDER]
 * ============================================================================
 * 
 * Objective:
 * Demonstrate how Node.js creates a web server using its core built-in 'http'
 * module without relying on external frameworks.
 */

// 1. Import the built-in http module
const http = require('http');

// 2. Define the port number (defaults to 3000 or uses environment variable)
const PORT = process.env.PORT || 3000;

// 3. Create a server using http.createServer()
// The callback function executes every time a request hits the server.
// - req: The incoming HTTP request
// - res: The outgoing HTTP response
const server = http.createServer((req, res) => {
  // Set the HTTP status code to 200 (OK) and define response headers
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  // Return "Hello" as the response and close the connection
  res.end('Hello');
});

// 4. Start listening on the specified port
server.listen(PORT, () => {
  // 5. Display a meaningful server-running message in the terminal
  console.log(`====================================================`);
  console.log(` Node.js HTTP Server is running!`);
  console.log(` Port: ${PORT}`);
  console.log(` URL : http://localhost:${PORT}`);
  console.log(`====================================================`);
});

