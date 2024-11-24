// import { trace } from '/assets/js/utils/trace.js';


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
export default class Halftone{
    constructor(pe, settings) {
        gsap.registerPlugin(CustomEase, CustomWiggle);
        this._canvas = document.createElement("canvas");
        this._ctx = this._canvas.getContext('2d', {"willReadFrequently": true});
        
        this._image_data;
        this._dots = [];
        this._dotSize = settings.dotSize;
        this._gridSize = settings.gridSize;
        this._color = settings.color;



        this._tl = gsap.timeline({
            // repeat: -1, 
            // repeatDelay: 5,
            onStart: this.onStart,
            onUpdate: this.updateView,
            onUpdateParams: [this],
            onComplete: this.onComplete
        });
        
        this._pe = pe;
        this._image = pe.querySelector("img");
        this._image.onload = () => {
            this.initCanvas(); // Initialize the canvas element
            this.applyHalftoneEffect(); // Transform the image
            this.updateView(this); // Display the transformed image
            this.initAnimation(); // Animate all the things
            this._tl.play();
        };
        if (this._image.complete) {
            this._image.onload();
        }

    }
    /**
     * Get things started by swapping the source picture element with the canvas
     */
    initCanvas(){
        console.log("initCanvas");
        this._pe.replaceWith(this._canvas);
        this.combineClassLists(this._pe, this._image).forEach(className => {
            this._canvas.classList.add(className);
        })
        this._canvas.width = this._image.width;
        this._canvas.height = this._image.height;
        this._ctx.drawImage(this._image, 0, 0, this._image.width, this._image.height);
        this._image_data = this._ctx.getImageData(0,0,this._image.width,this._image.height);
    }

    /**
     * Update the display of the image data by rendering the dots
     */
    updateView(ht) {
        // log("updateView");
        ht.ctx.clearRect(0,0,ht.canvas.width,ht.canvas.height);
        ht.dots.forEach((d, index) => {
            ht.ctx.beginPath();
            ht.ctx.arc(d.x, d.y, d.radius, 0, Math.PI*2);
            ht.ctx.fillStyle = d.color;
            ht._ctx.fill();
        });
    };

    /**
     * Store the halftone data as an array of objects defining the size and color
     * of each "dot."
     * @dotSize - The radius in pixels of the dot at a given location in the grid
     * @gridSize - The density of dots
     */
    applyHalftoneEffect() {
        console.log("applyHalftoneEffect");
        this._canvas.width = this._image.width;
        this._canvas.height = this._image.height;
        const pixels = this._image_data.data;
        this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);

        // Loop through the image in a grid defined by the gridSize
        var rows = 0;
        var cols = 0;
        for (let y = 0; y < this._image.height; y += this._gridSize) {
            rows += 1;
            for (let x = 0; x < this._image.width; x += this._gridSize) {
                cols += 1;
                // Calculate the block's color profile
                let totalBrightness = 0;
                let totalR = 0;
                let totalG = 0;
                let totalB = 0;
                let count = 0;

                // Loop through the pixels in the block
                for (let dy = 0; dy < this._gridSize; dy++) {
                    for (let dx = 0; dx < this._gridSize; dx++) {
                        const pixelX = x + dx;
                        const pixelY = y + dy;

                        if (pixelX < this._image.width && pixelY < this._image.height) {
                            const index = (pixelY * this._image.width + pixelX) * 4;
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
                const radius = ((255 - avgBrightness) / 255) * (this._dotSize * .75);

                // Draw the halftone dot with the average color
                // CTX.beginPath();
                // CTX.arc(x + gridSize / 2, y + gridSize / 2, radius, 0, Math.PI * 2);
                // CTX.fillStyle = `rgb(${avgR}, ${avgG}, ${avgB})`;
                // CTX.fill();

                this._dots.push({
                    x: x + this._gridSize / 2,
                    y: y + this._gridSize / 2,
                    radius: radius,
                    color: `rgb(${avgR}, ${avgG}, ${avgB})` 
                });

            } // end loop through image grid columns
        } // end loop through image grid rows
    };

    initAnimation() {
        console.log("initAnimation");
        var grid = [Math.floor(this._image.width / this._dotSize), Math.floor(this._image.height / this._dotSize)];
        // log(grid);
        this._tl.from(this._dots, this.edges());
    };

    scatter() {
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

    focus() {
        return {
            duration: 2,
            gridSize: 1,
        }
    }

    edges() {
        return {
            duration: 1,
            // yoyo: true,
            // repeat: -1,
            radius: 0,
            stagger: this.distributeByPosition({
                from: "edges"
            })
        }
    }

    onStart() {
        log("onStart");
    }

    onComplete() {
        console.log("ImageHalftone.onComplete");
    }

    /** UTILITIES AND HELPERS */

    combineClassLists(element1, element2) {
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
    distributeByPosition(vars) {
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
    settings({value = 50, min = 0, max = 100}) {
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

    get canvas() {
        return this._canvas;
    }
    get ctx() {
        return this._ctx;
    }
    get image_data() {
        return this._image_data;
    }
    get dots() {
        return this._dots;
    }
    get dotSize() {
        return this._dotSize;
    }
    get gridSize() {
        return this._gridSize;
    }
    get color() {
        return this._color;
    }
    get pe() {
        return this._pe;
    }
    get image() {
        return this._image;
    }

};