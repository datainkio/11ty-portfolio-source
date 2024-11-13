import * as Article from "./types/article.js";
import * as Calendar from "./types/calendar.js";
import * as Cart from "./types/cart.js";
import * as Chrome from "./types/chrome.js";
import * as Contact from "./types/contact.js";
import * as Image from "./types/image.js";
import * as Landing from "./types/landing.js";
import * as Map from "./types/map.js";
import * as Timeline from "./types/timeline.js";

// const PALETTES = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then((response) => response.json());

export function paintBlockframe(block, src, types) {
    // Add the blockframe's content
    var type;
    var paintMe;
  
    switch (types[Math.floor(Math.random() * types.length)]) {
      case "Calendar":
        type = src.querySelector(".Calendar").cloneNode(true);
        paintMe = Calendar.paint;
        break;
      case "Article":
        type = src.querySelector(".Article").cloneNode(true);
        paintMe = Article.paint;
        break;
      case "Landing":
        type = src.querySelector(".Landing").cloneNode(true);
        paintMe = Landing.paint;
        break;
      case "Cart":
        type = src.querySelector(".Cart").cloneNode(true);
        paintMe = Cart.paint;
        break;
      case "Contact":
        type = src.querySelector(".Contact").cloneNode(true);
        paintMe = Contact.paint;
        break;
      case "Map":
        type = src.querySelector(".Map").cloneNode(true);
        paintMe = Map.paint;
        break;
      case "Timeline":
        type = src.querySelector(".Timeline").cloneNode(true);
        paintMe = Timeline.paint;
        break;
    }

    // Added the selected blockframe on top of the Chrome instance
    block.appendChild(type);

    // Create the two different views of the block
    const stroked = block.cloneNode(true); // BW
    const painted = block.cloneNode(true); // COLOR
    block.remove(); // Garbage collection

    // BLACK AND WHITE
    // BW.node.appendChild(stroked);
    var paths = stroked.querySelectorAll("path");
    paths.forEach(path => {
      path.style.fill = "#FFF";
      path.style.stroke = "#000";
      path.style.strokeWidth = 4;
      path.style.opacity = 1;
    })
    var background = stroked.querySelector(".background");
    background.style.opacity = .5;

    // COLOR
    var palette = types[Math.floor(Math.random() * types.length)];; // TODO: Select from the collection of palettes (currently in blockline)
    Chrome.paint(painted, palette, paintElement);
    paintMe(painted, palette);
    return [stroked, painted];
}

export function paintElement(element, color, opacity) {
    switch (element.nodeName) {
        // Container elements
        case "svg":
        case "g":
        case "defs":
        case "symbol":
        case "use":
        element.childNodes.forEach((child) => {
            paintElement(child, color, opacity);
        });
        break;
        // Basic shapes
        case "rect":
        case "circle":
        case "ellipse":
        case "line":
        case "polyline":
        case "polygon":
        case "path":
        element.setAttribute("fill", color);
        if (opacity) {
            element.setAttribute("opacity", opacity);
        }
        // element.setAttribute('stroke', "#000000");
        break;

        default:
        // DO NOTHING
        // console.log("unknown element: " + element.nodeName);
        break;
    }
};

// PALETTES
function getColors(len) {
    let colorList = [...colors];
    let set = [];
    for (var i = 0; i < len; i++) {
        // Get random index for this array of colors
        let colorIndex = random(0, colorList.length - 1, true);
        // Add the color to the result
        set.push(colorList[colorIndex]);
        // remove that color from the options
        colorList.splice(colorIndex, 1);
    }
    // console.log(set);
    return set;
}

// SVG FILTERS
export function createFilters(svg, brightness) {
    // Append the filter to the SVG's defs section
    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.node.appendChild(defs);
    defs.appendChild(getBrightnessFilter(brightness));
}

function getBrightnessFilter(brightness) {
    // Create a filter element
    const filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", "brightness");

    // Create feComponentTransfer element
    const feComponentTransfer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feComponentTransfer"
    );

    // Create feFuncR, feFuncG, feFuncB elements and set their attributes
    ["R", "G", "B"].forEach((channel) => {
      const feFunc = document.createElementNS(
        "http://www.w3.org/2000/svg",
        `feFunc${channel}`
      );
      feFunc.setAttribute("type", "linear");
      feFunc.setAttribute("slope", brightness);
      feComponentTransfer.appendChild(feFunc);
    });

    // Append feComponentTransfer to filter
    filter.appendChild(feComponentTransfer);
    return filter;
}






