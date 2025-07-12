/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2463',
        accent: '#FFD700',
        secondary: '#E74C3C',
      },
    },
  },

  plugins: [],
}