/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ //obavezno restartovati server kad mjenjam konfiguraciju...
    require('@tailwindcss/line-clamp'),
  ],
}