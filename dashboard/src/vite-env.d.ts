/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
