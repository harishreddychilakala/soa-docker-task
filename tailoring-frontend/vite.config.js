import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tailoringorders': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})
