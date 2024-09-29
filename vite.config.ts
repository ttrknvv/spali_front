import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3456',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react(), svgr(), mkcert()],
  resolve: {
    alias: {
      components: '/src/components',
      enums: '/src/enums',
      pages: '/src/pages',
      schemes: '/src/schemes',
      styles: '/src/styles',
      constants: '/src/constants',
      utils: '/src/utils',
      models: '/src/models',
      assets: '/src/assets',
      services: '/src/services',
      http: '/src/http',
      reduxApp: '/src/reduxApp',
      hooks: '/src/hooks',
      routes: '/src/routes',
      contexts: '/src/contexts',
      api: '/src/api',
    },
  },
})
