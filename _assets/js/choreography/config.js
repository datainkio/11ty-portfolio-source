export const BlockLineParams = {
    id: "blockline",
    delay: 2,
}

export const RevealParams = {
    origin: {
        y: 25,
        opacity: 0
    },
    destination: {
        y: 0,
        opacity: 1
    },
    ease: "none",
    duration: .75 
}

export const WGParams = {
    id: "wg",
    paused: true,
    w: -6,
    h: -6,
    range: 1,
    envelope: 0,
    duration: 2, 
    colors: ["alpha", "bravo"], 
    wiggles: 50,
};

export const RadarParams = {
    id: "main-title",
    duration: .15,
    steps: 10,
    alpha_start: .85,
    alpha_end: .25,
    amount: 600,
    base: -601
}

export const OFParams = {
    id: "fill",
    container: "main-title",
    duration: 1,
    stagger: 0.1,
    overlap: "<15%",
    color: "#1A171C00",
};

export const TRollParams = {
    id: "troll",
    paused: true,
    container: "#main-header",
    delay: 2,
    duration: .5,
    stagger: .1,
    timing: "-=75%",
    ease: "power1.inOut",
    y_delta: 12,
    rotation: 4,
};

export const HalftoneParams = {
    container: "avatar",
    dotSize: 10,
    gridSize: 8,
    color: true,
};

export const ARCParams = {
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