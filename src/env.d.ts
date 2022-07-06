/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_ACCESS_TOKEN: string
  readonly VITE_API_URI: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
