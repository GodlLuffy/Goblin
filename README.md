# Goblin

Static site for the Goblin project.

## Development

- Install dependencies: `npm install`
- Start dev server: `npm start` (opens http://127.0.0.1:8080/index.html)

## GitHub Pages

This repository is published to GitHub Pages. The site should be available at:

https://GodlLuffy.github.io/Goblin/

If the site doesn't appear immediately, wait a few minutes and refresh the URL.

## Notes

- Live-server is used locally for development and is listed as a dev dependency.
- To change the port or behavior, edit the `start` script in `package.json`.

## Backend (API + Database)

The repository contains a simple Express backend in `Backend/` and a Docker Compose setup for MySQL. To run locally:

1. Install Docker & Docker Compose.
2. From the project root run: `docker-compose up -d --build` to start MySQL and the backend.
3. Verify the backend and DB: `curl http://localhost:3000/db-check` (should return `{ "ok": true }` when DB is ready).

See `Backend/README.md` for more details.

