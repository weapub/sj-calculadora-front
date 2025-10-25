import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: { 'process.env': {} },
  server: { port: 5173 },
})
