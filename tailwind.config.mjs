/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        neu: {
          brand: '#0047ff',
          dark: '#0f172a',
          light: '#f2f4f7',
          muted: '#475569',
          accent: '#ff5a36',
          interactive: '#d946ef',
          'interactive-cyan': '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
