# Code Standards - Built-to-Deploy

## Tech Stack
- **Root**: Static marketing site (HTML/CSS/JS)
- **Dashboard**: React 19 + Vite + TypeScript
- **Deployment**: Cloudflare Pages + Functions

## File Structure
```
built-to-deploy/
├── index.html              # Static marketing site
├── style.css               # Marketing site styles
├── functions/              # Cloudflare Functions
│   └── api/
├── dashboard/              # React 19 + Vite + TypeScript
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── dist/
├── docs/                   # Documentation
├── wrangler.toml           # Cloudflare config
└── package.json            # Root package.json
```

## Import Patterns
- **Static site**: Standard HTML/CSS/JS imports
- **Dashboard**: ES6 imports with TypeScript
- **Functions**: ES modules for Cloudflare Workers

## Coding Conventions
- **Dashboard**: React 19 + TypeScript only (NO JavaScript, NO Vue)
- **Static site**: Plain HTML/CSS/JS
- **Functions**: TypeScript for Cloudflare Workers
- **Build process**: npm commands run in dashboard/ directory, not root
- **No emojis anywhere in codebase**

## CI/CD
- **Lint + build**: Runs in dashboard/ directory only
- **Deploy**: Cloudflare Pages deployment

## Key Guidelines
- Dashboard code must be TypeScript (.tsx/.ts files only)
- Static marketing site remains plain HTML/CSS/JS
- All npm/build commands execute from dashboard/ subdirectory
- Maintain clear separation between static site and dashboard
- Follow React 19 patterns and best practices
- Use Vite for dashboard build tooling