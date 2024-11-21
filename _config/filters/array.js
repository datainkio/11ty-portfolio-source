module.exports = function(eleventyConfig) {
      /**
   * Return a specific item from a given array
   */
  eleventyConfig.addFilter("find", function(arr, attr, values) {
    var result = [];
    for (var i in values) {
      result.push(arr.find((item) => item[attr] == values[i]));
    }
    return result;
  });

  /**
   * Return a randomly picked item from a given array.
   * Usage: {{ for item in collections.all | randomItem }}
   */
  eleventyConfig.addFilter("randomItem", (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });

  /**
   * Return a subset of array items limited to the passed number.
   * Usage: {{ for item in collections.all | limit(3) }}
   */
  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  /**
   * Return a subset of an array based on some known attribute values,
   * such as given an array of titles.
   */
  eleventyConfig.addFilter("pluck", (arr, values, attr) => {
    if (Array.isArray(values)) {
      return arr.filter((item) => values.includes(item[attr]));
    } else {
      // Check against a single value
      return arr.filter((item) => item[attr] === values);
    }
  });

  /**
   * Given a collection and a limit in addition to the current page.url,
   * returns the requested number of items excluding the current one. This
   * is useful for showing additional posts without the current one being
   * repeated in the list.
   * Usage: {{ for item in collections.all | randomLimit(3, page.url) }}
   * */

  eleventyConfig.addFilter("randomLimit", (arr, limit, currPage) => {
    // Filters out current page
    const pageArr = arr.filter((page) => page.url !== currPage);

    // Randomizes remaining items
    pageArr.sort(() => {
      return 0.5 - Math.random();
    });

    // Returns array items up to limit
    return pageArr.slice(0, limit);
  });

  /**
   * Sort items numerically by casting the string from Airtable to int
   */
  eleventyConfig.addFilter('sortByAttribute', (array, attribute) => {
    return array.slice().sort((a, b) => {
      const valueA = a[attribute] !== undefined ? a[attribute] : 0;
      const valueB = b[attribute] !== undefined ? b[attribute] : 0;
      return valueA - valueB;
    });
  });
}