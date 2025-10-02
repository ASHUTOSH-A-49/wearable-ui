/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Define environment variables used in your client.ts file
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  // Add any other VITE_ variables your app uses here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
