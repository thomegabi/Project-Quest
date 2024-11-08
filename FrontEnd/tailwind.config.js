/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jacquard12: ['"Jacquard 12"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        pattern: 'url(/bg.png)',
        inscription: 'url(/Inscriptions.png)',
      }
    },
  },
  plugins: [],
}