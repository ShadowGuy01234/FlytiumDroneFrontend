import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build optimization for SEO and performance
  build: {
    // Enable minification
    minify: "esbuild",

    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion", "@mui/material"],
        },
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Source maps for debugging (disable in production)
    sourcemap: false,
  },

  // Server configuration
  server: {
    port: 5173,
  },
});
