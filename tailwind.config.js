const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
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