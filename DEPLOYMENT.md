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

## Project Files
- wrangler.toml: Cloudflare Pages configuration
- package.json: Contains deploy script
- index.html: Main HTML file
- style.css: Stylesheet
