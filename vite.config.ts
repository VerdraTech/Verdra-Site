import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  define: {
    "process.env": {},
  },
  base: "/Verdra-Site/",
  build: {
    outDir: "build",
  },
});
