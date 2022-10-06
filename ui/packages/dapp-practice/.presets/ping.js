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
        'accent-color': colors['settle-primary'][500],
        'accent-color-hover': colors['settle-primary'][700],
      },
      backgroundImage: () => ({
        'ping-gradient': "url('/public/bg-light_gradient.png')",
        'ping-overlay': 'radial-gradient(44.44% 50% at 50% 50%, rgba(8, 2, 54, 0.25) 0%, rgba(8, 2, 54, 0.125) 100%);',
      }),
    },
  },
  variants: {
    extend: { border: ['dark'], focus: ['dark'] },
  },
};
