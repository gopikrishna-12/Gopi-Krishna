# Screenshots Directory - Lab 1

This directory stores verified endpoint screenshots for **Lab 1 – Node.js and Express Server**.

---

## Endpoint Verification Checklist

| Filename | Endpoint Tested | Expected Output | Status |
| :--- | :--- | :--- | :---: |
| [`home-endpoint.png`](./home-endpoint.png) | `GET /` | Text: `"Welcome to Lab 1 - Node.js and Express Server!"` (`200 OK`) | ✅ **Captured** |
| [`about-endpoint.png`](./about-endpoint.png) | `GET /about` | JSON containing `studentName`, `registrationNumber`, and `section` (`200 OK`) | ✅ **Captured** |
| [`time-endpoint.png`](./time-endpoint.png) | `GET /time` | JSON containing `currentTime` and `formattedTime` (`200 OK`) | ✅ **Captured** |
| [`unknown-endpoint.png`](./unknown-endpoint.png) | `GET /unknown` | JSON `{"message": "Route not found"}` (`404 Not Found`) | ✅ **Captured** |

---

All verification screenshots have been captured from the browser and integrated into [`../README.md`](../README.md).
