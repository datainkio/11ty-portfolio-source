import { generateDualRangedRandom } from "/assets/js/utils/math.js";
var DEBUG = false;
const TL = gsap.timeline();

export function WanderingGel({id, w, h, envelope = 0, duration = 1, colors = ["alpha", "bravo", "charlie"], wiggles = false, debug = false}) {
    gsap.registerPlugin(CustomEase, CustomWiggle, SplitText);
    DEBUG = debug;
    const CONTAINER = document.getElementById(id); // The element with the text we want to tweak
    const SRC = CONTAINER.innerText; // The original text
    var span; // The final result will replace the original text with N copies wrapped in spans

    // Init the scene
    const CLASS_NAME = "wandering-gel";
    CONTAINER.innerText = ''; // Because.
      
    // Set up the animation

    var delay; // Keeps the x and y coords independent of each other 
    var range; // Tweak the w and h values to provide a bit of variation
    var direction; // A positive/negative modifier for x/y values
    try {
        for (var i = 0; i < colors.length; i++) {
            // Create a duplicate
            span = CONTAINER.appendChild(document.createElement('span'));
            span.id = "wanderinggel_" + i;
            span.innerText = SRC;
            span.classList.add(CLASS_NAME, colors[i]);
            // delay = Math.random * duration;
            range = 1;
            direction = (i % 2 === 0 ? -.8 : 1);
            if (colors.length > 2) {
                // range = generateDualRangedRandom(envelope);
            }
            
            // if (i > 0) {
            TL.to(span, {
                duration: duration,
                x: "+=" + w * range * direction,
                y: "+=" + h * range * direction,
            }, "<")
            // Move all of the things (except for the first) to a new position
            // .to(span, 1.5, {x:"+=" + w, y:"+=" + h, ease: "power3.inOut"}, 2)
            // .to(st.chars, duration, {x: "+=" + Math.abs(w * range), repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay)
            // .to(st.chars, duration, {y: "+=" + Math.abs(h * range), repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay);
        // };
        }
    } catch(e) {
        if (DEBUG) {
            DEBUG(e);
        }
    }
    return TL;
};

function init() {

}