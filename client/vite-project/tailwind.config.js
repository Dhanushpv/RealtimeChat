/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '11/12': '91.666667%',
        '5/7':'100%',
        '1/3':'72%'
      },
      width : {
        '12/13': '95.666667%',
        '3':'3.5rem'
      }

    },
  },
  plugins: [require('tailwind-scrollbar'),],
}
