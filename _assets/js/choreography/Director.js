// import '/assets/js/utils/trace.js';
import * as TextParty from '../effects/TextParty.js';
import StageManager from '/assets/js/choreography/StageManager.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.onload = function() {

    const SM = new StageManager(document.getElementById("page-content"));
    SM.video = "/assets/video/Zabiela Background Composite.mp4";
    SM.gels = ["primary"];

    // Initialize ScrollSmoother for smooth scrolling
    // const smoother = ScrollSmoother.create({
    //     wrapper: "page-content", // The outer wrapper
    //     smooth: 1, // Smoothing amount (higher is smoother)
    //     effects: true, // Enables built-in effects
    // });

    // SM.blockline = document.getElementById("blocklines");
    const header = document.getElementById("main-header");

    const h1 = document.getElementById("main-title");
    const intro = document.getElementById("intro");
    const twenty_yrs = document.getElementById("twenty-years").getElementsByClassName("stat-value")[0];
    const MAIN = gsap.timeline();
    const HERO = gsap.timeline(); // {yoyo: true, repeat: -1}

    const landingTL = initLandingView([header, SM.getGel("primary")]);
    const introTL = initIntroView(intro, header);
    // const projectsTL = initProjectsView();
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
    console.log("initProjectsView()");
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
    console.log("initLandingView()");
    return gsap.to(arr, {
        scrollTrigger: {
            trigger: "#main-header",
            start: "top top-=75px",
            end: "bottom 100px",
            scrub: true,
        },
        transformOrigin: "bottom left",
        rotation: -20,
        x: -96,
        ease: "sine.in"
    })
}

function initIntroView(elem, trigger) {
    console.log("initIntroView()", document.getElementById("twenty-years").getElementsByClassName("stat-value")[0]);
    const gel_params = {
        id: "wg",
        paused: true,
        w: -6,
        h: -6,
        range: 1,
        envelope: 0,
        duration: 2, 
        colors: ["text-primary-300", "text-accent-300"], 
    };

    // 1. Prepare the view to move in
    gsap.set(elem, {x: 300, y: "+=" + 200, rotation: -10, transformOrigin: "top 75%"});
    const result = gsap.timeline({
        id: elem,
        scrollTrigger: {
           trigger: trigger,
            start: "top bottom",
            stop: "top center",
            scrub: true,
        },
    });
    // 2. Bring in the view
    result.add(gsap.to(elem, {
        rotation: 0,
        x: 0,
        y: window.innerHeight/2,
        ease: "sine.inOut",
        // onComplete: twentyTL.play()
    }));
    // 3. Apply the WanderingGel effect to the "20" text
    result.add(TextParty.gel(document.getElementById("twenty-years").getElementsByClassName("stat-value")[0], gel_params), ">");
    return result;
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

