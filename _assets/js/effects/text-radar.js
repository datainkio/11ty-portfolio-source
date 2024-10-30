const TL = gsap.timeline({}); // The timeline we'll return for integration into other sequences
var DUR = .15; // Timeline duration
var STEPS = 30; // Number of steps in the progression
var ALPHA_START = .85; // Opacity of first step
var ALPHA_END = .25; // Opacity of last step
var Log;
var source; // The element supplying the text value
var text; // The text value to repeat
var amount = 600; // Use settings() to tweak until you find the ideal
var base = -601;

/**
 * Manipulate the display of an element's textContent by duplicating and positioning the duplicates
 * at progressively father distances and with progressively less opacity.
 * 
 * @param {string} id - The id for the element containing the text we want to mess with
 * @returns {GSAP timeline} - A timeline containing animations for each instance of the copied text
 */
export function TextRadar(params) {
    settings();
    Log = params.debug;
    Log("TextRadar is here");
    DUR = params.duration; // .15; // Timeline duration
    STEPS = params.steps; // Number of steps in the progression
    ALPHA_START = params.alpha_start; // Opacity of first step
    ALPHA_END = params.alpha_end; // Opacity of last step
    amount = params.amount;
    base = params.base;
    populate(params.id);
    return TL;
};

function populate(id) {
    Log("populate");
    source = document.getElementById(id);
    source.classList.add("text-radar");
    text = source.textContent;
    // source.textContent = '';
    // Create the duplicates
    for (let i = 0; i <= STEPS; i++) {
        // Create the span to hold this instance of the original text
        const dupe = document.createElement("span");
        // Give it a unique ID
        dupe.id = id + "_" + i;
        // Give it the text
        dupe.textContent = text;
        // Add to the source container
        source.appendChild(dupe);
        dupe.style.zIndex = i;
        if (i == STEPS - 1) {
            // This dupe provides the outline for the text
            dupe.classList.add("stroked");
        } else if (i < STEPS) {
            // These dupes get animated etc...
            dupe.classList.add("text-radar-dupe");
            dupe.style.opacity = 1 - i/STEPS * .75;
        }      
    }
    updateView();
}

function updateView() {
    // Define how the duplicates will get distributed on the page
    let pos = gsap.utils.distribute({
        base: base,
        amount: amount,
        ease: "power2.out",
        from: "end"
    }); 
    let alpha = gsap.utils.distribute({
        base: ALPHA_END,
        amount: ALPHA_START,
        ease: "expoScale",
        from: "end"
    });
    // Animate duplicates 
    TL.add(
        gsap.to(".text-radar-dupe", {
        duration: DUR,
        y: pos,
        opacity: alpha,
        ease: "power1.out",
        stagger: .1
    }));
    TL.add(
        gsap.to(".text-radar-dupe", {
        duration: DUR * .5,
        opacity: .25,
        ease: "power1.inOut",
        stagger: .1,
    }), "-=5%");

}

function settings() {
    
    // Create the container
    const container = document.createElement("div");
    container.classList.add("absolute", "top-0", "right-0", "w-80", "z-50", "flex");
    
    // Create the range slider
    const control = document.createElement('input');
    control.type = "range";
    control.min = 0;
    control.max = 1000;
    control.value = amount;
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
      amount = event.target.value;
      base = 0 - amount - 1;
      updateView();
    });


};