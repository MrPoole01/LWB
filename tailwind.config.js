/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Source Sans 3'", 'sans-serif'],
        serif: ["'Merriweather'", 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C650',
          dark: '#C9A22E',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          light: '#D9D9D9',
          dark: '#A6A6A6',
        },
        navy: {
          DEFAULT: '#1A2744',
          light: '#2A3754',
          dark: '#0F1829',
        },
        cream: {
          DEFAULT: '#F5F5F0',
          light: '#FAFAF7',
          dark: '#E8E8E0',
        },
      },
    },
  },
  plugins: [],
};