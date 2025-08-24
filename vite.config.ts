import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'client',                       // app lives here
  plugins: [react()],
  base: '/',                            // correct asset paths for custom domain / Vercel
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),   // <-- alias fix
    },
  },
  build: {
    outDir: 'client/dist',
    emptyOutDir: true,
  },
})
