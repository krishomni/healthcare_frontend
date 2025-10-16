import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.VITE_BACKEND_API": JSON.stringify(
      process.env.VITE_BACKEND_API || "http://localhost:5000"
    )
  },
  server: {
    port: 5173,
    allowedHosts: true,
    host: true
  }
})
=======
    plugins: [react(), tailwindcss(), ],
    test: {
        environment: 'jsdom',            
        setupFiles: ['./setupTests.js'],  
        globals: true,                   
        css: true,                       
        coverage: {                      
          reporter: ['text', 'html'],
          reportsDirectory: 'coverage',
        },
      },
})
>>>>>>> origin/main
