/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMAZON_TAG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
