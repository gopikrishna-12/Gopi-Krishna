# Screenshots Directory - Lab 2

This directory stores verified endpoint and database screenshots for **Lab 2 – SQLite Database and CRUD Routes**.

---

## Verified Screenshots Checklist

| # | Filename | Action / Endpoint Tested | What is Verified | Status |
| :---: | :--- | :--- | :--- | :---: |
| 1 | [`01-get-all-books.png`](./01-get-all-books.png) | `GET /books/` (Browser) | `200 OK` with JSON array of all 10 books | ✅ **Captured** |
| 2 | [`02-get-one-book.png`](./02-get-one-book.png) | `GET /books/1/` (Browser) | `200 OK` with JSON object for book ID 1 | ✅ **Captured** |
| 3 | [`03-post-new-book.png`](./03-post-new-book.png) | `POST /books/` (PowerShell) | `201 Created` with `{"message":"Book Added Successfully","bookId":13}` | ✅ **Captured** |
| 4 | [`04-put-update-book.png`](./04-put-update-book.png) | `PUT /books/13/` (PowerShell) | `200 OK` with `{"message":"Book Updated Successfully"}` | ✅ **Captured** |
| 5 | [`05-delete-book.png`](./05-delete-book.png) | `DELETE /books/13/` (PowerShell) | `200 OK` with `{"message":"Book Deleted Successfully"}` | ✅ **Captured** |
| 6 | [`06-404-error-response.png`](./06-404-error-response.png) | `GET /books/999/` (Browser) | `404 Not Found` with `{"error":"Not Found",...}` | ✅ **Captured** |
| 7 | [`07-sqlite-inserted-records.png`](./07-sqlite-inserted-records.png) | SQLite SELECT (Terminal) | Terminal table showing newly inserted Book ID 13 | ✅ **Captured** |
| 8 | [`08-sqlite-updated-records.png`](./08-sqlite-updated-records.png) | SQLite SELECT (Terminal) | Terminal table showing updated Book ID 13 | ✅ **Captured** |
| 9 | [`09-sqlite-deleted-records.png`](./09-sqlite-deleted-records.png) | SQLite SELECT (Terminal) | Terminal table showing Book ID 13 deleted from SQLite | ✅ **Captured** |

---

All 9 verification screenshots have been captured directly from live testing and linked into [`../README.md`](../README.md).
