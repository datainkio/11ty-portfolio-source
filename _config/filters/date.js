 module.exports = function(eleventyConfig) {
 /**
   * Format the date for a post
   */
  eleventyConfig.addFilter("postDate", (dateObj) => {
    let d = new Date(dateObj);
    return DateTime.fromJSDate(d).toLocaleString(DateTime.DATE_MED);
  });
 }
