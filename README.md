# Goblin Stats – Fullstack App

Modern Clash of Clans–themed Goblin stats site with a **Node.js + Express** backend and **MySQL** for storing contact form submissions.

---

## Tech stack

- **Frontend**: HTML, CSS, vanilla JavaScript, ScrollReveal animations  
- **Backend**: Node.js, Express (`Backend/server.js`)  
- **Database**: MySQL (`goblin_db.contacts`)  
- **Local DB tools**: XAMPP / phpMyAdmin (recommended on Windows)

---

## Project structure

- `index.html` – main landing page (Goblin stats, clans, town hall, troops, contact)
- `style.css` – all layout, responsive design, and animations
- `script.js` – navigation, scroll effects, video modal, and API calls
- `Backend/server.js` – Express app (serves frontend + REST API)
- `Backend/db/index.js` – MySQL connection pool
- `Backend/db/init.sql` – schema + seed data for `goblin_db`
- `Backend/.env` – backend configuration (port + DB credentials)

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm**
- **XAMPP** (or any MySQL server) running on Windows

---

## Database setup (MySQL)

1. Start **XAMPP Control Panel** → click **Start** on **MySQL**.
2. Open phpMyAdmin in the browser:
   ```text
   http://localhost/phpmyadmin
   ```
3. In phpMyAdmin, run the SQL from `Backend/db/init.sql` (or paste this):
   ```sql
   CREATE DATABASE IF NOT EXISTS goblin_db;
   USE goblin_db;

   CREATE TABLE IF NOT EXISTS contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255),
     subject VARCHAR(255),
     phone VARCHAR(50),
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

This creates the `goblin_db.contacts` table that stores contact form submissions.

---

## Backend configuration

Create `Backend/.env` (or edit it) with your local MySQL settings:

```env
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=          # leave empty if XAMPP uses no password
MYSQL_DATABASE=goblin_db
```

> If you set a MySQL root password in XAMPP, put it in `MYSQL_PASSWORD`.

---

## Running the app locally

1. **Install backend dependencies**:
   ```bash
   cd Backend
   npm install
   ```

2. **Start MySQL** (XAMPP → MySQL → Start).

3. **Start the backend server**:
   ```bash
   cd Backend
   npm run dev      # uses nodemon
   ```
   You should see:
   ```text
   Backend listening on 3000
   ```

4. **Open the site** in your browser:
   ```text
   http://localhost:3000
   ```

The Express backend serves `index.html`, `style.css`, `script.js`, and all images directly from the project root.

---

## API endpoints

All endpoints are available on `http://localhost:3000`:

- `GET /health` → `{ "status": "ok" }` – basic server health
- `GET /api/health` → `{ "status": "ok" }` – API-style health
- `GET /db-check` → `{ "ok": true }` when MySQL is reachable
- `GET /api/contacts` → list of contact messages from MySQL
- `POST /api/contact` → save a new contact
  - JSON body:
    ```json
    {
      "name": "Your Name",
      "email": "you@example.com",
      "subject": "Subject here",
      "phone": "+91 1234567890",
      "message": "Your message"
    }
    ```

The **contact form** in `index.html` uses `script.js` to POST to `/api/contact` and shows a success / error alert.

---

## Notes

- Stopping MySQL or the Node server will stop the site, but **data remains saved** in the MySQL data directory and is available again when you restart MySQL.
- For production (always‑online) hosting, you can deploy `Backend/server.js` and a MySQL database to a cloud provider (Render, Railway, VPS with Docker, etc.) and point the `.env` variables there.


