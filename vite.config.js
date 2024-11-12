import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  build: {
    target: 'esnext', // Ensure the output is compatible with modern browsers
    rollupOptions: {
      output: {
        format: 'esm', // Use the ESM format for compatibility with import.meta
      }
    }
  },
  plugins: [preact(), viteSingleFile()],
});
