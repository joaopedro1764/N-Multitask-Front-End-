/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "black-dark": "#1C1C1C",
      },
      fontFamily: {
        'kodchasan': ['Kodchasan-regular', 'sans-serif'],
      },
      fontFamily: {
        'kodchasan-bold': ['Kodchasan-bold', 'sans-serif'],
      },
      backgroundImage: {
        'fundo-suporte': "url('/src/assets/fundoSuporte.png')",
      }
    },
  },
  plugins: [],
}

