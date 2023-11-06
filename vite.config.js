import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  resolve: {
    alias: {

    },
  },
  build: {

    rollupOptions: {

      input: resolve(__dirname, "public/index.html")

    },

  },

  server: {
    open: true,
    hmr: true,
    proxy: {

    }
  }
})
