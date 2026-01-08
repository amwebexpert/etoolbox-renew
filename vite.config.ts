import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: "/etoolbox-renew/",
  plugins: [react(), viteTsconfigPaths()],
  server: {
    proxy: {
      // Proxy WebSocket connections for Poker Planning
      "/ws": {
        target: "wss://ws-poker-planning.onrender.com",
        changeOrigin: true,
        ws: true,
        secure: true,
      },
    },
  },
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    include: ["curlconverter", "web-tree-sitter"],
  },
  resolve: {
    alias: {
      // Node.js polyfills for curlconverter browser compatibility
      path: "path-browserify",
      url: "url",
      stream: "stream-browserify",
      util: "util",
      buffer: "buffer",
      querystring: "querystring-es3",
      string_decoder: "string_decoder",
      // Stub fs module for browser
      fs: path.resolve(__dirname, "src/stubs/fs.ts"),
    },
  },
  define: {
    // Required for some Node.js packages in browser
    "process.env": {},
    global: "globalThis",
  },
});
