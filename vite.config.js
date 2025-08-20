import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom plugin to handle client-side routing
const spaFallback = () => {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Skip API routes and static files
        if (req.url.startsWith('/portfolio/') ||
            req.url.startsWith('/auth/') ||
            req.url.startsWith('/user/') ||
            req.url.startsWith('/settings/') ||
            req.url.startsWith('/uploads/') ||
            req.url.includes('.') ||
            req.url.startsWith('/@') ||
            req.url.startsWith('/node_modules')) {
          return next()
        }

        // For all other routes, serve index.html
        req.url = '/'
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), spaFallback()],
    server: {
        proxy: {
            '/portfolio': 'http://localhost:5100',
            '/auth': 'http://localhost:5100',
            '/user': 'http://localhost:5100',
            '/settings': 'http://localhost:5100',
            '/uploads': 'http://localhost:5100'
        }
    }
})