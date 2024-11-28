// import '/assets/js/utils/trace.js';
import * as TextParty from '../effects/TextParty.js';
import Hero from '/assets/js/choreography/sections/Hero.js';
import Intro from '/assets/js/choreography/sections/Intro.js';
import StageManager from '/assets/js/choreography/StageManager.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.onload = function() {

    // const SM = new StageManager(document.getElementById("page-content"));
    // SM.video = "/assets/video/Robert Lougheed.mp4";
    // SM.gels = ["primary"];

    ScrollSmoother.create({
        wrapper: "#smooth-wrapper", // Wrapper ID
        content: "#page-content", // Content ID
        smooth: 1.5, // Speed of smoothing (higher = slower)
        effects: true // Allow effects like opacity or parallax
    });

    
    const HERO = new Hero("/assets/video/Robert Lougheed.mp4");
    const INTRO = new Intro();


    // HERO.text.setAttribute("data-speed", "1.25");
    // HERO.gel.setAttribute("data-speed", "1.25");
    // INTRO.container.setAttribute("data-speed", "1");
     
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

