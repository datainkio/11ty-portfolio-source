module.exports = {
  spacing: {
    360: "90rem",
  },
  backgroundSize: {
    'auto': 'auto',
    'cover': 'cover',
    'contain': 'contain',
    '25%': '25%',
    '50%': '50%',
    '75%': '75%',
    '150%': '150%',
    '200%': '200%',
    '300%': '300%',
    '16': '4rem',
  },
  container: {
    // you can configure the container to be centered
    // center: true,
    // or have default horizontal padding
    // padding: "1rem",
    screens: {
      // MOBILE
      // Anything below tablet size does not get a prefix

      // TABLET
      xs: "420px", // portrait
      sm: "640px", // landscape

      // DESKTOP
      md: "768px", // => @media (min-width: 768px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
      xl: "1280px", // => @media (min-width: 1280px) { ... }

      // THE MOOOOOON
      xxl: "1536px", // => @media (min-width: 1536px) { ... }
    },
  },
};
