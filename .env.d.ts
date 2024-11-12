


interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


declare const figma: PluginAPI; 


declare namespace JSX {
  interface IntrinsicElements {
    __html__?: any;
  }
}


type TextNode = any; 
