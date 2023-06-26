const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tg-heading': 'Anton, sans-serif',
      },
      colors: {
        'tg-background': '#161819',
        'tg-white': '#fcfbfa',
        'tg-gray': '#323339'
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
