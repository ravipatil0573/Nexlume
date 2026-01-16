import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173, // Default Vite port
    strictPort: false, // Allow other ports if 5173 is taken
    allowedHosts: [
      'nexlume-xyxr.onrender.com',
      'localhost',
      '.onrender.com', // Allow all Render.com subdomains
    ],
  },
})
