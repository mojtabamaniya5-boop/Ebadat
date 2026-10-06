import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'icon.png'],
      strategies: 'generateSW',
      manifest: {
        name: 'همراه معنوی',
        short_name: 'همراه',
        description: 'دستیار رشد معنوی روزانه - عبادت، دعا، قرآن',
        theme_color: '#14B8A6',
        background_color: '#0F172A',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/Ebadat/',
        start_url: '/Ebadat/',
        lang: 'fa',
        dir: 'rtl',
        icons: [
          { src: 'icon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        categories: ['lifestyle', 'education'],
      },
      workbox: {
        mode: 'development',
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        sourcemap: false,
        inlineWorkboxRuntime: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /\.mp3$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-cache',
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  base: '/Ebadat/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
