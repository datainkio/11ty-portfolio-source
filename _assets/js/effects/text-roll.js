var SOURCE;
var SPLIT;
var DELAY = 2;
var DUR = .5;
var STAGGER = .1;
var TIMING = "-=75%";
var EASE = "power1.inOut";
var Y_DELTA = 225;
var ROTATION = 12;
// const CONTROL = document.createElement('input');

export function TextRoll(container, params) {
    const TL = gsap.timeline({id: params.id});
    SOURCE = document.getElementById(container);
    DELAY = params.delay;
    DUR = params.duration;
    STAGGER = params.stagger;
    TIMING = params.timing;
    EASE = params.ease;
    Y_DELTA = params.y_delta;
    ROTATION = params.rotation;
    // SOURCE.classList.add("overflow-hidden");
    SPLIT = new SplitText(SOURCE, {
        type: "chars, lines",
        charsClass: "text-roll-char",
        linesClass: "text-roll-line"
    });
    TL.from(SPLIT.chars, {
        duration: DUR,
        paused: true,
        y: startY,
        rotation: 0 - ROTATION,
        scaleY: 0,
        opacity: 0,
        stagger: STAGGER,
        ease: EASE
    });
    return TL;
}

function startY() {
    return Y_DELTA;
}

function finishY() {
    return 0 - Y_DELTA;
}

function settings() {
    
    // Create the container
    const container = document.createElement("div");
    container.classList.add("absolute", "top-0", "right-0", "w-80", "z-50", "flex", "p-4");
    
    // Create the range slider
    
    CONTROL.type = "range";
    CONTROL.min = 0;
    CONTROL.max = 1000;
    CONTROL.value = Y_DELTA;
    CONTROL.classList.add("range", "range-primary");

    // Create the value display
    const display = document.createElement("span");
    display.classList.add("basis-1/6");
    display.textContent = CONTROL.value;

    container.appendChild(display);
    container.appendChild(CONTROL);
    document.body.appendChild(container);

    // Update the view when the range changes
    CONTROL.addEventListener('input', (event) => {
      display.textContent = event.target.value;
      Y_DELTA = event.target.value;
      // base = 0 - amount - 1;
      // updateView();
    });
};