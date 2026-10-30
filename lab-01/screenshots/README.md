# Screenshots Directory - Lab 1

This directory stores verification screenshots for **Lab 1 – Node.js and Express Server**.

---

## Required Screenshots Checklist

| Filename | Endpoint Tested | Expected Output | Status |
| :--- | :--- | :--- | :--- |
| `home-endpoint.png` | `GET /` | Text: `"Welcome to Lab 1 - Node.js and Express Server!"` with HTTP `200 OK` | `Pending Capture` |
| `about-endpoint.png` | `GET /about` | JSON with `studentName`, `registrationNumber`, `section` with HTTP `200 OK` | `Captured` |
| `time-endpoint.png` | `GET /time` | JSON containing `currentTime` and `formattedTime` with HTTP `200 OK` | `Captured` |
| `unknown-endpoint.png` | `GET /unknown` | JSON `{"message": "Route not found"}` with HTTP `404 Not Found` | `Captured` |

---

## How to Capture the Remaining Home Endpoint Screenshot (Windows)

1. Open your browser to:
   **`http://localhost:3000/`**
2. It will display:
   `Welcome to Lab 1 - Node.js and Express Server!`
3. Press <kbd>Windows</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> to take the screenshot including the URL bar.
4. Save it as `home-endpoint.png` in this directory.
