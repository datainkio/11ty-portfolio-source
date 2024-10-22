import { generateDualRangedRandom } from "/assets/js/utils/math.js";
gsap.registerPlugin(CustomEase, CustomWiggle, SplitText); // register

export function WanderingGel({id, w, h, envelope = 0, duration = 1, colors = ["alpha", "bravo"], wiggles = false, debug = false}) {

    const CONTAINER = document.getElementById(id); // The element with the text we want to tweak
    const SRC = CONTAINER.innerText; // The original text
    var span; // The final result will replace the original text with N copies wrapped in spans

    // Init the scene
    const CLASS_NAME = "wandering-gel";
    CONTAINER.innerText = ''; // Because.
      
    // Set up the animation
    const TL = gsap.timeline();
    var delay; // Keeps the x and y coords independent of each other 
    var range; // Tweak the w and h values to provide a bit of variation
    try {
        for (var i = 0; i < colors.length; i++) {
            // Create a duplicate
            span = CONTAINER.appendChild(document.createElement('span'));
            span.innerText = SRC;
            span.classList.add(CLASS_NAME, colors[i]);
            delay = Math.random * duration;
            range = 1;
            if (colors.length > 2) {
                range = generateDualRangedRandom(envelope);
            }
            
            if (i > 0) {
                var st = new SplitText(span, { type: "chars"});
                TL.to(st.chars, {
                    duration: .25,
                    x: "+=" + w * range,
                    y: "+=" + h * range,
                    stagger: 0.1
                }, .35)
                // Move all of the things (except for the first) to a new position
                // .to(span, 1.5, {x:"+=" + w, y:"+=" + h, ease: "power3.inOut"}, 2)
                // .to(st.chars, duration, {x: "+=" + Math.abs(w * range), repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay)
                // .to(st.chars, duration, {y: "+=" + Math.abs(h * range), repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay);
            };
        }
    } catch(e) {
        if (debug) {
            debug(e);
        }
    }

    return TL;
};