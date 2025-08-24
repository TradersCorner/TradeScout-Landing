import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'client',                 // index.html lives here
  plugins: [react()],
  base: '/',                      // needed for custom domain
  build: { outDir: 'client/dist', emptyOutDir: true }
});
