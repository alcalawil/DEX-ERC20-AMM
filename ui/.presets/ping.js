const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('./colors.config');

module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      default: [...defaultTheme.fontFamily.sans],
      display: ['Nunito', ...defaultTheme.fontFamily.sans],
      body: ['Open Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        ...colors,
      },
      backgroundImage: () => ({
        'ping-gradient': "url('/public/bg-light_gradient.png')",
      }),
      boxShadow: {
        card: ' 0px 8px 28px -10px rgba(38, 28, 114, 0.12), 0px 18px 88px -8px rgba(38, 28, 114, 0.1)',
      },
    },
  },
  variants: {
    extend: { border: ['dark'], focus: ['dark'] },
  },
};
