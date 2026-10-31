# Backend Development Fundamentals – Lab Repository

Welcome to the official coursework repository for **Backend Development Fundamentals**. This repository contains all practical lab assignments, source code, documentation, and deployment guides developed throughout the course.

---

## Live Deployments (Render)

### Lab 1: Node.js & Express Server
- **Base URL (Home):** [https://gopi-krishna.onrender.com/](https://gopi-krishna.onrender.com/)
- **About Route:** [https://gopi-krishna.onrender.com/about](https://gopi-krishna.onrender.com/about)
- **Current Date & Time:** [https://gopi-krishna.onrender.com/time](https://gopi-krishna.onrender.com/time)
- **404 Error Found:** [https://gopi-krishna.onrender.com/unknown](https://gopi-krishna.onrender.com/unknown)

### Lab 2: SQLite Database & CRUD Routes
- **Base URL (Home):** [https://gopi-krishna-lab-02.onrender.com/](https://gopi-krishna-lab-02.onrender.com/)
- **Get All Books:** [https://gopi-krishna-lab-02.onrender.com/books/](https://gopi-krishna-lab-02.onrender.com/books/)
- **Get Single Book (ID 1):** [https://gopi-krishna-lab-02.onrender.com/books/1/](https://gopi-krishna-lab-02.onrender.com/books/1/)
- **404 Error Found:** [https://gopi-krishna-lab-02.onrender.com/books/999/](https://gopi-krishna-lab-02.onrender.com/books/999/)

---

## Student Details

| Attribute | Details |
| :--- | :--- |
| **Student Name** | PONDURI GOPI KRISHNA |
| **Registration Number** | `252U1R1196` |
| **Section** | `CSE-2D` |
| **Repository Name** | `Gopi-Krishna` |
| **Primary Technologies** | Node.js, Express.js & SQLite3 |

---

## Repository Structure

```text
Gopi-Krishna/
│
├── README.md                  # Root course repository documentation & lab index
│
├── lab-01/                    # Lab 1: Node.js and Express Server
│   ├── server.js              # Express.js REST API server with routes and 404 middleware
│   ├── http-server.js         # Plain Node.js HTTP server using core 'http' module
│   ├── package.json           # Dependencies, metadata, and scripts
│   ├── package-lock.json      # Locked dependency tree
│   ├── .gitignore             # Excludes node_modules, .env, and system logs
│   ├── README.md              # Detailed Lab 1 documentation & verification report
│   └── screenshots/           # Verification screenshots directory
│       ├── home-endpoint.png  # Verified GET / screenshot
│       ├── about-endpoint.png # Verified GET /about screenshot
│       ├── time-endpoint.png  # Verified GET /time screenshot
│       ├── unknown-endpoint.png # Verified GET /unknown 404 screenshot
│       └── README.md          # Screenshot capture guide and specifications
│
└── lab-02/                    # Lab 2: SQLite Database and CRUD Routes
    ├── server.js              # Express REST server with full CRUD and SQL injection protection
    ├── package.json           # sqlite, sqlite3, express, nodemon
    ├── package-lock.json      # Locked dependencies
    ├── database.db            # SQLite database file containing 10 seeded book records
    ├── .gitignore             # Excludes node_modules and environment files
    ├── README.md              # Comprehensive Lab 2 documentation & CRUD report
    └── screenshots/           # Verification screenshots directory
        ├── 01-get-all-books.png             # Verified GET /books/ screenshot
        ├── 02-get-one-book.png              # Verified GET /books/1/ screenshot
        ├── 03-post-new-book.png             # Verified POST /books/ screenshot
        ├── 04-put-update-book.png           # Verified PUT /books/:id/ screenshot
        ├── 05-delete-book.png               # Verified DELETE /books/:id/ screenshot
        ├── 06-404-error-response.png        # Verified 404 error screenshot
        ├── 07-sqlite-inserted-records.png   # Verified SQLite CLI INSERT screenshot
        ├── 08-sqlite-updated-records.png    # Verified SQLite CLI UPDATE screenshot
        ├── 09-sqlite-deleted-records.png    # Verified SQLite CLI DELETE screenshot
        └── README.md                        # 9-point screenshot checklist and capture guide
```

---

## Lab Index

| Lab # | Lab Title | Directory | Status | Deployment Link |
| :---: | :--- | :---: | :---: | :--- |
| **01** | [Lab 1 – Node.js and Express Server](./lab-01/README.md) | [`lab-01/`](./lab-01/) | **Completed** | [Live on Render](https://gopi-krishna.onrender.com/) |
| **02** | [Lab 2 – SQLite Database and CRUD Routes](./lab-02/README.md) | [`lab-02/`](./lab-02/) | **Completed** | [Live on Render](https://gopi-krishna-lab-02.onrender.com/) |
| **03** | *Upcoming Lab* | *TBA* | *Pending* | — |

---

## Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/gopikrishna-12/Gopi-Krishna.git
cd Gopi-Krishna
```

### 2. Run Lab 01 (Node.js & Express Basics)
```bash
cd lab-01
npm install
npm start
```

### 3. Run Lab 02 (SQLite & CRUD API)
```bash
cd lab-02
npm install
npm start
```

For detailed instructions, endpoint testing, and deployment steps for each lab, refer to the respective lab directory README.
