# Screenshots Directory - Lab 3

This directory stores verification screenshots for **Lab 3 – REST API, Query Parameters, Validation and Debugging**.

---

## Required Screenshots Checklist (13 Total)

| # | Filename | Action / Test Case | What to Show in Screenshot | Status |
| :-: | :--- | :--- | :--- | :-: |
| 1 | `01-get-all-books.png` | `GET /books` | `200 OK` with JSON array of all books | `Verified & Saved` |
| 2 | `02-get-one-book.png` | `GET /books/1` | `200 OK` with JSON object for Book ID 1 | `Verified & Saved` |
| 3 | `03-post-book.png` | `POST /books` | `201 Created` with `{"message":"Book created successfully","bookId":...}` | `Verified & Saved` |
| 4 | `04-put-book.png` | `PUT /books/:id` | `200 OK` with `{"message":"Book updated successfully"}` | `Verified & Saved` |
| 5 | `05-delete-book.png` | `DELETE /books/:id` | `200 OK` with `{"message":"Book deleted successfully"}` | `Verified & Saved` |
| 6 | `06-search-functionality.png` | `GET /books?search_q=Clean` | `200 OK` showing books filtered by partial title | `Verified & Saved` |
| 7 | `07-sorting-functionality.png` | `GET /books?order_by=price&order=DESC` | `200 OK` showing books sorted descending by price | `Verified & Saved` |
| 8 | `08-pagination-limit-offset.png` | `GET /books?offset=2&limit=3` | `200 OK` showing exactly 3 books after skipping 2 | `Verified & Saved` |
| 9 | `09-price-range-filtering.png` | `GET /books?min_price=400&max_price=800` | `200 OK` showing books within price range | `Verified & Saved` |
| 10 | `10-validation-missing-title.png` | `POST /books` (No title) | `400 Bad Request` with `{"message":"Title is required"}` | `Verified & Saved` |
| 11 | `11-validation-invalid-price.png` | `POST /books` (Negative price) | `400 Bad Request` with `{"message":"Price cannot be negative"}` | `Verified & Saved` |
| 12 | `12-404-response.png` | `GET /books/999` | `404 Not Found` with `{"message":"Book not found"}` | `Verified & Saved` |
| 13 | `13-postman-testing-evidence.png` | Postman / Test Runner Summary | Terminal test runner passing all 24/24 tests | `Verified & Saved` |
| 14 | `14-sqlite-database-records.png` | SQLite Database CLI | Console table showing SQLite books records | `Verified & Saved` |

---

## How to Capture the Screenshots (Step-by-Step)

### Option A: In Web Browser (GET endpoints)
Open Chrome or Edge and navigate to:
- **Screenshot 1:** `http://localhost:3000/books`
- **Screenshot 2:** `http://localhost:3000/books/1`
- **Screenshot 6:** `http://localhost:3000/books?search_q=Clean`
- **Screenshot 7:** `http://localhost:3000/books?order_by=price&order=DESC`
- **Screenshot 8:** `http://localhost:3000/books?offset=2&limit=3`
- **Screenshot 9:** `http://localhost:3000/books?min_price=400&max_price=800`
- **Screenshot 12:** `http://localhost:3000/books/999`

---

### Option B: In Postman or PowerShell (POST, PUT, DELETE, and Validations)
- **Screenshot 3 (POST):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/books" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"title":"Atomic Habits (Special Edition)","author":"James Clear","price":450,"pages":320}'
  ```
- **Screenshot 4 (PUT):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/books/11" -Method PUT -Headers @{"Content-Type"="application/json"} -Body '{"title":"Atomic Habits (Updated Edition)","author":"James Clear","price":550,"pages":340}'
  ```
- **Screenshot 5 (DELETE):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/books/11" -Method DELETE
  ```
- **Screenshot 10 (Validation - Missing Title):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/books" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"author":"James Clear","price":450}'
  ```
- **Screenshot 11 (Validation - Negative Price):**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:3000/books" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"title":"Atomic Habits","author":"James Clear","price":-50}'
  ```
- **Screenshot 13 (Test Runner Evidence):**
  Run `npm test` or the test script and capture the summary.

