import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    icon({
      include: {
        tabler: [
          'menu-2',
          'map-pin',
          'calendar',
          'search',
          'map',
          'calendar-plus',
          'chevron-down',
          'x',
        ],
      },
    }),
  ],
})
