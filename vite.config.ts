import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base: ./' ensures assets are linked relatively (e.g., "assets/script.js" instead of "/assets/script.js")
  // This is crucial for hosting on shared servers, FTP subfolders, or standard file systems.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    emptyOutDir: true,
  }
})