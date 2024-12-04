import * as PrinterMarks from '/assets/js/displays/PrinterMarks.js';
import * as TextParty from "/assets/js/effects/TextParty.js";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
export default class Intro {
    
    constructor() {
        this.initView();
        this.initAnimation();
    }

    initView() {
        this.CONTAINER = document.getElementById("intro");
        this.addPrintMarks();
    }

    /**
     * Apply static decoration elements (e.g. print marks, etc.)
     */
    addPrintMarks() {

        // Add print registration marks to the main container
        PrinterMarks.addTrim(this.CONTAINER , 16);
        PrinterMarks.addRegistrationBar(this.CONTAINER , 4);
        PrinterMarks.addBleed(this.CONTAINER , 8);
    }

    initAnimation() {
        this.TL = gsap.timeline({
                id: "intro",
            });
        
        // CONTAINER
        this.TL.add(gsap.from(this.CONTAINER, {
            id: "intro",
            scrollTrigger: this.triggerIntro,
            transformOrigin: "top 80%",
            x: 10,
            rotation: -10,
            ease: "sine.in"
        }));

        // "20 years of award-winning work"
        ScrollTrigger.create({
            trigger: "#twenty-years",
            start: "top 65%",
            // end: "bottom center",
            animation: TextParty.gel(document.getElementById("twenty-years"), ["text-accent/90", "text-primary/90"]),
        });

        // STATEMENT
        ScrollTrigger.create({
            trigger: "#statement",
            start: "top center",
            // end: "bottom center",
            animation: this.lines
        })

        // AWARDS
        ScrollTrigger.create({
            trigger: "#awards",
            start: "top center",
            // end: "bottom center",
            animation: this.awards
        })
    }

    get triggerIntro() {
        return {
            trigger: "#intro",
            start: 'top 85%', // when the top of the trigger hits the top of the viewport
            end: 'top 55%', // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        }
    }

    get lines() {
        var split = new SplitText("#statement", {type: "lines"});
        return gsap.from(split.lines, {
            duration: 1, 
            y: 20, 
            opacity: 0, 
            stagger: 0.25
        })
    }

    get awards() {
        return gsap.from(".award-organization", {
            duration: 1, 
            y: 20, 
            opacity: 0, 
            stagger: 0.25          
        })
    }

    get organizations() {
        var orgs = document.getElementsByClassName("organization");
        return gsap.from(orgs, {
            duration: 1, 
            y: 20, 
            opacity: 0, 
            stagger: 0.25          
        })      
    }

    get container() {
        return this.CONTAINER;
    }

    get timeline() {
        return this.TL;
    }
}