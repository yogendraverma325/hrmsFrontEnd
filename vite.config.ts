import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true
  },
  resolve:{
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [react()],
});
