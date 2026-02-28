# Analytics Integration

This project supports three analytics providers:
- **Google Analytics** (GA4)
- **Plausible Analytics** (privacy-friendly)
- **Cloudflare Web Analytics**

## Dashboard Configuration

The dashboard uses environment variables for analytics configuration. Create a `.env` file in the `dashboard/` directory:

```bash
# Google Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Plausible Analytics
VITE_PLAUSIBLE_DOMAIN=yourdomain.com

# Cloudflare Web Analytics
VITE_CF_BEACON_TOKEN=your-token-here
```

You can enable one or multiple providers simultaneously.

## Landing Page Configuration

Edit `index.html` and update the analytics configuration in the `<head>` section:

```javascript
const GA_ID = 'G-XXXXXXXXXX'; // Replace with your GA ID
const PLAUSIBLE_DOMAIN = 'builttodeploy.com'; // Replace with your domain
const CF_BEACON_TOKEN = ''; // Replace with your Cloudflare token
```

## Usage

Analytics are automatically initialized on page load. No additional code is required.

### Custom Event Tracking (Dashboard Only)

```javascript
import { trackEvent } from './utils/analytics';

// Track custom events
trackEvent('button_click', { button_name: 'join_waitlist' });
```

## Privacy

- **Plausible**: No cookies, GDPR compliant by default
- **Cloudflare**: Minimal data collection, no cross-site tracking
- **Google Analytics**: Requires cookie consent in some jurisdictions
