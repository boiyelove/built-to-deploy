declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    plausible: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

const config = {
  ga: import.meta.env.VITE_GA_ID,
  plausible: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
  cloudflare: import.meta.env.VITE_CF_BEACON_TOKEN,
};

export const initAnalytics = () => {
  if (config.ga) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) { window.dataLayer.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', config.ga);
  }

  if (config.plausible) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = config.plausible;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  }

  if (config.cloudflare) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.cfBeacon = JSON.stringify({ token: config.cloudflare });
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    document.body.appendChild(script);
  }
};

export const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  if (window.plausible) {
    window.plausible(eventName, { props: properties });
  }
};
