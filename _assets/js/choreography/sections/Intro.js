import StageManager from '/assets/js/choreography/StageManager.js';
import * as PrinterMarks from '/assets/js/displays/PrinterMarks.js';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
export default class Intro {
    
    constructor() {
        this.initView();
        this.initAnimation(); 
    }

    initView() {
        this.CONTAINER = document.getElementById("intro");
        this.decorate(this.CONTAINER);
    }

    decorate(elem) {
        PrinterMarks.addTrim(elem , 16);
        // PrinterMarks.addMargins(intro, 16);
        PrinterMarks.addRegistrationBar(elem , 4);
        PrinterMarks.addBleed(elem , 8);
    }

    initAnimation() {
        this.TL = gsap.timeline({
                id: "intro",
                
            });
        this.TL.add(gsap.from(this.CONTAINER, {
            id: "intro",
            scrollTrigger: this.triggerIntro,
            transformOrigin: "top 80%",
            x: 10,
            rotation: -10,
            ease: "sine.in"
        }));
    }

    get triggerIntro() {
        return {
            trigger: "#intro",
            start: 'top 85%', // when the top of the trigger hits the top of the viewport
            end: 'top 55%', // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        }
    }

    get container() {
        return this.CONTAINER;
    }

    get timeline() {
        return this.TL;
    }
}