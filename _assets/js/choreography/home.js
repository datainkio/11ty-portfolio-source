import { trace } from '/assets/js/utils/trace.js';
import { WanderingGel } from '/assets/js/effects/text-wandering-gel.js';
import { Halftone } from '/assets/js/effects/image-halftone.js';
import { TextRadar } from '/assets/js/effects/text-radar.js';
// import { fadeInChars } from '/assets/js/effects/text-interstitials.js';
// import { textRoll } from '/assets/js/effects/text-roll.js';
import { TextLenticular } from '/assets/js/effects/text-lenticular.js';

const WGParams = {
    id: "main-title", 
    w: -6,
    h: -6,
    envelope: 0,
    duration: 1, 
    colors: ["alpha", "bravo"], 
    wiggles: 50,
    // debug: trace
};

const TRParams = {
    id: "main-title"
};

const HalftoneParams = {
    container: "avatar",
    dotsize: 10,
    color: true,
    debug: false
};

window.onload = function() {

    try {
         /**
         * The intro timeline. This runs when the page load completes.
         * This has its own timeline to decouple it from the main. This
         * reduces interference with scroll events.
         */
        const INTRO = gsap.timeline();
        INTRO.onStart = onStart,
        INTRO.onStartParams = "intro",
        INTRO.onComplete = onComplete,
        INTRO.onCompleteParams = "intro";
        // INTRO.pause();

        // const HT = Halftone(HalftoneParams);
        const WG = WanderingGel(WGParams);
        // const TR = TextRadar(TRParams);
        // const TLen = TextLenticular("main-title");
        INTRO.add(WG);

        gsap.registerPlugin(ScrollTrigger);
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
            })
        });
        TL.pause();
    } catch(e) {
        trace(e);
    }
};

function onStart(obj) {
    trace("start: " + obj);
}
function onComplete(obj) {
    trace("complete: " + obj);
}