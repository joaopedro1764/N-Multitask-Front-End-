/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
       black:'#202020',
       'black-dark': "#2D2D2D",
       'gray-dark': "#6A6A6A"
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