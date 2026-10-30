# Backend Development Fundamentals – Lab Repository

Welcome to the official coursework repository for **Backend Development Fundamentals**. This repository contains all practical lab assignments, source code, documentation, and deployment guides developed throughout the course.

---

## Live Deployment (Render)

The application is deployed live on Render:

- **Base URL (Home):** [https://gopi-krishna.onrender.com/](https://gopi-krishna.onrender.com/)
- **About Route:** [https://gopi-krishna.onrender.com/about](https://gopi-krishna.onrender.com/about)
- **Current Date & Time:** [https://gopi-krishna.onrender.com/time](https://gopi-krishna.onrender.com/time)
- **404 Error Found:** [https://gopi-krishna.onrender.com/unknown](https://gopi-krishna.onrender.com/unknown)

---

## Student Details

| Attribute | Details |
| :--- | :--- |
| **Student Name** | PONDURI GOPI KRISHNA |
| **Registration Number** | `252U1R1196` |
| **Section** | `CSE-2D` |
| **Repository Name** | `Gopi-Krishna` |
| **Primary Technology** | Node.js & Express.js |

---

## Repository Structure

```text
Gopi-Krishna/
│
├── README.md                  # Root course repository documentation & lab index
│
└── lab-01/                    # Lab 1: Node.js and Express Server
    ├── server.js              # Express.js REST API server with routes and 404 middleware
    ├── http-server.js         # Plain Node.js HTTP server using core 'http' module
    ├── package.json           # Dependencies, metadata, and scripts
    ├── package-lock.json      # Locked dependency tree
    ├── .gitignore             # Excludes node_modules, .env, and system logs
    ├── README.md              # Detailed Lab 1 documentation & verification report
    └── screenshots/           # Verification screenshots directory
        ├── home-endpoint.png  # Verified GET / screenshot
        ├── about-endpoint.png # Verified GET /about screenshot
        ├── time-endpoint.png  # Verified GET /time screenshot
        ├── unknown-endpoint.png # Verified GET /unknown 404 screenshot
        └── README.md          # Screenshot capture guide and specifications
```

---

## Lab Index

| Lab # | Lab Title | Directory | Status | Deployment Link |
| :---: | :--- | :---: | :---: | :--- |
| **01** | [Lab 1 – Node.js and Express Server](./lab-01/README.md) | [`lab-01/`](./lab-01/) | **Completed** | [Live on Render](https://gopi-krishna.onrender.com/) |
| **02** | *Upcoming Lab* | *TBA* | *Pending* | — |
| **03** | *Upcoming Lab* | *TBA* | *Pending* | — |

---

## Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/gopikrishna-12/Gopi-Krishna.git
cd Gopi-Krishna
```

### 2. Run a Specific Lab (e.g., Lab 01)
```bash
cd lab-01
npm install
npm start
```

For detailed instructions, endpoint testing, and deployment steps for each lab, refer to the respective lab directory README.
