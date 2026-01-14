import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      minify: false,
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Arbab Arshad Portfolio",
        short_name: "ArbabArshad",
        theme_color: "#0A0A0A",
        background_color: "#0A0A0A",
        display: "standalone",
        icons: [{ src: "/logo.svg", sizes: "192x192", type: "image/svg+xml" }],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
