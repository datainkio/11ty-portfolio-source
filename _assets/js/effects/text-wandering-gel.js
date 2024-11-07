gsap.registerPlugin(CustomEase, CustomWiggle, SplitText);

const CLASS_NAME = "wandering-gel";
const TL = gsap.timeline();
var SPANS = [];
export function WanderingGel(params) {
    const CONTAINER = document.getElementById(params.container); // The element with the text we want to tweak
    const SRC = CONTAINER.innerText; // The original text
    CONTAINER.innerText = '';
    var span; // The final result will replace the original text with N copies wrapped in spans
    if (params.id) {
        TL.id = params.id;
    };
    TL.add({}, {
        duration: 0.0001,
        onStart: onStart,
        onStartParams: [params],
        onComplete: onComplete,
        onCompleteParams: [params],});
      
    // Set up the animation

    var direction; // A positive/negative modifier for x/y values
    try {
        // For each color, create a new instance of the text
        for (var i = 0; i < params.colors.length; i++) {
            span = document.createElement('span');
            span.id = "wg-" + i;
            span.innerText = SRC;
            span.classList.add(CLASS_NAME, params.colors[i]);
            CONTAINER.appendChild(span);
            SPANS.push(span);
        }

        // TODO: Increment direction with each tween
        var id = 1;
        direction = (id % 2 === 0 ? -.8 : 1);

        TL.to(span, {
            duration: params.duration,
            x: "+=" + params.w * params.range * direction,
            y: "+=" + params.h * params.range * direction,
            onStart: onStart,
            onStartParams: [params], // * direction,
        }, "<");

    } catch(e) {
        console.log(e);
    }
    return TL;
};

function onStart(params) {
    console.log("WanderingGel.onStart");
}
function onComplete(params) {
    console.log("WanderingGel.onComplete");
}