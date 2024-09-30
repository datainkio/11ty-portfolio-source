import { fibonacci } from '/assets/js/fibonacci.js';

window.onload = function() {

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
        var fib = fibonacci("#fib_title");
        try {
            tl.add(fib);
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
            duration: 2,
            color: "#FFFFFF00",
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
    
};