// import '/assets/js/utils/trace.js';
import * as TextParty from '../effects/TextParty.js';
import * as PrinterMarks from '../displays/PrinterMarks.js';
import StageManager from '/assets/js/choreography/StageManager.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.onload = function() {

    const SM = new StageManager(document.getElementById("page-content"));
    SM.video = "/assets/video/Robert Lougheed.mp4";
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
            start: "top top-=25px",
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

    // Apply decorations
    PrinterMarks.addTrim(intro, 12);
    PrinterMarks.addMargins(intro, 16);
    PrinterMarks.addRegistrationBar(intro, 4);
    PrinterMarks.addBleed(intro, 8);

    // Create the timeline w/scroll trigger
    const result = gsap.timeline({
        id: elem,
        scrollTrigger: {
           trigger: trigger,
            start: "bottom bottom",
            end: "bottom top-=300px",
            scrub: true,
        },
    });

    // 1. Prepare the view to move in
    gsap.set(elem, {x: "100vw", rotation: -40, transformOrigin: "top 25%"});

    // 2. Bring in the page
    result.add(gsap.to(elem, {
        rotation: 0,
        x: 0,
        y: window.innerHeight/2,
        ease: "sine.inOut",
        // onComplete: twentyTL.play()
    }));


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

