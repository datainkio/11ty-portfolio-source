// import { trace } from '/assets/js/utils/trace.js';
const CANVAS = document.createElement("canvas");
const CTX = CANVAS.getContext('2d', {"willReadFrequently": true});
var IMAGE = new Image();
var IMAGE_DATA;
var DOTS = [];
var DOTSIZE = 5;
var GRIDSIZE = 5;
var COLOR = false;


/**
 * Example Implementation
 **/
/**
window.onload = function() {
    Halftone({
        container: "avatar",
        dotSize: 6,
        gridSize: 6,
        color: true
    });
    settings(50, 0, 100);
}
    **/

// Receive a raster image from a picture element and render it as a halftone
export function Halftone({container = "", dotSize = 10, gridSize = 10 , color = false,}) {
    log("initializing");
    gsap.registerPlugin(CustomEase, CustomWiggle);
    try {
        DOTSIZE = dotSize;
        GRIDSIZE = gridSize;
        COLOR = color;

        // Get the picture element containing the image
        var pe = document.getElementById(container).querySelector("picture");
        IMAGE = pe.querySelector("img");
        // When the image finishes loading...
        IMAGE.onload = function() {
            initCanvas(pe); // Initialize the canvas element
            applyHalftoneEffect(DOTSIZE,GRIDSIZE); // Transform the image
            updateView(); // Display the transformed image
            initAnimation(); // Animate all the things
        };
        if (IMAGE.complete) {
            IMAGE.onload();
        };
        log("initialized");
    } catch(e) {
        log("initializion failed");
        log(e);
    }
    return TL;
};

/**
 * Get things started by swapping the source picture element with the canvas
 */
function initCanvas(pe){
    log("initCanvas");
    pe.replaceWith(CANVAS);
    combineClassLists(pe, IMAGE).forEach(className => {
        CANVAS.classList.add(className);
    })
    CANVAS.width = IMAGE.width;
    CANVAS.height = IMAGE.height;
    CTX.drawImage(IMAGE, 0, 0, IMAGE.width, IMAGE.height);
    IMAGE_DATA = CTX.getImageData(0,0,IMAGE.width,IMAGE.height);
}

/**
 * Update the display of the image data by rendering the dots
 */
function updateView() {
    // log("updateView");
    CTX.clearRect(0,0,CANVAS.width,CANVAS.height);
    DOTS.forEach((d, index) => {
        CTX.beginPath();
        CTX.arc(d.x, d.y, d.radius, 0, Math.PI*2);
        CTX.fillStyle = d.color;
        CTX.fill();
    });
};

/**
 * Store the halftone data as an array of objects defining the size and color
 * of each "dot."
 * @dotSize - The radius in pixels of the dot at a given location in the grid
 * @gridSize - The density of dots
 */
function applyHalftoneEffect(dotSize,gridSize) {
    log("applyHalftoneEffect");
    CANVAS.width = IMAGE.width;
    CANVAS.height = IMAGE.height;
    const pixels = IMAGE_DATA.data;
    CTX.clearRect(0,0,CANVAS.width,CANVAS.height);

    // Loop through the image in a grid defined by the gridSize
    var rows = 0;
    var cols = 0;
    for (let y = 0; y < IMAGE.height; y += gridSize) {
        rows += 1;
        for (let x = 0; x < IMAGE.width; x += gridSize) {
            cols += 1;
            // Calculate the block's color profile
            let totalBrightness = 0;
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;

            // Loop through the pixels in the block
            for (let dy = 0; dy < gridSize; dy++) {
                for (let dx = 0; dx < gridSize; dx++) {
                    const pixelX = x + dx;
                    const pixelY = y + dy;

                    if (pixelX < IMAGE.width && pixelY < IMAGE.height) {
                        const index = (pixelY * IMAGE.width + pixelX) * 4;
                        const r = pixels[index];
                        const g = pixels[index + 1];
                        const b = pixels[index + 2];

                        // Sum the color values
                        totalR += r;
                        totalG += g;
                        totalB += b;

                        // Calculate the grayscale value for brightness
                        const brightness = (r + g + b) / 3;
                        totalBrightness += brightness;
                        count++;
                    }
                }
            }

            // Average the color and brightness of the block
            const avgR = totalR / count;
            const avgG = totalG / count;
            const avgB = totalB / count;
            const avgBrightness = totalBrightness / count;

            // Calculate the radius of the dot (inversely proportional to brightness)
            const radius = ((255 - avgBrightness) / 255) * (dotSize * .75);

            // Draw the halftone dot with the average color
            // CTX.beginPath();
            // CTX.arc(x + gridSize / 2, y + gridSize / 2, radius, 0, Math.PI * 2);
            // CTX.fillStyle = `rgb(${avgR}, ${avgG}, ${avgB})`;
            // CTX.fill();

            DOTS.push({
                x: x + gridSize / 2,
                y: y + gridSize / 2,
                radius: radius,
                color: `rgb(${avgR}, ${avgG}, ${avgB})` 
            });

        } // end loop through image grid columns
    } // end loop through image grid rows
};

