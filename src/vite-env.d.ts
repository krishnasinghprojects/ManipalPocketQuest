/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_NEWS_API_KEY: string
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_PERPLEXITY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    google: any;
  }
}

export {};
