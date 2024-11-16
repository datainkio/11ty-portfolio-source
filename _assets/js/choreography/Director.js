// import '/assets/js/utils/trace.js';
import * as TextParty from '../effects/TextParty.js';
import StageManager from '/assets/js/choreography/StageManager.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function() {

    const SM = new StageManager(document.getElementById("page-content"));
    SM.video = "/assets/video/Robert Lougheed.mp4";
    
    const header = document.getElementById("main-header");
    const h1 = document.getElementById("main-title");
    const intro = document.getElementById("intro");
    const twenty_yrs = document.getElementById("twenty-years").getElementsByClassName("stat-value")[0];
    const MAIN = gsap.timeline();
    const HERO = gsap.timeline(); // {yoyo: true, repeat: -1}

    


    // const f = filters("/assets/svg/filters.svg");

    // HERO
    HERO.to([header, SM.acetate], {
        scrollTrigger: {
            trigger: "#main-header",
            start: "top top-=75px",
            end: "bottom 100px",
            scrub: true,
        },
        transformOrigin: "bottom left",
        rotation: -20,
        ease: "sine.in"
    })
    
    // INTRO
    gsap.to(intro, {
        rotation: 0,
        ease: "sine.inOut",
        scrollTrigger: {
           trigger: "#main-header",
            start: "bottom center",
            scrub: true,
        },
    });

    // 20 YEARS
    const gel_params = {
        id: "wg",
        paused: true,
        w: -6,
        h: -6,
        range: 1,
        envelope: 0,
        duration: 2, 
        colors: ["bravo", "alpha"], 
        wiggles: 50,
    };
    const gelTL = TextParty.gel(twenty_yrs, gel_params);
    
/*
    gsap.utils.toArray(".project").reverse().forEach(project => {
        gsap.from(project, {
            scrollTrigger: {
            trigger: project,
                start: "top bottom",
                end: "top bottom"
            },
            opacity: 0, 
            y: "+=" + 25, 
            ease: "sine.inOut"});
    })
*/
 
    /**
     * The trick for sequencing is to reference specific elements created by other animations rather than
     * trying to return to baseline each time
     */
    // HERO.add(TextParty.gel(h1, Config.WGParams));
    // HERO.add(TextParty.radar(h1, Config.RadarParams));
    // HERO.add(TextParty.gel(h1, Config.WGParams));
    // HERO.add(BlockLine(blockline_container, Config.BlockLineParams), ">");
    // HERO.add(TextParty.roll(document.getElementById(Config.RadarParams.id + "_0"), Config.TRollParams), ">");

    // BackgroundVideo("bg-video-container", "/assets/video/ICA Mediatheque.mp4");

    // StageManager.init(document.getElementById("page-content"));
    // StageManager.update("update stage!");
      
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
function filters(url) {
    // Fetch the external SVG filter and insert it into the document
    fetch(url)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        document.body.appendChild(svgElement);
        return svgElement;

        // const displacementMap = document.getElementById('displacement');
        // let scale = 15;
        // setInterval(() => {
        // scale = scale >= 25 ? 10 : scale + 1;
        // displacementMap.setAttribute('scale', scale);
        // }, 300);
    });
}

