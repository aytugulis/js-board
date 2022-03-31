/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
