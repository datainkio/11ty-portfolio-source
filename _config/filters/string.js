module.exports = function (eleventyConfig) {
  /**
   * Convert a string to uppercase.
   */
  eleventyConfig.addFilter("uppercase", function (str) {
    return str.toUpperCase();
  });

  /**
   * Truncate a string to a specific length.
   */
  eleventyConfig.addFilter("truncate", function (str, length) {
    return str.length > length ? str.substring(0, length) + "..." : str;
  });
};