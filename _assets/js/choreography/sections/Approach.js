import StageManager from '/assets/js/choreography/StageManager.js';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
export default class Approach {
    
    constructor(video) {
        // 1. See if the SVG supplying the visual bits exists. If not, escape and notify via console
        
        this.SVG = document.getElementById("BlockframeLibrary");
        this.SVG.classList.add("absolute", "inset-0");
        this.BLOCKFRAME = this.SVG.firstElementChild;

        // Simplify the SVG by removing all the stuff we don't need here
        this.SVG.querySelectorAll(".Timeline, .Map, .Contact, .Cart, .Calendar, .Article, .About").forEach(node => node.remove());

        // Center things within the SVG
        const bbox = this.SVG.getBBox();
        const svgWidth = this.SVG.getAttribute('width');
        const svgHeight = this.SVG.getAttribute("height");

        const offsetX = (svgWidth - bbox.width) / 2 - bbox.x;
        const offsetY = (svgHeight - bbox.height) / 2 - bboox.y; 
        
        // Select all path elements in the SVG
        const paths = this.SVG.querySelectorAll('path');

        // paths.forEach(path => path.setAttribute("fill", "none"));
        // paths.forEach(path => path.setAttribute("stroke", "#FFFFFF"));
        gsap.set(paths, {scale: .25, x: offsetX, y: offsetY});
        paths.forEach(path => {
            gsap.to(path, {
            duration: 2, // Animation duration in seconds
            x: () => Math.random() * 400, // Random x position (up to 400px)
            y: () => Math.random() * 400, // Random y position (up to 400px)
            ease: "power2.inOut", // Smooth easing
            repeat: -1, // Repeat indefinitely
            yoyo: true // Reverse animation for a smooth loop
            });
        });
        // Chrome:  g.Chrome
        // Landing: g.Landing
        // face.classList.contains("face-Landing")
        // 2. Get one blockframe from the SVG
        // 3. Display the elements of the blockframe in random positions around the screen.
        // 4. Animte the elements to their original positions
        this.initView();
        this.initAnimation();
    }

    initView(url) {
        this.CONTAINER = document.getElementById("main-header");
        this.TITLE = document.getElementById("main-title");
        this.GEL = document.createElement("div");
    }

    initAnimation() {
        this.TL = gsap.timeline({id: "hero"});
        this.TL.to([this.TITLE, this.GEL], {
            id: "outro",
            scrollTrigger: this.trigger,
            transformOrigin: "bottom left",
            rotation: -20,
            x: -96,
            ease: "sine.in"
        });
    }

    get trigger() {
        return {
            trigger: this.CONTAINER,
            pin: this.VIDEO, // pin the trigger element while active
            start: 'top top', // when the top of the trigger hits the top of the viewport
            // end: 'bottom top', // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        }
    }

    get timeline() {
        return this.TL;
    }
    get container() {
        return this.CONTAINER;
    }

}