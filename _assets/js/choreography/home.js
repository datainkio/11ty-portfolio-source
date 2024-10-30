// import { fadeInAndUp, fadeInChars, introLines } from '/assets/js/interstitials/text.js';
import * as Config from '/assets/js/choreography/config.js';
// import { Halftone } from '/assets/js/effects/image-halftone.js';
// import * as Transitions from '/assets/js/effects/Transitions.js';
import * as TextParty from '/assets/js/effects/TextParty.js';
// import *  as Diagram from '/assets/js/choreography/diagram.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function() {

    try {
         /**
         * The intro timeline. This runs when the page load completes.
         * This has its own timeline to decouple it from the main. This
         * reduces interference with scroll events.
         */
        const INTRO = register(gsap.timeline({id: Config.IntroParams.id}));
        INTRO.addLabel("intro");
        // INTRO.addPause("intro");
        INTRO.addLabel("idle");
        // INTRO.addPause("idle");
        INTRO.addLabel("outro");
        // INTRO.addPause("outro");

        const TEST = register(gsap.timeline({id: "TEST"}));
        INTRO.add(TEST, "idle");

        // const ROLL = register(TextParty.roll(Config.TRollParams));
        // const WG = register(TextParty.Gel(Config.WGParams), "WanderingGel");
        // const OF = register(TextParty.fill(Config.OFParams));
        // INTRO.add(ROLL, "intro");       
        // INTRO.add(WG, "idle");
        // INTRO.add(OF, "intro");  
        // INTRO.play("idle");
    } catch(e) {
        Config.log(e);
    }
};

function register(tl) {
    tl.eventCallback("onStart", onStart, [tl.vars.id]);
    // tl.eventCallback("onUpdate", onUpdate, [id]);
    tl.eventCallback("onComplete", onComplete, [tl.vars.id]);
    return tl;
}

export function onStart(obj) {
    Config.log(obj + ".onStart");
}
export function onUpdate(obj) {
    Config.log(obj + ".onUpdate");
}
export function onComplete(obj) {
    Config.log(obj + ".onComplete");
}