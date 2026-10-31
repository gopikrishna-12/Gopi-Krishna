# Screenshots Directory - Lab 2

This directory stores verification screenshots for **Lab 2 – SQLite Database and CRUD Routes**.

---

## Required Screenshots Checklist

Capture and place the following 9 genuine screenshots into this directory:

| # | Filename | Action / Endpoint Tested | What to Show in Screenshot | Status |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `01-get-all-books.png` | `GET /books/` (Postman/Browser) | `200 OK` with JSON array of all books | `Pending Capture` |
| 2 | `02-get-one-book.png` | `GET /books/1/` (Postman/Browser) | `200 OK` with JSON object for book ID 1 | `Pending Capture` |
| 3 | `03-post-new-book.png` | `POST /books/` (Postman) | `201 Created` with `{"message":"Book Added Successfully","bookId":...}` | `Pending Capture` |
| 4 | `04-put-update-book.png` | `PUT /books/:bookId/` (Postman) | `200 OK` with `{"message":"Book Updated Successfully"}` | `Pending Capture` |
| 5 | `05-delete-book.png` | `DELETE /books/:bookId/` (Postman) | `200 OK` with `{"message":"Book Deleted Successfully"}` | `Pending Capture` |
| 6 | `06-404-error-response.png` | `GET /books/999/` or `GET /unknown` | `404 Not Found` with JSON error payload | `Pending Capture` |
| 7 | `07-sqlite-inserted-records.png` | SQLite CLI / Terminal SELECT | Terminal showing the newly inserted record in `book` table | `Pending Capture` |
| 8 | `08-sqlite-updated-records.png` | SQLite CLI / Terminal SELECT | Terminal showing updated record values in `book` table | `Pending Capture` |
| 9 | `09-sqlite-deleted-records.png` | SQLite CLI / Terminal SELECT | Terminal showing that deleted record ID is gone | `Pending Capture` |

---

## How to Capture the Screenshots (Step-by-Step)

### A. API Endpoints (Screenshots 1 to 6) in Postman or Browser:
1. Start the server:
   ```bash
   cd "a:\BDS LABS\Gopi-Krishna\lab-02"
   npm start
   ```
2. In Postman:
   - **Screenshot 1:** `GET http://localhost:3000/books/` (Press Send, capture URL, Status 200, and JSON response).
   - **Screenshot 2:** `GET http://localhost:3000/books/1/` (Press Send, capture URL, Status 200, and single book JSON).
   - **Screenshot 3:** `POST http://localhost:3000/books/` with Body -> raw -> JSON:
     ```json
     {
       "title": "Atomic Habits",
       "author": "James Clear",
       "price": 450,
       "pages": 320
     }
     ```
     (Capture Status 201 and response).
   - **Screenshot 4:** `PUT http://localhost:3000/books/11/` (or your new book's ID) with Body -> raw -> JSON:
     ```json
     {
       "title": "Atomic Habits (Hardcover Edition)",
       "author": "James Clear",
       "price": 550,
       "pages": 340
     }
     ```
     (Capture Status 200 and success response).
   - **Screenshot 5:** `DELETE http://localhost:3000/books/11/` (Capture Status 200 and success response).
   - **Screenshot 6:** `GET http://localhost:3000/books/999/` (Capture Status 404 and `{"error":"Not Found",...}`).

3. Press <kbd>Windows</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> to take the screenshot and save it into this folder with the designated filename.

---

### B. SQLite CLI / Terminal Verification (Screenshots 7 to 9):
Open a terminal in `lab-02` and run SQLite queries to display table rows:

- **Using SQLite CLI (if installed):**
  ```bash
  sqlite3 database.db "SELECT * FROM book;"
  ```
- **Or Using Node One-Liner (always works):**
  ```bash
  node -e "const s = require('sqlite3').verbose(); const d = new s.Database('./database.db'); d.all('SELECT * FROM book', (e, r) => console.table(r));"
  ```
Capture the terminal output showing the table after Insertion (7), after Update (8), and after Deletion (9).

