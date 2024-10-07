import { fibonacci } from '/assets/js/fibonacci.js';

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
    main.add(title("title"));

    /**
     * Run the title sequence
     * @param {*} id 
     * @returns GSAP timeline
     */
    function title(id) {
        var tl = gsap.timeline({
            id: id,
            // onStart: onSegmentStart,
            // onStartParams: [id],
            // onComplete: onSegmentComplete,
            // onCompleteParams: [id]
        });
        // FIBONACCI SPIRAL
       //  var fib = fibonacci("#fib_title");
        try {
            // tl.add(fib);
        } catch (e) {
            // trace("Something went wrong with the Fibonacci timeline");
            // trace(e);
        }
        // LETTERS
        var st = new SplitText("h1", { type: "words,chars" });
        var chars = st.chars; //an array of all the divs that wrap each character
        tl.add(gsap.from(chars, {
            duration: 2,
            opacity: 0,
            stagger: 0.1
        }))
        tl.add(gsap.from(chars, {
            duration: SPEED,
            color: "#1A171C00",
            // skewX: 45,
            stagger: 0.1
        }), "<15%");
        // tl.pause();
        return tl;
    }

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