/**
 * Takes a set of blockframes contained in a given SVG and renders them
 * onscreen in multiple variations and positions.
 * 
 * Implement using the CSS class bg-blockline
 */

// import { random } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.37";
// PALETTES = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then((response) => response.json());
// import * as Settings from "./settings.js";
import * as Builder from "./builder.js";
import * as Painter from "./painter.js";


var SETTINGS, SRC, COLOR, BW, CONTAINER;

/**
 * 
 * @param {*} settings 
 * @returns gsap.timeline instance describing how the blockline presents itself
 */
export async function BlockLine(settings) {

  var main = gsap.timeline({
    id: "blockline",
    onUpdate: updateView,
  }); // the timeline we'll return
  
  try {
    SETTINGS = settings;
    // SETTINGS.palettes = getColors("https://unpkg.com/nice-color-palettes@3.0.0/100.json"); // await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then((response) => response.json());
    SRC = document.getElementById(SETTINGS.id);
    SRC.classList.add("hidden"); // hide it by default
    CONTAINER = document.getElementById(SETTINGS.container);

    // Account for possible user error w/incorrect element id for SETTINGS.container
    if (CONTAINER) {
      CONTAINER.classList.add("bg-blocklines");

      // Populate the view with a collection of SVG nodes arranged in a series of columns representing
      // individual buildings, with each story of a building composed of a pair of left and right 
      // "faces".
      var views = Builder.build({
        src: SRC, 
        cols: SETTINGS.colCount, // the number of buildings x 2
        rows: SETTINGS.rowCount, // the max number of stories/building
        size: SETTINGS.size, // the size (in pixels) of a square blockframe
        angle: SETTINGS.angle, // the angle at which the face of each floor is skewed (for depth)
        types: SETTINGS.types,
        palettes: SETTINGS.palettes}); // the types of blockframes contained in the source SVG for display

        COLOR = views[0]; // the color instance of the blockline
        BW = views[1]; // the black-and-white instance of the blockline
        BW.remove();

        Painter.paint(COLOR);

        // Animate things all pretty-like
        var buildings = COLOR.node.querySelectorAll(".building");
        buildings.forEach(building => {
          var stories = building.querySelectorAll(".story");
          gsap.set(stories, {autoAlpha: 0,});
          main.to(stories, {autoAlpha: 1, onUpdate: updateView, stagger: .05}, "<+=.25" );
        })

        // We have everything we need to either add the blockline as an element or use it to supply
        // the image data for the specified element's background
        // updateView();
 
     } else {
        // Account for an easy error - an invalid element id
        console.log("Blockline could not find an element with the specified id: " + SETTINGS.id);
     }
  } catch (e) {
      console.log("There was a problem instantiating Blockline");
      console.log(e);
  }

  return main;
};

function updateView() {
  // console.log("updateView");
  if (SETTINGS.type == "element") {
    // console.log("...adding to the DOM");
    CONTAINER.innerHTML = COLOR.svg();
  } else {
    // console.log("...adding as background image data");
    CONTAINER.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${escape(COLOR.svg())}")`
  }

};