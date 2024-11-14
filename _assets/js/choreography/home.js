// import { fadeInAndUp, fadeInChars, introLines } from '/assets/js/interstitials/text.js';
import '/assets/js/utils/trace.js';
import * as Config from '/assets/js/choreography/config.js';
// import * as Resume from '/assets/js/choreography/resume.js';
// import * as Transitions from '/assets/js/effects/Transitions.js';
import * as TextParty from '/assets/js/effects/TextParty.js';
import { BlockLine } from '../displays/blockline/blockline.js';
// import *  as Diagram from '/assets/js/choreography/diagram.js';
// import * as BlockLine from '/assets/js/displays/blockline.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function() {
    // addTimeline(TextParty.fadeInChars("main-title"));
    // addTimeline(TextParty.gel("main-title", Config.WGParams));

    document.addEventListener('onTextPartyStart', (e) => {

    });
    document.addEventListener('onTextPartyComplete', (e) => {
    });

    const MAIN = gsap.timeline();
    const HERO = gsap.timeline(); // {yoyo: true, repeat: -1}
    /**
     * The hero sequence focuses on animating the landing view by manipulating the title text.
     */
    let h1 = document.getElementById("main-title");
    // let gel = document.getElementById(Config.RadarParams.id + "_0");
    // let radar = document.getElementById(Config.RadarParams.id + "_0")


    /**
     * The trick for sequencing is to reference specific elements created by other animations rather than
     * trying to return to baseline each time
     */
    // HERO.add(TextParty.gel(h1, Config.WGParams));
    // HERO.add(TextParty.radar(h1, Config.RadarParams));
    HERO.add(BlockLine(Config.BlockLineParams));
    HERO.add(TextParty.gel(h1, Config.WGParams), ">");

    // HERO.add(TextParty.roll(document.getElementById(Config.RadarParams.id + "_0"), Config.TRollParams), ">");
    
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

