import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Make environment variables available
    "import.meta.env.VITE_BACKEND_API": JSON.stringify(
      process.env.VITE_BACKEND_API || "http://localhost:5000"
    ),
  },
});
