const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      colors: {
        blue: colors.blue,
        gray: colors.gray,
        green: colors.green,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};