const TL = gsap.timeline({
    // repeat: -1, 
    // repeatDelay: 5,
    onStart: onStart,
    onUpdate: onUpdate,
    onComplete: onComplete
});
function initAnimation() {
    log("initAnimation");
    var grid = [Math.floor(IMAGE.width / DOTSIZE), Math.floor(IMAGE.height / DOTSIZE)];
    // log(grid);
    TL.from(DOTS, edges());
};

function scatter() {
    return {
        duration: 2,
        // yoyo: true,
        // repeat: -1,
        radius: "*=" + .25,
        physics2D: {
            velocity: "random(200, 650)",
            angle: "random(250, 290)",
            gravity: 500
        },
    }
}

function focus() {
    return {
        duration: 2,
        gridSize: 1,
    }
}

function edges() {
    return {
        duration: 1,
        // yoyo: true,
        // repeat: -1,
        radius: 0,
        stagger: distributeByPosition({
            from: "edges"
        })
    }
}

function onStart() {
    log("onStart");
}

function onUpdate() {
    // log("onUpdate");
    updateView();
}

function onComplete() {
    console.log("ImageHalftone.onComplete");
}

/** UTILITIES AND HELPERS */

function combineClassLists(element1, element2) {
    // Combine and deduplicate classes from both elements
    const combinedClasses = [...new Set([...element1.classList, ...element2.classList])];
    return combinedClasses;
}


/*
pass in an object with any of the following optional properties (just like the stagger special object):
{
  amount: amount (in seconds) that should be distributed
  from: "center" | "end" | "edges" | start" | index value (integer)
  ease: any ease, like "power1"
  axis: "x" | "y" (or omit, and it'll be based on both the x and y positions)
}
*/
function distributeByPosition(vars) {
	var ease = vars.ease && gsap.parseEase(vars.ease),
		from = vars.from || 0,
		base = vars.base || 0,
		axis = vars.axis,
		ratio = {center: 0.5, end: 1, edges:0.5}[from] || 0,
		distances;
	return function(i, target, a) {
		var l = a.length,
			originX, originY, x, y, d, j, minX, maxX, minY, maxY, positions;
		if (!distances) {
			distances = [];
			minX = minY = Infinity;
			maxX = maxY = -minX;
			positions = [];
			for (j = 0; j < l; j++) {
				var dot = a[j]; //.getBoundingClientRect();
				d = dot.radius;
                x = dot.x; // (d.left + d.right) / 2; //based on the center of each element
				y = dot.y; // (d.top + d.bottom) / 2;
				if (x < minX) {
					minX = x;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (y > maxY) {
					maxY = y;
				}
				positions[j] = {x:x, y:y};
			}
			originX = isNaN(from) ? minX + (maxX - minX) * ratio : positions[from].x || 0;
			originY = isNaN(from) ? minY + (maxY - minY) * ratio : positions[from].y || 0;
			maxX = 0;
			minX = Infinity;
			for (j = 0; j < l; j++) {
				x = positions[j].x - originX;
				y = originY - positions[j].y;
				distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs((axis === "y") ? y : x);
				if (d > maxX) {
					maxX = d;
				}
				if (d < minX) {
					minX = d;
				}
			}
			distances.max = maxX - minX;
			distances.min = minX;
			distances.v = l = (vars.amount || (vars.each * l) || 0) * (from === "edges" ? -1 : 1);
			distances.b = (l < 0) ? base - l : base;
		}
		l = (distances[i] - distances.min) / distances.max;
		return distances.b + (ease ? ease(l) : l) * distances.v;
	};
}

//END FUNCTION
//this just helps avoid the pixel-snapping that some browsers do.
// gsap.set("#grid div i", {rotation:0.5, force3D:true}); 

// Controls to adjust settings at runtime
function settings({value = 50, min = 0, max = 100}) {
    // Create the container
    const container = document.createElement("div");
    container.classList.add("absolute", "top-0", "right-0", "w-80", "z-50", "flex");
    
    // Create the dot size slider
    const control = document.createElement('input');
    control.type = "range";
    control.min = min;
    control.max = max;
    control.value = value;
    control.classList.add("range", "range-primary");

    // Create the value display
    const display = document.createElement("span");
    display.classList.add("basis-1/6");
    display.textContent = control.value;

    container.appendChild(display);
    container.appendChild(control);
    document.body.appendChild(container);

    // Update the view when the range changes
    control.addEventListener('input', (event) => {
        display.textContent = event.target.value;
        DOTSIZE = parseInt(event.target.value, 10);
        updateView();
    });
};