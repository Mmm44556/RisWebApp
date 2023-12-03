import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/RisWebApp/",
  plugins: [react(), commonjs()],
  resolve: {
    alias: {
      '@style': resolve(__dirname, 'src/assets/scss/style.module.scss'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@authentication': resolve(__dirname, 'src/Authentication'),
      '@context': resolve(__dirname, 'src/context'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@store': resolve(__dirname, 'src/store'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@error': resolve(__dirname, 'src/Errors')

    },

  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: resolve(__dirname, "index.html")
    },
  },
  server: {
    open: true,
    hmr: true,
    host: true
  }
})
