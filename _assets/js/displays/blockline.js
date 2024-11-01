/**
 * Takes a set of blockframes contained in a given SVG and renders them
 * onscreen in multiple variations and positions.
 * 
 * Implement using the CSS class bg-blockline
 */
import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js@3.1.1";
import { random } from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.37";

const SETTINGS = {
    // containerBW: document.getElementById("main-header"),
    containerColor: document.getElementById("main-header"),
    colCount: 12,  // Number of buildings * 2
    rowCount: 10,
    size: 100,
    angle: 12,
    brightness: 0.25,
    opacity: 1,
    types: ["Article","Calendar","Cart","Contact","Landing","Map","Timeline",]
}

// The inline SVG supplying the blockframes copied into the grid
const SRC = document.getElementById("BlockframeLibrary");
SRC.classList.add("hidden"); // hide it by default

// SVGs that will display the two versions of the grid
const COLOR = SVG() // Create the SVG
    .size("100%", "100%")
    .viewbox(`0 0 ${SETTINGS.colCount * SETTINGS.size} ${SETTINGS.rowCount * SETTINGS.size} `);
    // COLOR.svg().setAttribute("id", "svg_color");

    createFilters(COLOR);

const BW = SVG() // Create the SVG
    .size("100%", "100%")
    .viewbox(`0 0 ${SETTINGS.colCount * SETTINGS.size} ${SETTINGS.rowCount * SETTINGS.size} `);
// BW.svg().setAttribute("id", "svg_bw");

export async function build(params) {
    console.log("Initializing BlockframeLibrary \n...checking DOM");
    console.log("...getting colors")
    console.log(params);
    // Get color palettes (i.e. the top palettes from ColourLovers: https://github.com/Experience-Monks/nice-color-palettes/blob/master/README.md)
    SETTINGS.colors = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then((response) => response.json());
    console.log(SETTINGS.colors);
    drawBuildings();
    updateBackground();
    const TL = gsap.timeline({id: params.id });
    return TL;
}

function buildings() {
    var arr = [];
    for (var c = 0; c < SETTINGS.colCount/2; c++) {
      var h = SETTINGS.rowCount; // Math.ceil(random(0, ROWCOUNT - 1));
      arr.push(h);
    }
    return arr;
}

function paint(element, color, opacity) {
    switch (element.nodeName) {
        // Container elements
        case "svg":
        case "g":
        case "defs":
        case "symbol":
        case "use":
        element.childNodes.forEach((child) => {
            paint(child, color, opacity);
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
}

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

  // Calculate the Euclidean distance between two colors
  function colorDistance(color1, color2) {
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);

    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);

    return Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
    );
  }

  // Find the color with the greatest distance
  function findFarthestColor(source, palette) {
    let maxDistance = 0;
    let result = 0;

    for (let i = 0; i < palette.length; i++) {
      const distance = colorDistance(source, palette[i]);
      if (distance > maxDistance) {
        maxDistance = distance;
        result = palette[i];
      }
    }
    return result;
  }

