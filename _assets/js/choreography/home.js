// import { fadeInAndUp, fadeInChars, introLines } from '/assets/js/interstitials/text.js';
import '/assets/js/utils/trace.js';
import * as Config from '/assets/js/choreography/config.js';
// import * as Resume from '/assets/js/choreography/resume.js';
// import * as Transitions from '/assets/js/effects/Transitions.js';
import * as TextParty from '/assets/js/effects/TextParty.js';
// import *  as Diagram from '/assets/js/choreography/diagram.js';
// import * as BlockLine from '/assets/js/displays/blockline.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function() {
    // addTimeline(TextParty.fadeInChars("main-title"));
    // addTimeline(TextParty.gel("main-title", Config.WGParams));
    const MAIN = gsap.timeline();
    const HERO = gsap.timeline();
    HERO.add(TextParty.seventies("main-title", Config.WGParams));
};


function onStart(id) {
    console.log(id + ".onStart");
};
function onUpdate(obj) {
    console.log(obj + ".onUpdate");
};
function onComplete(id) {
    console.log(id + ".onComplete");
    if (id == "fadeInChars") {
        // addTimeline(TextParty.gel("main-title", Config.WGParams));
    }
    
};

