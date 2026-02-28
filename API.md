# Waitlist API

Internal waitlist API endpoint with Cloudflare D1 database storage.

## Setup

1. Create the D1 database:
```bash
wrangler d1 create built-to-deploy-db
```

2. Update `wrangler.toml` with the database ID from the output

3. Initialize the database schema:
```bash
wrangler d1 execute built-to-deploy-db --file=./schema.sql
```

For local development:
```bash
wrangler d1 execute built-to-deploy-db --local --file=./schema.sql
```

## API Endpoints

### POST /api/waitlist
Add a new email to the waitlist.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "Developer"
}
```

**Response (201):**
```json
{
  "success": true
}
```

**Error Responses:**
- 400: Invalid email format
- 409: Email already registered
- 500: Internal server error

### GET /api/waitlist
Retrieve all waitlist entries (admin use).

**Response (200):**
```json
{
  "data": [
    {
      "email": "user@example.com",
      "name": "John Doe",
      "role": "Developer",
      "created_at": "2026-02-28T16:22:26.417Z"
    }
  ]
}
```

## Database Schema

```sql
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT,
  created_at TEXT NOT NULL
);
```

## Local Development

Run the development server:
```bash
wrangler pages dev . --d1=DB=built-to-deploy-db
```

## Deployment

The API is automatically deployed with Cloudflare Pages. Ensure the D1 database is bound in the Pages project settings.
