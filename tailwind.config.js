/** @type {import('tailwindcss').Config} */
const palettes = require("./_config/styles/palettes.js");
const ui = require("./_config/styles/daisyui.js");
const typography = require("./_config/styles/typography.js");
const layout = require("./_config/styles/layout.js");
const animation = require("./_config/styles/animation.js");
module.exports = {
  content: ["./_views/**/*.{html,njk,md,js}", "./src/**/*.svg"],

  theme: {
    extend: {
      backgroundSize: layout.backgroundSize,
      spacing: layout.spacing,
      colors: palettes.bauhaus,
      container: layout.container,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      typography: typography.prose,
      animation: animation.animation,
      keyframes: animation.keyframes,
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: ui,
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
