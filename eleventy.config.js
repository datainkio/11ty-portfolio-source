require("dotenv").config();
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { DateTime } = require("luxon");
const { DOMParser } = require("xmldom");

// const postcss = require("postcss");
// const tailwindcss = require("tailwindcss");
// const autoprefixer = require("autoprefixer");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
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

  /**
   * Receive the picture element field from the 11ty image plugin and return the URL for a specific size
   */
  eleventyConfig.addFilter("imgURL", (pe, size = "") => {
    if (pe) {
      var picture = new DOMParser().parseFromString(pe, "text/html");
      var source = picture.getElementsByTagName("source");
      // Assume that only one element is returned,
      // Pull out the URLs for the different versions of the image file, and
      // return the requested size
      var srcset = source[0].attributes[1].nodeValue.split(", "); // note the space following the comma
  
      if (srcset.length == 1) {
        return srcset[0];
      } else {
        switch (size) {
          case "sm":
            return srcset[0].split(" ")[0];
            break;
          case "md":
            return srcset[1].split(" ")[0];
            break;
          case "lg":
          default:
            return srcset[2].split(" ")[0];
        }
      }
    }
  });

  /**
   * Format the date for a post
   */
  eleventyConfig.addFilter("postDate", (dateObj) => {
    let d = new Date(dateObj);
    return DateTime.fromJSDate(d).toLocaleString(DateTime.DATE_MED);
  });

  /**
   * Apply styles to a picture element produced by the 11ty image plugin
   */
  eleventyConfig.addFilter(
    "stylePicture",
    (pe, peStyles, imgStyles, peSpeed, imgSpeed) => {
      /**
       * It's possible to get requests for unpublished images, in which case the
       * template will throw up a little bit. So let's deal with that.
       **/
      if (pe) {
        return stylePE(pe, peStyles, imgStyles, peSpeed, imgSpeed);
      } else {
        return;
      }
    }
  );

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

  /**
   * 
   * @param {*} pe The picture element created by Eleventy's Image plugin
   * @param {*} peStyles CSS for the picture element
   * @param {*} imgStyles CSS for the img element
   * @param {*} peSpeed Parallax speed of the picture element
   * @param {*} imgSpeed Parallax speed of the img element
   * @returns 
   */
  function stylePE(pe, peStyles, imgStyles, peSpeed, imgSpeed) {
    // Style the picture element
    let peData = typeof peSpeed === 'undefined' ? "" : ' data-speed="' + peSpeed + '" ';
    let imgData = typeof imgSpeed === 'undefined' ? "" : ' data-speed="' + imgSpeed + '" ';
    let peClass = typeof peStyles === 'undefined' ? "" : ' class="' + peStyles + '" ';
    let imgClass = typeof imgStyles === 'undefined' ? "" : ' class="' + imgStyles + '" ';

    typeof peSpeed === 'undefined' ? "" : console.log(peSpeed);

    let result = pe.replace("<picture>", '<picture ' + peData + peClass + '>');
    // Style the img element
    return result.replace("<img", '<img' + imgData + imgClass + ' ');
  }

  /**
   * Receive an Airtable record with an image attachment and render it as a figure that displays as a modal on click.
   * Intended for use with the expand filter (above), when images are embedded in body text.
   * Duplicates the code for the image/modal.html template
   * @param {*} image
   * @returns
   */
  function figure(image) {
      // set the size and background
      if ( image ) {

      var style = "p-4";
      // If Invert is undefined, make sure the image is published
      if (image.Invert) {
        style = "p-4 bg-black";
      }
      // apply styles to the picture element supplied by 11ty
      if (image.pictureElement) {
        return `<div class="w-full">
        <button class="picture object-contain" onclick="modal_${
          image.id
        }.showModal()">${image.pictureElement}</button>
        <dialog id="modal_${image.id}" class="modal">
        <figure class="modal-box w-11/12 max-w-none shadow-none" id="${image.id}">
        ${stylePE(image.pictureElement, style, "w-full")}
        <figcaption class="md:col-span-2">${image.Caption}</figcaption>
        </figure>
        <form method="dialog" class="modal-backdrop"><button>close</button></form>
        </dialog>
      </div>`;
      } else {
        return;
      }
    }
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
