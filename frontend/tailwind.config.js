const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      container:{
        center: true,
        padding:{
          DEFAULT: "1rem",
          sm: "3rem",
        },
        screens: {
          '2xl': '1350px',
        },
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

