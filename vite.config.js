import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
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
          {
            src: 'icon.svg',
            sizes: '192x192 512x512 any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'icon.svg',
            sizes: '192x192 512x512 any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        categories: ['lifestyle', 'education'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
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
