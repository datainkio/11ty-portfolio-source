var BUILDER;

export function init(b) {
  BUILDER = b;
}


export async function build() {
    console.log("drawBuildings");
    var building_id = 0;
    const b = buildings();
    b.forEach(height => {
        // console.log("draw building " + building_id + " with " + (height + 1) + " stories");
        var building = document.createElementNS("http://www.w3.org/2000/svg", "g");
        building.classList.add("building");
        building.setAttribute(
        "transform",
        `translate(${building_id * Settings.size * 2}, 0)`);

        var building_bw = BW.node.appendChild(building.cloneNode());
        var building_color = COLOR.node.appendChild(building.cloneNode());

        for (var story = 0; story <= height; story++) {
        drawStory([building_bw, building_color], building_id, story, story == height);
        }
        building_id += 1;
        building.remove();
    })
};

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
        story_color.appendChild(roof(random(Settings.colors)[0]));
    }

    story_bw.setAttribute(
        "transform",
        `translate(${Settings.size/2}, ${(Settings.rowCount - s) * Settings.size})`);
    story_color.setAttribute(
        "transform",
        `translate(${Settings.size / 2}, ${(Settings.rowCount - s) * Settings.size})`);
};

function roof(color = null) {
    // Create the rectangle (square) element
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        // Desired width of the diamond
    const width = Settings.size * 2 * .95;

    // Convert degrees to radians for JavaScript trigonometric functions
    const radians = Settings.angle * (Math.PI / 180);

    // Calculate the height using the formula h = width * tan(angle)
    const height = width * Math.tan(radians);

    // Calculate the coordinates of the diamond vertices
    const centerX = Settings.size/2 - 2; // Center X position in the SVG canvas
    const centerY = Settings.size/2 * -1 - 12; // Center Y position in the SVG canvas

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
    const scaleX = Settings.size / rect.width;
    const scaleY = Settings.size / rect.width;
    const scale = Math.min(scaleX, scaleY) * .95// Uniform scaling
    const skewYangle = side % 2 === 0 ? Settings.angle : Settings.angle * -1;
    const x = ( side === 0 ? 0 : Settings.size );

    block.setAttribute("width", Settings.size);
    block.setAttribute("height", Settings.size);
    block.setAttribute("fill", "#CCC");
    block.setAttribute("stroke", "#000");
    block.setAttribute("opacity", Settings.opacity);
    // block.setAttribute("class", styles);

    // Apply skew transform to the square around its center
    block.setAttribute(
      "transform",
      `translate(${x}, 0) skewY(${skewYangle}) translate(${-Settings.size / 2}, ${-Settings.size / 2
      }) scale(${scale})`
    );

    // Add the blockframe's content
    var type;
    var paintMe;
    switch (random(Settings.types)) {
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
    var palette = random(Settings.colors);
    paintChrome(painted, palette);
    paintMe(painted, palette);

    // Return the block's coords so something else can use them (e.g. adding a roof)
    return [stroked, painted];
   
  } 