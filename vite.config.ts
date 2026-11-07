import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
    // Spring API integration point for local development; no API is required yet.
    proxy: { "/api": { target: "http://127.0.0.1:8080", changeOrigin: true } },
  },
  build: { outDir: "dist" },
});
