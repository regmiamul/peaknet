/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#FFD700', // Adding gold color if you prefer it over yellow
        },
      },
    },
  },
  plugins: [],
}