# Waitlist API

Internal API endpoint for capturing waitlist signups.

## Endpoint

`POST /api/waitlist`

## Request Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "Founder"
}
```

### Fields

- `email` (required): Valid email address
- `name` (optional): User's name
- `role` (optional): User's role/position

## Response

### Success (201)

```json
{
  "success": true
}
```

### Error (400)

```json
{
  "error": "Valid email required"
}
```

### Error (500)

```json
{
  "error": "Failed to save"
}
```

## Database Schema

The waitlist data is stored in Cloudflare D1 with the following schema:

```sql
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT,
  created_at TEXT NOT NULL
);
```

## Usage Example

```javascript
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
    role: 'Founder'
  })
});

const data = await response.json();
```
