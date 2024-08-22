import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";
 
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Digital Delight',
        short_name: 'Digital Delight',
        theme_color: '#030712',
        start_url: '/',
        display: 'standalone',
        background_color: '#030712', 
        icons: [
          {
            src: '/Coding.png',
            sizes: '512x512',
            type: 'image/png',
          },
          // Include other sizes as needed
        ],
      },
    }
    )
    ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})