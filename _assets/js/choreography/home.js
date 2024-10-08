import { fibonacci } from '/assets/js/fibonacci.js';
import { blockframe_animation_test } from '/assets/svg-animation/blockframe-animation-test';

window.onload = function() {
    const SPEED = 1.25
    /**
     * The main timeline. This coordinates all of the timelines for the 
     * different bits and bobs on the page, like sections and decorations.
     */
    const main = gsap.timeline({
        id: "main",
        onStart: onSegmentStart,
        onStartParams: ["main"],
        onComplete: onSegmentComplete,
        onCompleteParams: ["main"]
    });

    // Here is where you set the order for everything by adding timelines
    // in the proper sequence. Ideally it can be in any order.
    // main.add(animateBlockframes("end", "y", "none"));
    // main.add(title("title"));

    // EVENT HANDLING

    function onSegmentStart(obj) {
        // trace("start: " + obj);
    }
    function onSegmentComplete(obj) {
        // trace("complete: " + obj);
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