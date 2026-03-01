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

## Engineering Standard

All code must be written to the standard of a Principal Software Engineer:
- Optimal algorithmic complexity
- Design for correctness first, then performance
- Write code that is production-ready by default: handle edge cases, validate inputs, fail fast with clear errors
- Prefer explicit over implicit
- Every abstraction must earn its place

## Emoji Policy
- No emojis anywhere in the codebase (code, comments, docs, commits, error messages)

## TypeScript
- All source code must be written in TypeScript (.ts/.tsx)
- Enable strict mode in tsconfig.json - no implicit any, strict null checks
- Define explicit interfaces for all component props, hook parameters, and return types
- Never use `any` - use `unknown` with type guards when the type is truly unknown
- Run `tsc --noEmit` before committing to catch type errors

## Frontend (React)
- Extract reusable components when markup is duplicated across 2+ locations
- Extract custom hooks when stateful logic is shared or when a component exceeds ~150 lines
- Memoize expensive computations with useMemo and callback references with useCallback
- All modals must have: role="dialog", aria-modal, aria-labelledby, focus trap, Escape to close
- All form labels must be associated with inputs via htmlFor/id
- All icon-only buttons must have aria-label
- Use error boundaries to catch rendering crashes

## Mobile Responsiveness (Required)
- All frontend UI must be fully responsive and mobile-first
- Use Tailwind responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch targets must be minimum 44x44px
- Tables must be responsive: use horizontal scroll or card layout on mobile
- Avoid fixed widths - use max-w-* with w-full for flexible layouts

## DRY (Don't Repeat Yourself)
- Extract shared UI patterns into reusable components
- Extract shared logic into custom hooks
- Use a central types file for domain interfaces used across multiple files
- If you copy-paste code, refactor it into a shared abstraction immediately

## Security
- Never hardcode API keys, secrets, or credentials in source code
- Validate and sanitize all external data (API responses, user input) before use
- Use HTTPS for all external API calls
- Avoid dangerouslySetInnerHTML - if unavoidable, sanitize input first

## Testing and Verification
- Never assume an implementation is working - always verify and test
- Run `tsc --noEmit` and `npm run build` before considering a task complete
- Validate that all requirements are met before considering a task complete

## File Organization
- Documentation: All .md files in docs/ subfolder
- Tests: All test files in appropriate tests/ subfolders
- Maintain a clean and organized workspace

## Code Quality
- Write clean, readable code with meaningful variable and function names
- Use proper indentation and formatting
- Add comments only when necessary to explain complex logic

## Modal and Toast Policy
- Never use browser dialogs (window.alert, window.confirm, window.prompt)
- Use toast notification system for success, error, warning, and info messages
- All modals must have: role="dialog", aria-modal, aria-labelledby, focus trap, Escape to close

## Surgical Changes Only
- Never rewrite a file to simplify it unless explicitly instructed
- When adding a feature, insert only the minimum required code
- Preserve all existing markup, styles, and structure outside the target section
