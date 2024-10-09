import { trace } from '/assets/js/utils/trace.js';
import { textRadar } from '/assets/js/effects/text-radar.js';
import { fadeInAndUp, introLines } from '/assets/js/effects/text-interstitials.js';

window.onload = function() {
    const SPEED = 1.25;
    /**
     * The main timeline. This coordinates all of the timelines for the 
     * different bits and bobs on the page, like sections and decorations.
     */
    const main = gsap.timeline({
        id: "main",
        onStart: onMainStart,
        onStartParams: ["main"],
        onComplete: onMainComplete,
        onCompleteParams: ["main"]
    });

    main.add(fadeInAndUp("main-title"));
    main.add(textRadar("main-title"));
    main.add(introLines("practices"));

   
    // main.pause();

    // Here is where you set the order for everything by adding timelines
    // in the proper sequence. Ideally it can be in any order.
    // main.add(animateBlockframes("end", "y", "none"));
    // main.add(title("title"));

    // EVENT HANDLING

    function onMainStart(obj) {
        trace("start: " + obj);
    }
    function onMainComplete(obj) {
        trace("complete: " + obj);
    }

    // EXPENSIVE BUT POTENTIAL FUN
    function animateBlockframes(from, axis, ease) {
        // Animate the grid of blockframes
        var grid = [12,12]; //[rows, columns]
        var gridTimeline = gsap.timeline({
            id:"blockframes"
        });
        //one stagger call does all the animation:
        gridTimeline.to(".story", {
            duration: SPEED * .75,
            scale: 0.1, 
            y: 60, 
            repeat: 1, 
            ease: "sine.out",
            stagger: {
                amount: 1.5, 
                grid: grid, 
                axis: axis, 
                ease: ease,
                from: from
            }
            }
        );
        return gridTimeline;
    }
    
};