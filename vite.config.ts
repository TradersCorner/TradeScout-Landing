import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'client',
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),   // <-- required
    },
  },
  build: { outDir: 'client/dist', emptyOutDir: true },
})
