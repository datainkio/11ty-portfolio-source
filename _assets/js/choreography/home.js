import { trace } from '/assets/js/utils/trace.js';
import { fadeInAndUp, fadeInChars, introLines } from '/assets/js/interstitials/text.js';
import { HalftoneParams, WGParams, ARCParams} from '/assets/js/choreography/config.js';
import { WanderingGel } from '/assets/js/effects/text-wandering-gel.js';
import { Halftone } from '/assets/js/effects/image-halftone.js';
import *  as Diagram from '/assets/js/choreography/diagram.js';
// import { TextRadar } from '/assets/js/effects/text-radar.js';
// import { fadeInChars } from '/assets/js/effects/text-interstitials.js';
// import { textRoll } from '/assets/js/effects/text-roll.js';
// import { TextLenticular } from '/assets/js/effects/text-lenticular.js';
gsap.registerPlugin(ScrollTrigger);

window.onload = function() {

    try {
         /**
         * The intro timeline. This runs when the page load completes.
         * This has its own timeline to decouple it from the main. This
         * reduces interference with scroll events.
         */
        log("choreography.home is setting up...");
        const INTRO = gsap.timeline({
            onStart: onStart,
            onStartParams: ["intro"],
            // onUpdate: onUpdate,
            onUpdateParams: ["intro"],
            onComplete: onComplete,
            onCompleteParams: ["intro"]
        });

        const HT = Halftone(HalftoneParams);
        const WG = WanderingGel(WGParams);
        const ARC = Diagram.arc("diagram_arc");
        // const TRoll = TextRadar(TRParams);
        // const TLen = TextLenticular("main-title");
        INTRO.add(WG);


        // Set up ScrollTrigger to pin the #types <ul> and keep it vertically centered
        const types = document.getElementById("types");
        gsap.to(types, {
            scrollTrigger: {
                trigger: "#work",
                start: "top 33%",          // Start when the top of the section hits the center of the viewport
                end: "bottom bottom",         // End when the bottom of the section hits the center of the viewport
                pin: types,                    // Keep the element fixed in place
                // pinSpacing: false,            // Disable additional space after pinning ends
                scrub: 2
            }
        });

        const SPEED = 1.25;
        const ST = ScrollTrigger.create({
            trigger: '#main-title',
            start: 'bottom bottom',
            end: "+=100%",
            scrub: 1,
        });
        
        /**
         * The main timeline. This coordinates all of the timelines for the 
         * different bits and bobs on the page, like sections and decorations.
         */
        const TL = gsap.timeline({
            id: "main",
            trigger: ST,
            onStart: onStart,
            onStartParams: ["main"],
            onComplete: onComplete,
            onCompleteParams: ["main"]
        });

        TL.addLabel("start");
        // TL.add(fadeInChars("main-title"));
        // TL.add(textLenticular("main-title", trace));
        // TL.add(textRoll("main-title"));
        // TL.add(textRadar("main-title"));
        // TL.add(WanderingGel(WGParams));
        // main.add(introLines("practices"));


        /**
         * Individual elements bring themselves into view
         */
        const sequenced = gsap.utils.toArray(".sequenced");
        // Get the computed style to determine the number of columns
        const gridStyle = getComputedStyle(document.getElementById("projects"));
        const columns = gridStyle.gridTemplateColumns.split(" ").length;
        // Calculate the grid column based on the index
        // return (elementIndex % columns);
        sequenced.forEach((item, index) => {
            gsap.from(item, {
                duration: 1.5,
                scrollTrigger: item,
                opacity: 0,
                y: 150,
                delay: (index % columns) * .5,
                ease: "power1.out"
            });
        });
        log("choreography.home is done setting up.");
        TL.pause();
    } catch(e) {
        trace(e);
    }
};

export function onStart(obj) {
    log(obj + ".onStart");
}
export function onUpdate(obj) {
    log(obj + ".onUpdate");
}
export function onComplete(obj) {
    log(obj + ".onComplete");
}

function log(obj) {
    if(typeof trace === 'function') {
        trace(obj);
    }
}