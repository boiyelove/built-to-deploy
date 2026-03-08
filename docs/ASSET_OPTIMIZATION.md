# Asset Optimization

## CSS Optimization

### Minification
- Main CSS file minified using clean-css-cli
- Reduces file size from 15KB to 12KB (20% reduction)
- Build command: `npm run build`

### Critical CSS Inline
- Critical above-the-fold CSS inlined in `<head>`
- Includes: CSS variables, reset, navbar, hero, buttons
- Ensures instant rendering without CSS blocking

### Lazy Loading
- Main stylesheet loaded asynchronously with `preload` + `onload`
- Fallback `<noscript>` tag for non-JS environments
- Pattern: `<link rel="preload" as="style" href="style.min.css" onload="this.onload=null;this.rel='stylesheet'">`

## Font Optimization

### Preconnect
- DNS prefetch for Google Fonts domains
- `<link rel="preconnect" href="https://fonts.googleapis.com">`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`

### Lazy Load Fonts
- Fonts loaded asynchronously to prevent render blocking
- Uses same preload pattern as CSS
- `display=swap` parameter ensures text remains visible during font load

### Font Stack
- Primary: Inter (400, 600, 800 weights)
- Monospace: JetBrains Mono (400, 700 weights)
- System font fallbacks defined in CSS variables

## Performance Metrics

### Before Optimization
- CSS: 15KB unminified
- Fonts: Blocking render
- Critical CSS: None

### After Optimization
- CSS: 12KB minified (20% reduction)
- Fonts: Non-blocking with display=swap
- Critical CSS: ~2KB inline

## Build Process

1. Run `npm run build` to minify CSS
2. Deploy with `npm run deploy` (includes build step)
3. Cloudflare Pages serves with automatic compression (gzip/brotli)

## Future Optimizations

- Image optimization (if images added)
- JavaScript minification (if JS added beyond inline scripts)
- Service worker for offline caching
- HTTP/2 server push for critical assets
