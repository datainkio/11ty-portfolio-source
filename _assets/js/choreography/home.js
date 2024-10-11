import { trace } from '/assets/js/utils/trace.js';
// import { textRadar } from '/assets/js/effects/text-radar.js';
import { fadeInAndUp, introLines } from '/assets/js/effects/text-interstitials.js';
// import { textRoll } from '/assets/js/effects/text-roll.js';
import { textLenticular } from '/assets/js/effects/text-lenticular.js';

window.onload = function() {
    const SPEED = 1.25;
    /**
     * The main timeline. This coordinates all of the timelines for the 
     * different bits and bobs on the page, like sections and decorations.
     */
    const main = gsap.timeline({
        id: "main",
        onStart: onMainStart,
        onStartParams: ["main"],
        onComplete: onMainComplete,
        onCompleteParams: ["main"]
    });

    try {
        // main.add(fadeInAndUp("main-title"));
        main.add(textLenticular("main-title", trace));
        // main.add(textRoll("main-title"));
        // main.add(textRadar("main-title"), "-=25%");
        // main.add(introLines("practices"));
    } catch(e) {
        trace(e);
    }

    function onMainStart(obj) {
        trace("start: " + obj);
    }
    function onMainComplete(obj) {
        trace("complete: " + obj);
    }
};