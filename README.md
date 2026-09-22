# Product Landing Page

A minimal product landing page with a React (Vite) frontend and Node.js backend.

## Overview

- Purpose: Simple, deployable landing page with an admin panel for orders and users.
- Stack: React (Vite), Node.js (Express), Drizzle ORM

## Key Features

- Responsive hero, features, reviews, and FAQ sections
- Product listing and order submission (frontend ↔ backend)
- Admin dashboard and login
- Basic security: CSRF protection and rate limiting

## Quick Start

Requirements:

- Node.js v16+
- pnpm or npm

Clone and install:

```bash
git clone <repo-url>
cd product-landing-page
cd client
pnpm install
cd ../server
pnpm install
```

Run (development):

Client:
```bash
cd client
pnpm dev
```

Server:
```bash
cd server
pnpm dev
```

## Environment

Create a `.env` with at least:

- `DATABASE_URL` (database connection)
- `PORT` (default 3000)
- `JWT_SECRET` (if used)

## Project Structure (short)

- `client/` — React app (components, pages)
- `server/` — Node app (Controllers, Database, Middlewares)

## Contributing

- Fork → feature branch → PR. Keep commits clear.

## License

See the [LICENSE](./LICENSE) file.

## Contact

Open an issue for questions or help.



