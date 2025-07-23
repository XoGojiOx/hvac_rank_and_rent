/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        imperial: '#fb3640',
        russian: '#191245',
        white: '#ffffff',
        french: '#c1c8d0',
        cerulean: '#40798c',
        gold: '#be9b0c',
      },
    },
  },
  plugins: [],
} 