import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  root: 'client',
  plugins: [react()],
  base: '/',                           // critical for correct asset paths
  build: { outDir: 'client/dist', emptyOutDir: true }
})
