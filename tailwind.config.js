/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        "black-dark": "#111111",
        "blue-fit": "#244575"
      },
      fontFamily: {
        'kodchasan': ['Kodchasan-regular', 'sans-serif'],
        'kodchasan-bold': ['Kodchasan-bold', 'sans-serif'],
        'saira-medium': ['Saira-medium', 'sans-serif'],
        'saira-bold': ['Saira-bold', 'sans-serif']
      },
      backgroundImage: {
        'fundo-suporte': "url('/src/assets/FundoSuporte.png')",
        'fundo-login': "url('/src/assets/FundoLogin.png')",
      },
    },
  },
  plugins: [],
}

