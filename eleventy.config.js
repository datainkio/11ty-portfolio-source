require("dotenv").config();
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  const md = require("markdown-it")({
    html: false,
    breaks: true,
    linkify: true,
  });

  eleventyConfig.addNunjucksFilter("markdownify", (markdownString) =>
    md.render(markdownString)
  );

  eleventyConfig.addPassthroughCopy({
    "_assets/styles/base.css": "styles.css",
    ".nojekyll": ".nojekyll",
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("stylePicture", (pe, styles) => {
    return pe.replace("<picture>", '<picture class="' + styles + '">');
  });

  /**
   * Format content from Airtable into proper HTML
   */
  eleventyConfig.addFilter("format", function (str) {
    var formatted = str;
    if (str) {
      formatted = str.split("\n");
      formatted = "<p>" + formatted.join("</p><p>") + "</p>";
    }
    return formatted;
  });

  /**
   * Insert referenced content into text.
   * str: the string containing references to external content; uses format {type, id}
   * ds: the datasource containing the referenced content; yes, this is far from ideal and
   * should probably access the datasource directly but I can't figure out how to do that
   * because promises.
   */
  eleventyConfig.addFilter("expand", function (str, ds) {
    // console.log(str);
    var expanded = str;
    if (str) {
      var results = str.matchAll("{(.*?)}");
      for (result of results) {
        var item = result[1].split(",");
        switch (item[0]) {
          case "image":
            // Let's find ourselves an image...
            var image = ds.find((img) => img["id"] == item[1].trim());
            expanded = expanded.replace("{" + result[1] + "}", figure(image));
            break;
          default:
          // do nothing
        }
      }
    }
    return expanded;
  });

  function figure(image) {
    var result = "";
    result += "<figure id='" + image.id + "'>";
    result += image.pictureElement;
    result += "<figcaption>" + image.Description + "</figcaption>";
    result += "</figure>";
    return result;
  }

  /**
   * Return a specific item from a given array
   */
  eleventyConfig.addFilter("find", function (arr, attr, values) {
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
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  /**
   * Return a subset of an array based on some known attribute values,
   * such as given an array of titles.
   */
  eleventyConfig.addFilter("pluck", function (arr, values, attr) {
    if (Array.isArray(values)) {
      // Check against a value array
      // Assumes this is receiving a collection, hence the `data`
      // If custom array such as from _data, update accordingly
      return arr.filter((item) => values.includes(item.data[attr]));
    } else {
      // Check against a single value
      return arr.filter((item) => item.data[attr] === values);
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
