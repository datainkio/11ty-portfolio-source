const DUR = 2;
const STEPS = 30; // Number of steps in the progression
const TL = gsap.timeline(); // The timeline we'll return for integration into other sequences
var source; // The element supplying the text value
var text; // The text value to repeat
var amount = 600; // Use settings() to tweak until you find the ideal
var base = 0 - amount - 1;

export function textRadar(id) {
    // settings();
    populate(id);
    updateView();
    TL.pause();
    return TL;
};

function populate(id) {
    source = document.getElementById(id);
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
        // Style all but the last one to maintain the original
        if (i < STEPS) {
            dupe.classList.add("text-radar-dupe");
            dupe.style.opacity = 1 - i/STEPS * .75;
        }
    }
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
        base: 0,
        amount: 1,
        ease: "expoScale",
        from: "end"
    });
    TL.add(
        gsap.to(".text-radar-dupe", {
        duration: DUR,
        y: pos,
        opacity: alpha,
        ease: "power1.inOut"
    }));
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