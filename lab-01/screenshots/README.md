# Screenshots Directory - Lab 1

This directory stores verified endpoint screenshots for **Lab 1 – Node.js and Express Server**.

---

## Endpoint Verification Checklist

| Filename | Endpoint | Render Live URL | Expected Output | Status |
| :--- | :--- | :--- | :--- | :---: |
| [`home-endpoint.png`](./home-endpoint.png) | `GET /` | [https://gopi-krishna.onrender.com/](https://gopi-krishna.onrender.com/) | `"Welcome to Lab 1 - Node.js and Express Server!"` (`200 OK`) | ✅ **Captured** |
| [`about-endpoint.png`](./about-endpoint.png) | `GET /about` | [https://gopi-krishna.onrender.com/about](https://gopi-krishna.onrender.com/about) | JSON with student details (`200 OK`) | ✅ **Captured** |
| [`time-endpoint.png`](./time-endpoint.png) | `GET /time` | [https://gopi-krishna.onrender.com/time](https://gopi-krishna.onrender.com/time) | JSON with server timestamps (`200 OK`) | ✅ **Captured** |
| [`unknown-endpoint.png`](./unknown-endpoint.png) | `GET /unknown` | [https://gopi-krishna.onrender.com/unknown](https://gopi-krishna.onrender.com/unknown) | `{"message": "Route not found"}` (`404 Not Found`) | ✅ **Captured** |

---

All verification screenshots have been captured from the browser and integrated with their live Render URLs into [`../README.md`](../README.md).
