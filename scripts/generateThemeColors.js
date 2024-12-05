/**
 * Get hex values for colors in the current Tailwind theme and make them available to JS classes at runtime.
 * There are two goals:
 * 1. Work around the TW limitation of only generating styles that exist at build time (i.e. no styles at assigned at runtime).
 * 2. Decouple TW from custom JS for ease of maintenance and future-proofing.
 * Requirement: Maintain consistency with TW palette. 
 */



// scripts/generateThemeColors.js
const fs = require('fs');
const path = require('path');

// Path to your Tailwind config file
const tailwindConfigPath = path.resolve(__dirname, '../tailwind.config.js');
const tailwindConfig = require(tailwindConfigPath);

// Extract extended colors from your Tailwind configuration
const extendedColors = tailwindConfig.theme?.extend?.colors || {};

// If you want to include default Tailwind colors, import them
const defaultTheme = require('tailwindcss/defaultTheme');

// Combine default colors with your extended colors
const themeColors = {
  ...defaultTheme.colors,
  ...extendedColors,
};

// Log the colors for debugging purposes
console.log('Extended Colors:', extendedColors);
// Optionally, log default colors
// console.log('Default Colors:', defaultTheme.colors);
console.log('Combined Theme Colors:', themeColors);

// Check if themeColors is empty or undefined
if (!themeColors || Object.keys(themeColors).length === 0) {
  console.error('Error: No colors found in Tailwind configuration.');
  process.exit(1);
}

// Generate the content for the theme-colors.js module
const content = `export const themeColors = ${JSON.stringify(themeColors, null, 2)};`;

// Write the content to src/theme-colors.js
const outputPath = path.resolve(__dirname, '../_assets/js/utils/tailwind/theme-colors.js');
fs.writeFileSync(outputPath, content);

console.log('Theme colors have been generated at ../_assets/js/utils/tailwind/theme-colors.js');

