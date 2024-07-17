/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
       black:'#202020'
      },
      fontFamily: {
        'kodchasan': ['Kodchasan-regular', 'sans-serif'],
      },
      fontFamily: {
        'kodchasan-bold': ['Kodchasan-bold', 'sans-serif'],
      },
      backgroundImage: {
        'fundo-login': "url('/src/assets/fundo-l.png')",
       
      }
    },
  },
  plugins: [],
}