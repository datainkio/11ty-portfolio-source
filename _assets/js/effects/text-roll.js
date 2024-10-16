var SOURCE;
var SPLIT;
const DELAY = 2;
const DUR = .5;
const STAGGER = .1;
const TIMING = "-=75%";
const EASE = "power1.inOut";
var Y_DELTA = 225;
var ROTATION = 12;
const TL = gsap.timeline({
        repeat: -1,
        repeatRefresh: true
    });
const CONTROL = document.createElement('input');

export function textRoll(id) {
    SOURCE = document.getElementById(id);
    // SOURCE.classList.add("overflow-hidden");
    SPLIT = new SplitText(SOURCE, {
        type: "chars",
        charsClass: "text-roll-char"
    });

    settings();

    // Create the static copy of the text
    var span = document.createElement("span");
    span.textContent = SOURCE.textContent;
    span.classList.add("absolute", "inset-0");
    SOURCE.append(span);

    // Set up the animation
    TL.add(gsap.from(SPLIT.chars, {
        duration: DUR,
        y: startY,
        rotation: 0 - ROTATION,
        scaleY: 0,
        opacity: 0,
        stagger: STAGGER,
        ease: EASE
    }, TIMING))
    TL.add(gsap.to(SPLIT.chars, {
        delay: DELAY,
        duration: DUR,
        y: finishY,
        rotation: ROTATION,
        scaleY: 0,
        opacity: 0,
        stagger: STAGGER,
        ease: EASE
    }, TIMING), TIMING);

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