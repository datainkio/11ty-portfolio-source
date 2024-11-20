// import '/assets/js/utils/trace.js';
import * as TextParty from '../effects/TextParty.js';
import StageManager from '/assets/js/choreography/StageManager.js';

gsap.registerPlugin(ScrollTrigger);

window.onload = function() {

    const SM = new StageManager(document.getElementById("page-content"));
    SM.video = "/assets/video/Robert Lougheed.mp4";
    // SM.blockline = document.getElementById("blocklines");
    const header = document.getElementById("main-header");

    const h1 = document.getElementById("main-title");
    const intro = document.getElementById("intro");
    const twenty_yrs = document.getElementById("twenty-years").getElementsByClassName("stat-value")[0];
    const MAIN = gsap.timeline();
    const HERO = gsap.timeline(); // {yoyo: true, repeat: -1}

    const landingTL = initLandingView([header, SM.blue]);
    const introTL = initIntroView(intro, header);
    const projectsTL = initProjectsView();
    /**
    const testTL = gsap.timeline({
        scrollTrigger: {
                trigger: "#blocklines",
                start: "top top",
                pin: true
            }
    });
    **/

    // testTL.add(SM.blockline._timeline);

    // 20 YEARS

    // const twentyTL = TextParty.gel(twenty_yrs, gel_params);
    // twentyTL.pause();

    // INTRO

    



 
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

function initProjectsView() {
   return gsap.utils.toArray(".project").reverse().forEach(project => {
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
}

function initLandingView(arr) {
    return gsap.to(arr, {
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
}

function initIntroView(elem, trigger) {

    const gel_params = {
        id: "wg",
        paused: true,
        w: -6,
        h: -6,
        range: 1,
        envelope: 0,
        duration: 2, 
        colors: ["text-bravo", "text-alpha"], 
        wiggles: 50,
    };

    gsap.set(elem, {x: 300, y: "+=" + 150, rotation: -20});
    const result = gsap.timeline({id: "intro"});
    // bring the container into view
    result.add(gsap.to(intro, {
        rotation: 0,
        x: 0,
        y: window.innerHeight / 2,
        ease: "sine.inOut",
        scrollTrigger: {
           trigger: trigger,
            start: "bottom bottom",
            stop: "bottom 50%",
            scrub: true,
        },
        // onComplete: twentyTL.play()
    }))
    // sex up the number
    // .add(TextParty.gel(document.getElementById("twenty-years").getElementsByClassName("stat-value")[0], gel_params));
    return 
}


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

