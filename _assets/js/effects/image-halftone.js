import { trace } from '/assets/js/utils/trace.js';
const CANVAS = document.createElement("canvas");
const CTX = CANVAS.getContext('2d');
const TL = gsap.timeline();
var DEBUG = true;
var DOTSIZE = 10;
var GRIDSIZE = 10;
var COLOR = false;
var IMAGE = new Image();
var PIXELS;
var DOTS = [];

const HalftoneParams = {
    container: "avatar",
    dotsize: 10,
    color: true,
    debug: true
};
const HT = Halftone(HalftoneParams);


// Receive a raster image from a picture element and render it as a halftone
export function Halftone({container = "", dotsize = 10, color = false, debug = false}) {
    log("initializing");
    try {
        DEBUG = debug;

        // Get the picture element containing the image
        var pe = document.getElementById(container).querySelector("picture");
        DOTSIZE = dotsize;
        COLOR = color;

        if (DEBUG) {
            // settings({value: DOTSIZE, min: 1, max: 50});
        }

        // Get the image from the picture element
        IMAGE = pe.querySelector("img");
        // When we have the image data...
        IMAGE.onload = function() {
            CANVAS.className = pe.className;
            CANVAS.width = IMAGE.width;
            CANVAS.height = IMAGE.height;
            CTX.drawImage(IMAGE, 0, 0, CANVAS.width, CANVAS.height);
            PIXELS = CTX.getImageData(0,0,IMAGE.width,IMAGE.height).data;
            applyHalftoneEffect();
            // updateView();
            pe.replaceWith(CANVAS);
        };
        if (IMAGE.complete) {
            log("image.complete");
            IMAGE.onload();
        };
        log("initialized");
    } catch(e) {
        log("initializion failed");
        log(e);
    }
    return TL;
};

function log(obj) {
    if (DEBUG) {
        trace("Halftone: " + obj);
    }
}

function updateView() {
    log("updateView");
    CTX.clearRect(0,0,CANVAS.width, CANVAS.height);
    DOTS.forEach(dot => {
        CTX.beginPath();
        CTX.arc(x + GRIDSIZE / 2, y + GRIDSIZE / 2, radius, 0, Math.PI * 2);
        CTX.fillStyle = dot.color;
        CTX.fill();
    })
};

// Function to apply the halftone effect
function applyHalftoneEffect() {
    log("applyHalftoneEffect");
    // Clear the canvas for halftone drawing
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    // Set canvas dimensions based on the image
    CANVAS.width = IMAGE.width;
    CANVAS.height = IMAGE.height;

    // Draw the image to the canvas
    CTX.drawImage(IMAGE, 0, 0, IMAGE.width, IMAGE.height);

    // Get the image data
    // const imageData = CTX.getImageData(0, 0, IMAGE.width, IMAGE.height);
    // log(IMAGE_DATA);
    // const pixels = IMAGE_DATA;



    // Loop through the image in a grid defined by the dotSize
    for (let y = 0; y < IMAGE.height; y += GRIDSIZE) {
        for (let x = 0; x < IMAGE.width; x += GRIDSIZE) {

            // Calculate the block color profile
            let totalBrightness = 0;
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;

            // Loop through the pixels in the block
            for (let dy = 0; dy < GRIDSIZE; dy++) {
                for (let dx = 0; dx < GRIDSIZE; dx++) {
                    const pixelX = x + dx;
                    const pixelY = y + dy;

                    if (pixelX < IMAGE.width && pixelY < IMAGE.height) {
                        const index = (pixelY * IMAGE.width + pixelX) * 4;
                        const r = PIXELS[index];
                        const g = PIXELS[index + 1];
                        const b = PIXELS[index + 2];

                        // Calculate the color values
                        totalR += r;
                        totalG += g;
                        totalB += b;

                        // Calculate the grayscale value
                        totalBrightness += (r + g + b) / 3;

                        count++;
                    }
                }
            }

            // Average color values
            const avgR = totalR / count;
            const avgG = totalG / count;
            const avgB = totalB / count;
            const avgBrightness = totalBrightness / count;

            // Calculate the radius of the dot (inversely proportional to brightness)
            const radius = ((255 - avgBrightness) / 255) * (DOTSIZE / 2);

            DOTS.push({
                x: x + GRIDSIZE / 2,
                y: y + GRIDSIZE / 2,
                radius: radius,
                color: `rgb(${avgR}, ${avgG}, ${avgB})` 
            });
        } // end loop through image grid columns
    } // end loop through image grid rows
    log(DOTS.length);
    DOTS.forEach(dot => {
        TL.from(dot, {
            radius: 0,
            // duration: 1,
            // ease: "elastic.out(1, .5)",
            onUpdate: updateView
        })
    })
};

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