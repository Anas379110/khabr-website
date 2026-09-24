/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts}'],
  theme: {
    extend: {
      fontFamily: { arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'] },
      colors: {
        // هوية Khabr — رمادي غامق + أحمر تحذيري محدود (UI-UX.md)
        brand: {
          DEFAULT: '#26282B',
          dark: '#161719',
          alert: '#B91C1C',
        },
        neutral: { 50: '#F7F7F7', 900: '#1A1A1A' },
      },
    },
  },
  plugins: [],
};
