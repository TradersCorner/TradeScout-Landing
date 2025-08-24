import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'client',                 // <- tell Vite where index.html lives
  plugins: [react()],
  base: '/',                      // root-relative assets for custom domain
  build: {
    outDir: 'client/dist',        // keep build inside client/
    emptyOutDir: true
  }
})

