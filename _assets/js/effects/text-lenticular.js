const DUR = 10;
const EASE = "power1.inOut";
var CONTAINER;
var TEXT;
var TL = gsap.timeline();
export function textLenticular(id, trace) {
    // Create a striped background: see .bg-horizontal-stripes
    // Apply background to container
    try {
        TEXT = document.getElementById(id);
        // TEXT.classList.add("bg-horizontal-stripes");
        // trace(TEXT.classList);
        CONTAINER = TEXT.parentNode;
        // CONTAINER.classList.add("bg-horizontal-stripes");
        TL.to(TEXT, {duration: DUR, backgroundPositionY: 40, repeat: -1, ease: "none"}, 0);
        TL.to(CONTAINER, {duration: DUR * 4, backgroundPositionY: -40, repeat: -1, ease: "none"}, 0);
    } catch(e) {
        trace(e);
    }
    return TL;
    // CONTAINER = TEXT.parentNode;
    // CONTAINER.classList.add("bg-horizontal-stripes");
    // Apply background to text elem
    // Set text elem to clip background
    // Apply animations to each background instance that enter and leave alignment with each other
};