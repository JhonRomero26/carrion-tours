/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
}
