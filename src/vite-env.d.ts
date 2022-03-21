/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ENV_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}