/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff5f0',
          100: '#ffe4d9',
          200: '#ffc9b3',
          300: '#ffae8c',
          400: '#ff9366',
          500: '#ff7840',
        },
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        sage: {
          50: '#f0f7f4',
          100: '#d9ede5',
          200: '#b3dbc9',
          300: '#8dc9ad',
          400: '#67b791',
          500: '#41a575',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
