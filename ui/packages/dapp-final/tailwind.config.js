const pingPreset = require('../../.presets/ping');

module.exports = {
  presets: [pingPreset],
  content: ['./index.html', './src/**/*.js'],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
