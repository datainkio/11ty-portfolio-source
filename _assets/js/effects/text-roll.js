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

export function TextRoll(params) {
    const TL = gsap.timeline({id: params.id});
    
    SOURCE = document.getElementById(params.container);
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
    TL.set(SPLIT.chars, {opacity: 0});
    // settings();

    // Create the static copy of the text
    // var span = document.createElement("span");
    // span.textContent = SOURCE.textContent;
    // span.classList.add("absolute", "inset-0");
    // SOURCE.append(span);

    // Set up the animation
    TL.addLabel("intro");
    TL.add(gsap.from(SPLIT.chars, {
        duration: DUR,
        y: startY,
        rotation: 0 - ROTATION,
        scaleY: 0,
        opacity: 0,
        stagger: STAGGER,
        ease: EASE
    }, TIMING));
    TL.revert();
    TL.addLabel("outro");
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
    TL.addPause("outro");
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