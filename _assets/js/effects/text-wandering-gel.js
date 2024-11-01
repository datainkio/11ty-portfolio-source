import { generateDualRangedRandom } from "/assets/js/utils/math.js";

export function WanderingGel(params) {
    gsap.registerPlugin(CustomEase, CustomWiggle, SplitText);
    var TL = gsap.timeline({id: params.id});
    const CONTAINER = document.getElementById(params.container); // The element with the text we want to tweak
    const SRC = CONTAINER.innerText; // The original text
    var span; // The final result will replace the original text with N copies wrapped in spans
    // Init the scene
    const CLASS_NAME = "wandering-gel";
    CONTAINER.innerText = ''; // Because.
      
    // Set up the animation

    var direction; // A positive/negative modifier for x/y values
    try {
        // For each color, create a new instance of the text
        for (var i = 0; i < params.colors.length; i++) {
            span = CONTAINER.appendChild(document.createElement('span'));
            span.id = "wanderinggel_" + i;
            span.innerText = SRC;
            span.classList.add(CLASS_NAME, params.colors[i]);
            direction = (i % 2 === 0 ? -.8 : 1);
            if (params.colors.length > 2) {
                // range = generateDualRangedRandom(envelope);
            }
            
            // if (i > 0) {
            TL.to(span, {
                duration: params.duration,
                x: "+=" + params.w * params.range * direction,
                y: "+=" + params.h * params.range * direction,
            }, "<");
            // Move all of the things (except for the first) to a new position
            // .to(span, 1.5, {x:"+=" + w, y:"+=" + h, ease: "power3.inOut"}, 2)
            // .to(st.chars, duration, {x: "+=" + Math.abs(w * range), repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay)
            // .to(st.chars, duration, {y: "+=" + Math.abs(h * range), repeat:-1, ease:CustomWiggle.create("", {type:"random", wiggles:wiggles})}, delay);
        // };
        }
    } catch(e) {

    }
    return TL;
};