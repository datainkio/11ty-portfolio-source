export const WGParams = {
    id: "main-title", 
    w: -6,
    h: -6,
    envelope: 0,
    duration: 1, 
    colors: ["alpha", "bravo"], 
    wiggles: 50,
    // debug: trace
};

export const TRParams = {
    id: "main-title"
};

export const HalftoneParams = {
    container: "avatar",
    dotSize: 10,
    gridSize: 8,
    color: true,
    debug: false
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