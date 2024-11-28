import StageManager from '/assets/js/choreography/StageManager.js';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
export default class Hero {
    
    constructor(video) {
        this.initView();
        this.initGel();
        this.initVideo(video);
        this.initAnimation();
    }

    initView(url) {
        this.CONTAINER = document.getElementById("main-header");
        this.TITLE = document.getElementById("main-title");
        this.GEL = document.createElement("div");
    }

    initGel() {
        // GEL
        this.GEL.classList.add("gel-primary", "absolute", "top-0", "w-full", "h-dvh", "z-9");
        this.CONTAINER.prepend(this.GEL);
    }

    initVideo(url) {
        const video = document.createElement("video");
        video.id = "heroVideo";
        video.setAttribute("autoplay", "");
        video.setAttribute("loop", "");
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("aria-hidden", "true"); // Mark as decorative
        video.classList.add("absolute", "inset-0", "w-full", "h-dvh", "object-cover", "z-0", "bg-neutral", "self-start");  
        
        const sourceMP4 = document.createElement("source");
        sourceMP4.src = url;
        sourceMP4.type = "video/mp4";       
        video.appendChild(sourceMP4);

        this.VIDEO = video;
        this.CONTAINER.prepend(video);
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
    get gel() {
        return this.GEL;
    }
    get text() {
        return this.TITLE;
    }

}