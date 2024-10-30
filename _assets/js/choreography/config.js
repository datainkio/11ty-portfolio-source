import { trace } from '/assets/js/utils/trace.js';

export function log(obj) {
    if(typeof trace === 'function') {
        trace(obj);
    }
}

export const WGParams = {
    id: "main-title", 
    w: -3,
    h: -3,
    envelope: 0,
    duration: 2, 
    colors: ["alpha", "bravo"], 
    wiggles: 50,
    debug: trace
    // debug: trace
};

export const RadarParams = {
    id: "main-title",
    duration: .15,
    steps: 10,
    alpha_start: .85,
    alpha_end: .25,
    debug: trace,
    amount: 600,
    base: -601
}

export const OFParams = {
    id: "main-title",
    duration: 2
};

export const TRollParams = {
    id: "main-title",
    delay: 2,
    duration: .5,
    stagger: .1,
    timing: "-=75%",
    ease: "power1.inOut",
    y_delta: 12,
    rotation: 4,
    debug: trace
};

export const HalftoneParams = {
    container: "avatar",
    dotSize: 10,
    gridSize: 8,
    color: true,
    debug: trace,
};

export const ARCParams = {
    debug: trace,
    scrollTrigger: {
        trigger: '#arc-animation',
        // pin: true, // pin the trigger element while active
        start: 'center center', // when the top of the trigger hits the top of the viewport
        // end: '+=500', // end after scrolling 500px beyond the start
        //. scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
    duration: .75,
    overlap: "<10%"
}