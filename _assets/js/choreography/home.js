// import { fadeInAndUp, fadeInChars, introLines } from '/assets/js/interstitials/text.js';
import '/assets/js/utils/trace.js';
import * as Config from '/assets/js/choreography/config.js';
// import { Halftone } from '/assets/js/effects/image-halftone.js';
// import * as Transitions from '/assets/js/effects/Transitions.js';
import * as TextParty from '/assets/js/effects/TextParty.js';
// import *  as Diagram from '/assets/js/choreography/diagram.js';
// import * as BlockLine from '/assets/js/displays/blockline.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function() {
    try {

        const INTRO = gsap.timeline();
        INTRO.id = "intro";
        // const BL = BlockLine.build(Config.BlockLineParams);
        // const OF = TextParty.fill(Config.OFParams);
        const WG = TextParty.gel(Config.WGParams);
        registerTimeline(INTRO);
        registerTimeline(WG);

        INTRO.to({}, { duration: 0.0001 });
        INTRO.add(WG);
    } catch(e) {
        console.log(e);
    }
};

function registerTimeline(tl) {
    tl.eventCallback("onStart", onStart, [tl.id]);
    tl.eventCallback("onComplete", onComplete, [tl.id]);
    // return tl;
}

export function onStart(id) {
    console.log(id + ".onStart");
};
export function onUpdate(obj) {
    console.log(obj + ".onUpdate");
};
export function onComplete(id) {
    console.log(id + ".onComplete");
};