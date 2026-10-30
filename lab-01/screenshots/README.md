# Screenshots Directory - Lab 1

This directory stores verification screenshots for **Lab 1 – Node.js and Express Server**.

---

## Required Screenshots Checklist

To verify the endpoints, capture and place the following 4 image files into this directory:

| Filename | Endpoint Tested | Expected Output | Status |
| :--- | :--- | :--- | :--- |
| `home-endpoint.png` | `GET /` | Text: `"Welcome to Lab 1 - Node.js and Express Server!"` with HTTP `200 OK` | `Pending Capture` |
| `about-endpoint.png` | `GET /about` | JSON with `studentName`, `registrationNumber`, `section` with HTTP `200 OK` | `Pending Capture` |
| `time-endpoint.png` | `GET /time` | JSON containing `currentTime` and `formattedTime` with HTTP `200 OK` | `Pending Capture` |
| `unknown-endpoint.png` | `GET /unknown` | JSON `{"message": "Route not found"}` with HTTP `404 Not Found` | `Pending Capture` |

> **Note:** Screenshots should be captured either from a Web Browser, Postman, Thunder Client, or Browser DevTools Network tab.

---

## How to Capture and Save the Screenshots (Windows)

1. **Start the Express Server:**
   ```powershell
   cd "a:\BDS LABS\Gopi-Krishna\lab-01"
   npm start
   ```

2. **Open your Web Browser or API Client:**
   Open Google Chrome, Microsoft Edge, or Postman.

3. **Navigate to each URL:**
   - Home: `http://localhost:3000/`
   - About: `http://localhost:3000/about`
   - Time: `http://localhost:3000/time`
   - Unknown: `http://localhost:3000/unknown` (or any random route)

4. **Take the Screenshot:**
   - Press <kbd>Windows Key</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> to launch Windows Snipping Tool.
   - Select the area showing the browser URL bar and the response output.
   - Click the Snipping Tool notification, then click **Save**.

5. **Save using the exact names listed above:**
   Save them directly in this folder:
   `a:\BDS LABS\Gopi-Krishna\lab-01\screenshots\`
   - `home-endpoint.png`
   - `about-endpoint.png`
   - `time-endpoint.png`
   - `unknown-endpoint.png`

Once saved here, they will automatically display in [../README.md](../README.md).

