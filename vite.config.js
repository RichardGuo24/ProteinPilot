import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Anything starting with /api will be forwarded to your local backend
      '/api': {
        target: 'http://localhost:3000', // or wherever your serverless function runs locally
        changeOrigin: true,
      }
    }
  }
})

