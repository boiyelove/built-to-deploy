# Cloudflare Pages Deployment

## Deployment Status
- Project Name: built-to-deploy
- Account: daahrmmieboiye@gmail.com (8300cd8ea9d230a30ea863ffe197ade6)
- Default URL: https://built-to-deploy.pages.dev
- Latest Deployment: https://aa97ee9e.built-to-deploy.pages.dev

## Custom Domain Setup

To add the custom domain `built-to-deploy.damilola.xyz`:

1. Go to the Cloudflare Dashboard: https://dash.cloudflare.com/8300cd8ea9d230a30ea863ffe197ade6/pages/view/built-to-deploy

2. Click on "Custom domains" tab

3. Click "Set up a custom domain"

4. Enter: `built-to-deploy.damilola.xyz`

5. Cloudflare will provide DNS records to add:
   - If damilola.xyz is already on Cloudflare, it will auto-configure
   - If not, you'll need to add a CNAME record pointing to built-to-deploy.pages.dev

## Redeploy Command

To deploy updates:
```bash
npm run deploy
```

## Database Setup

The project uses Cloudflare D1 for waitlist storage.

### Initial Setup

1. Create the D1 database:
```bash
npx wrangler d1 create built-to-deploy-db
```

2. Update `wrangler.toml` with the database ID from the output

3. Initialize the database schema:
```bash
npx wrangler d1 execute built-to-deploy-db --file=./schema.sql
```

### Local Development

For local testing with D1:
```bash
npx wrangler pages dev . --d1=DB=built-to-deploy-db
```

## Project Files
- wrangler.toml: Cloudflare Pages configuration
- package.json: Contains deploy script
- schema.sql: D1 database schema
- functions/api/waitlist.js: Waitlist API endpoint
- index.html: Main HTML file
- style.css: Stylesheet
