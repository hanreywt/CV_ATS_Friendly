import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// COOP/COEP headers are needed so SwiftLaTeX's Web Worker can use
// SharedArrayBuffer for the WASM TeX engine.
const crossOriginIsolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    headers: crossOriginIsolation,
  },
  preview: {
    headers: crossOriginIsolation,
  },
});
