require("dotenv").config();

// const postcss = require("postcss");
// const tailwindcss = require("tailwindcss");
// const autoprefixer = require("autoprefixer");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "_assets/styles/base.css": "styles.css",
    "_assets/": "assets/",
    "site.webmanifest": "site.webmanifest",
    ".nojekyll": ".nojekyll",
  });

  const md = require("markdown-it")({
    html: false,
    breaks: true,
    linkify: true,
    typographer: true,
  });

  eleventyConfig.addNunjucksFilter("markdownify", (markdownString) =>
    md.render(markdownString)
  );

  // PLUGINS
  require("./_config/plugins/")(eleventyConfig);
  // FILTERS
  require("./_config/filters/")(eleventyConfig);
  // SHORTCODES
  require("./_config/shortcodes/")(eleventyConfig);

  // STYLES (for the design guide)
  eleventyConfig.addGlobalData('styles', require('./tailwind.config.js').theme.extend);

  return {
    dir: {
      // Let's move the location of the output folder someplace that will make it easier
      // to manage deployment
      output: "../dist",
      // Rename _includes folder to something a bit more appropriate
      includes: "_views",
      // This just makes MD files a little easier to manage, plus it fits
      // better with the atomic approach.
      layouts: "_views/templates",
    },
    // Handy for deploying on GitHub pages without modifing config
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
