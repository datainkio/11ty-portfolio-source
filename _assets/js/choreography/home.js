// import { fadeInAndUp, fadeInChars, introLines } from '/assets/js/interstitials/text.js';
import '/assets/js/utils/trace.js';
import * as Config from '/assets/js/choreography/config.js';
import * as Resume from '/assets/js/choreography/resume.js';

// import { Halftone } from '/assets/js/effects/image-halftone.js';
// import * as Transitions from '/assets/js/effects/Transitions.js';
import * as TextParty from '/assets/js/effects/TextParty.js';
// import *  as Diagram from '/assets/js/choreography/diagram.js';
// import * as BlockLine from '/assets/js/displays/blockline.js';

gsap.registerPlugin(ScrollTrigger);
const MAIN = gsap.timeline();
MAIN.id = "MAIN";
MAIN.eventCallback("onStart", onStart, [MAIN.id]);
MAIN.eventCallback("onComplete", onComplete, [MAIN.id]);

window.onload = function() {
    try {
        // INTROS AND OUTROS
        const TITLE = TextParty.gel(Config.WGParams);
        TITLE.id = "title";
        registerTimeline(TITLE);

        const INTRO = TextParty.lines("main-header");
        INTRO.id = "intro";
        registerTimeline(INTRO);

        const CV = Resume.animate();
        CV.id = "cv";
        registerTimeline(CV);

        // SCROLLING

    } catch(e) {
        console.log(e);
    }
};

function registerTimeline(tl) {
    tl.eventCallback("onStart", onStart, [tl.id]);
    tl.eventCallback("onComplete", onComplete, [tl.id]);
    MAIN.addLabel(tl.id);
    MAIN.add(tl, tl.id);
}

function onStart(id) {
    console.log(id + ".onStart");
};
function onUpdate(obj) {
    console.log(obj + ".onUpdate");
};
function onComplete(id) {
    console.log(id + ".onComplete");
};

