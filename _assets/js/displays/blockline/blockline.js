/**
 * Takes a set of blockframes contained in a given SVG and renders them
 * onscreen in multiple variations and positions.
 * 
 * Implement using the CSS class bg-blockline
 */
import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js@3.1.1";
// import { random } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.37";

import * as Settings from "./Settings.js";
import * as Builder from "./builder.js";
import * as Painter from "./painter.js";

// The inline SVG supplying the blockframes copied into the grid
const SRC = document.getElementById("BlockframeLibrary");
SRC.classList.add("hidden"); // hide it by default

// SVGs that will display the two versions of the grid
const COLOR = SVG() // Create the SVG
    .size("100%", "100%")
    .viewbox(`0 0 ${Settings.colCount * Settings.size} ${Settings.rowCount * Settings.size} `);
    // COLOR.svg().setAttribute("id", "svg_color");

    createFilters(COLOR);

const BW = SVG() // Create the SVG
    .size("100%", "100%")
    .viewbox(`0 0 ${Settings.colCount * Settings.size} ${Settings.rowCount * Settings.size} `);
// BW.svg().setAttribute("id", "svg_bw");

export async function build(params) {
    console.log("Initializing BlockframeLibrary \n...checking DOM");
    console.log("...getting colors")
    console.log(params);
    // Get color palettes (i.e. the top palettes from ColourLovers: https://github.com/Experience-Monks/nice-color-palettes/blob/master/README.md)
    Settings.colors = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then((response) => response.json());
    console.log(Settings.colors);
    drawBuildings();
    updateBackground();
    const TL = gsap.timeline({id: params.id });
    return TL;
}

function buildings() {
    var arr = [];
    for (var c = 0; c < Settings.colCount/2; c++) {
      var h = Settings.rowCount; // Math.ceil(random(0, ROWCOUNT - 1));
      arr.push(h);
    }
    return arr;
}




  


  var isInited = false;
  function updateBackground() {
      // Set the two versions of the grid as the background images for their respective containers
    if (Settings.containerBW) {
      Settings.containerBW.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${escape(BW.svg())}")`
      // Settings.containerBW.innerHTML = BW.svg();
    } else if (!isInited) {
      BW.remove();
    };
    if (Settings.containerColor) {
      // Settings.containerColor.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${escape(COLOR.svg())}")`
      // Settings.containerColor.innerHTML = COLOR.svg();
    } else if (!isInited){
      COLOR.remove();
    };

    if (!isInited) {
    // Remove the temporary container
    // document.getElementById("container").remove();
    // document.getElementById("BlockframeLibrary").remove();
    }

    isInited = true;
  }