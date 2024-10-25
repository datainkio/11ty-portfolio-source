import { trace } from '/assets/js/utils/trace.js';
const CANVAS = document.createElement("canvas");
const CTX = CANVAS.getContext('2d', {"willReadFrequently": true});
var IMAGE = new Image();
var IMAGE_DATA;
var DOTS = [];
var DEBUG = true;
var DOTSIZE = 5;
var GRIDSIZE = 5;
var COLOR = false;

// const HT = Halftone(HalftoneParams);
    window.onload = function() {
        Halftone({
            container: "avatar",
            dotSize: 12,
            gridSize: 10,
            color: true,
            debug: true
        });
        settings(50, 0, 100);
    }


// Receive a raster image from a picture element and render it as a halftone
export function Halftone({container = "", dotSize = 10, gridSize = 10 , color = false, debug = false}) {
    log("initializing");
    gsap.registerPlugin(CustomEase, CustomWiggle);
    try {
        DEBUG = debug;
        DOTSIZE = dotSize;
        GRIDSIZE = gridSize;
        COLOR = color;

        // Get the picture element containing the image
        var pe = document.getElementById(container).querySelector("picture");
        IMAGE = pe.querySelector("img");
        IMAGE.onload = function() {
            initCanvas(pe);
            applyHalftoneEffect(dotSize,gridSize);
            initAnimation();
        };
        if (IMAGE.complete) {
            IMAGE.onload();
        };
        log("initialized");
    } catch(e) {
        log("initializion failed");
        log(e);
    }
    // return TL;
};
function initCanvas(pe){
    log("initCanvas");
    pe.replaceWith(CANVAS);
    // CANVAS.className = pe.className;
    CANVAS.width = IMAGE.width;
    CANVAS.height = IMAGE.height;
    CTX.drawImage(IMAGE, 0, 0, IMAGE.width, IMAGE.height);
    IMAGE_DATA = CTX.getImageData(0,0,IMAGE.width,IMAGE.height);
}

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

// Function to apply the halftone effect
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
    log(DOTS.length + " dots");
    log(rows *  cols + " blocks");
    log([rows, cols] + " rows,cols");
    log([Math.floor(IMAGE.width / DOTSIZE), Math.floor(IMAGE.height / DOTSIZE)] + " floor");
    log([Math.ceil(IMAGE.width / DOTSIZE), Math.ceil(IMAGE.height / DOTSIZE)] + " ceiling");
    updateView();
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
    TL.from(DOTS, scatter());
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

function edges() {
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

function onStart() {
    log("onStart");
}

function onUpdate() {
    // log("onUpdate");
    updateView();
}

function onComplete() {
    log("onComplete");
}

// Controls to adjust settings at runtime
function settings({value = 50, min = 0, max = 100}) {
    if (DEBUG) {
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
    }
};

function log(obj) {
    if (DEBUG) {
        trace("Halftone: " + obj);
    }
}