// SVG Filters
function createFilters(e) {
    // Append the filter to the SVG's defs section
    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    e.node.appendChild(defs);
    defs.appendChild(getBrightnessFilter());
}
function getBrightnessFilter() {
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
      feFunc.setAttribute("slope", SETTINGS.brightness);
      feComponentTransfer.appendChild(feFunc);
    });

    // Append feComponentTransfer to filter
    filter.appendChild(feComponentTransfer);
    return filter;
  }

  function paintChrome(chrome, palette) {

    // Set SETTINGS.size and scale
    // chrome.setAttribute("transform", `scale(${scale})`);

    // BACKGROUND
    var background = chrome.querySelector(".background");
    paint(background, palette[0]);

    // TOOLBAR
    var toolbar = chrome.querySelector(".toolbar");
    // background
    var tbg = toolbar.querySelector(".background");
    paint(tbg, findFarthestColor(palette[0], palette));
    tbg.setAttribute("opacity", 0.25);
    tbg.setAttribute("style", "mix-blend-mode: hard-light;");

    // dots
    var dots = toolbar.querySelector(".dots");
    paint(dots, palette[0]);
  }

  function paintCalendar(calendar, palette) {
    var controls = calendar.querySelector(".controls");
    var days = calendar.querySelector(".days");
    var background = calendar.querySelector(".background");
    background.setAttribute("opacity", 0.5);
    paint(controls, palette[0]);
    paint(days, palette[1]);
  }

  function paintCart(cart, palette) {
    var rows = cart.querySelectorAll(".rows");
    paint(rows, findFarthestColor(palette[0], palette), 0.75);
  }

  function paintArticle(article, palette) {
    var text = article.querySelector(".text");
    paint(text, findFarthestColor(palette[0], palette), 1);
    paintImage(
      article.querySelector(".image"),
      palette
    );
    var sidebar = article.querySelector(".sidebar");
    paint(sidebar, findFarthestColor(palette[0], palette), 1);
  }

  function paintLanding(landing, palette) {
    var text = landing.querySelector(".text");
    paint(text, findFarthestColor(palette[0], palette), 1);
    paintImage(
      landing.querySelector(".image"),
      palette
    );
  }

  function paintContact(contact, palette) {
    var background = contact.querySelector(".background");
    var fields = contact.querySelector(".fields");
    var title = contact.querySelector(".title");
    var button = contact.querySelector(".submit");
    paint(background, findFarthestColor(palette[0], palette));
    paint(fields, palette[1], 0.75);
    paint(title, palette[1]);
    paint(button, palette[1]);
  }

  function paintMap(map, palette) {
    var background = map.querySelector(".background");
    var streets = map.querySelector(".streets");
    var pin = map.querySelector(".pin");
    var text = map.querySelector(".text");
    paint(background, palette[0]);
    paint(streets, palette[1]);
    paint(pin, palette[3], 1);
    paint(text, palette[1]);
    streets.setAttribute("opacity", 1);
  }

  function paintTimeline(timeline, palette) {
    var chop = timeline.querySelector(".chop");
    var bullets = timeline.querySelector(".bullets");
    var history = timeline.querySelector(".history");
    chop.setAttribute("opacity", 1);
    chop
      .querySelector(".background")
      .setAttribute("fill", findFarthestColor(palette[1], palette));
    chop
      .querySelector(".star")
    paint(bullets, palette[3], 1);
    paint(history, palette[2], 1);
  }
  //#
  function paintImage(image, palette) {
    var base = findFarthestColor(palette[0], palette);
    var background = image.querySelector(".background"
    );
    paint(background, "#FFFFFF");
    var mountains = image.querySelector(".mountains"
    );
    paint(mountains, base, 0.5);
    var sun = image.querySelector(".sun");
    paint(sun, base, 1);

  }

  async function drawBuildings() {
    console.log("drawBuildings");
    var building_id = 0;
    const b = buildings();
    b.forEach(height => {
      // console.log("draw building " + building_id + " with " + (height + 1) + " stories");
      var building = document.createElementNS("http://www.w3.org/2000/svg", "g");
      building.classList.add("building");
      building.setAttribute(
        "transform",
        `translate(${building_id * SETTINGS.size * 2}, 0)`);

      var building_bw = BW.node.appendChild(building.cloneNode());
      var building_color = COLOR.node.appendChild(building.cloneNode());

      for (var story = 0; story <= height; story++) {
        drawStory([building_bw, building_color], building_id, story, story == height);
      }
      building_id += 1;
      building.remove();
    })
  }

  function drawStory(building, b, s, r) {
    
    // Each story has a neutral and a color version
    var story_bw = document.createElementNS("http://www.w3.org/2000/svg", "g");
    story_bw.classList.add("story");
    story_bw.classList.add("story-" + s);
    var story_color = document.createElementNS("http://www.w3.org/2000/svg", "g");
    story_color.classList.add("story");
    story_color.classList.add("story-" + s);

    building[0].appendChild(story_bw);
    building[1].appendChild(story_color);
  
    // Draw the left and right faces of the story
    var face_left = drawFace(s, 0);
    story_bw.appendChild(face_left[0]);
    story_color.appendChild(face_left[1]);

    var face_right = drawFace(s, 1);
    story_bw.appendChild(face_right[0]);
    story_color.appendChild(face_right[1]);

    face_right[0].setAttribute("opacity", ".5"); // TODO: For some reason applying the brightness filter to the BW causes it to throw up and not display
    face_right[1].setAttribute("filter", "url(#brightness)");

    // Do we need to add a roof?
    if (r) {
      story_bw.appendChild(roof());
      story_color.appendChild(roof(random(SETTINGS.colors)[0]));
    }

    story_bw.setAttribute(
      "transform",
      `translate(${SETTINGS.size/2}, ${(SETTINGS.rowCount - s) * SETTINGS.size})`);
    story_color.setAttribute(
      "transform",
      `translate(${SETTINGS.size / 2}, ${(SETTINGS.rowCount - s) * SETTINGS.size})`);
  }

  /**
   * s: the building story
   * side: 0 = left, 1 = right
   **/
  function drawFace(s, side) {
    const block = SRC.querySelector(".Chrome").cloneNode(true);
    block.classList.remove("Chrome");
    block.classList.add("face");

    // We're only adding it to the stage so that we can get the dimensions. It will be removed later.
    document.getElementById("container").appendChild(block);
    const rect = block.getBoundingClientRect();
    const scaleX = SETTINGS.size / rect.width;
    const scaleY = SETTINGS.size / rect.width;
    const scale = Math.min(scaleX, scaleY) * .95// Uniform scaling
    const skewYangle = side % 2 === 0 ? SETTINGS.angle : SETTINGS.angle * -1;
    const x = ( side === 0 ? 0 : SETTINGS.size );

    block.setAttribute("width", SETTINGS.size);
    block.setAttribute("height", SETTINGS.size);
    block.setAttribute("fill", "#CCC");
    block.setAttribute("stroke", "#000");
    block.setAttribute("opacity", SETTINGS.opacity);
    // block.setAttribute("class", styles);

    // Apply skew transform to the square around its center
    block.setAttribute(
      "transform",
      `translate(${x}, 0) skewY(${skewYangle}) translate(${-SETTINGS.size / 2}, ${-SETTINGS.size / 2
      }) scale(${scale})`
    );

    // Add the blockframe's content
    var type;
    var paintMe;
    switch (random(SETTINGS.types)) {
      case "About":
        type = SRC.querySelector(".About").cloneNode(true);
        // paintMe = paintAbout;
        break;
      case "Calendar":
        type = SRC.querySelector(".Calendar").cloneNode(true);
        paintMe = paintCalendar;
        break;
      case "Article":
        type = SRC.querySelector(".Article").cloneNode(true);
        paintMe = paintArticle;
        break;
      case "Landing":
        type = SRC.querySelector(".Landing").cloneNode(true);
        paintMe = paintLanding;
        break;
      case "Cart":
        type = SRC.querySelector(".Cart").cloneNode(true);
        paintMe = paintCart;
        break;
      case "Contact":
        type = SRC.querySelector(".Contact").cloneNode(true);
        paintMe = paintContact;
        break;
      case "Map":
        type = SRC.querySelector(".Map").cloneNode(true);
        paintMe = paintMap;
        break;
      case "Timeline":
        type = SRC.querySelector(".Timeline").cloneNode(true);
        paintMe = paintTimeline;
        break;
    }
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
      path.style.strokeWidth = 2;
      path.style.opacity = .25;
    })
    var background = stroked.querySelector(".background");
    background.style.opacity = .1;

    // COLOR
    var palette = random(SETTINGS.colors);
    paintChrome(painted, palette);
    paintMe(painted, palette);

    // Return the block's coords so something else can use them (e.g. adding a roof)
    return [stroked, painted];
   
  }

  function roof(color = null) {
    // Create the rectangle (square) element
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        // Desired width of the diamond
    const width = SETTINGS.size * 2 * .95;

    // Convert degrees to radians for JavaScript trigonometric functions
    const radians = SETTINGS.angle * (Math.PI / 180);

    // Calculate the height using the formula h = width * tan(angle)
    const height = width * Math.tan(radians);

    // Calculate the coordinates of the diamond vertices
    const centerX = SETTINGS.size/2 - 2; // Center X position in the SVG canvas
    const centerY = SETTINGS.size/2 * -1 - 12; // Center Y position in the SVG canvas

    const points = [
      [centerX - width / 2, centerY], // Left vertex (24 degrees)
      [centerX, centerY - height / 2], // Top vertex
      [centerX + width / 2, centerY], // Right vertex (24 degrees)
      [centerX, centerY + height / 2] // Bottom vertex
    ];

    // Create the polygon points string
    const pointsString = points.map(point => point.join(',')).join(' ');

    poly.setAttribute('points', pointsString);
    if (color) {
      poly.setAttribute('fill', color);
    }
    poly.classList.add("roof");
    return poly;
  }

  var isInited = false;
  function updateBackground() {
      // Set the two versions of the grid as the background images for their respective containers
    if (SETTINGS.containerBW) {
      SETTINGS.containerBW.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${escape(BW.svg())}")`
      // SETTINGS.containerBW.innerHTML = BW.svg();
    } else if (!isInited) {
      BW.remove();
    };
    if (SETTINGS.containerColor) {
      // SETTINGS.containerColor.style.backgroundImage = `url("data:image/svg+xml;charset=UTF-8,${escape(COLOR.svg())}")`
      // SETTINGS.containerColor.innerHTML = COLOR.svg();
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