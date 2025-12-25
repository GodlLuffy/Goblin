# Goblin Backend

Requirements:
- Docker & Docker Compose (to run MySQL locally)
- Node 18+

Local development (with Docker):

1. Start services:

   docker-compose up -d --build

   This starts a MySQL `db` service and builds the backend image (Dockerfile.backend).

2. Check the DB initialization:

   - The `Backend/db/init.sql` script is mounted into the MySQL container and will run automatically on first start.
   - To verify the DB is reachable, run:
     - `curl http://localhost:3000/db-check` should return `{ "ok": true }` when DB is ready.

3. Run the backend locally (without Docker):

   cd Backend
   npm install
   npm start

Endpoints:
- GET /health - simple server health
- GET /db-check - runs `SELECT 1` on the DB and returns `{ok:true}` when DB is reachable
- GET /contacts - list contacts
- POST /contacts - create contact (JSON {name, email?, message})

Notes:
- Default DB credentials are configured in `docker-compose.yml` (user: root, password: password, database: goblin_db).
- If you need a different MySQL version, update `docker-compose.yml` `image` field (e.g., `mysql:8.0` or `mysql:5.7`).
