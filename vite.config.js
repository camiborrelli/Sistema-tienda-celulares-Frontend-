import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Increase Vite's chunk size warning limit to avoid noisy warnings on CI
  // Adjust value (in KB) if you need a different threshold.
  build: {
    chunkSizeWarningLimit: 1000, // 1000 KB
  },
});
