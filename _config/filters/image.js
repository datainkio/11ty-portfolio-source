
const { DOMParser } = require("xmldom");
module.exports = function(eleventyConfig) {
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
}