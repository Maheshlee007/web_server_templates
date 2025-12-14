import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils":path.resolve(__dirname,"./src/utils"),
      // '@hooks': path.resolve(__dirname, './src/hooks'),
      // '@pages': path.resolve(__dirname, './src/pages'),
      // '@layout': path.resolve(__dirname, './src/layout'),
      // '@services': path.resolve(__dirname, './src/services'),
      // '@store': path.resolve(__dirname, './src/store'),
      // '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production - set to true only for debugging develpmentt
  },
})
