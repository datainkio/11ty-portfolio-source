window.onload = function() {
    trace("choreography/home.js loaded");
    const main = gsap.timeline({
        id: "main",   
    });

    trace("Initialize title sequence");
    main.add(title("title"));
    // main.pause();
    // SEQUENCES

    /**
     * Run the title sequence
     * @param {*} id 
     * @returns GSAP timeline
     */
    function title(id) {
        var tl = gsap.timeline({
            id: id,
            onStart: onSegmentStart,
            onStartParams: [id],
            onComplete: onSegmentComplete,
            onCompleteParams: [id]
        });
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
        trace("start: " + obj);
    }
    function onSegmentComplete(obj) {
        trace("complete: " + obj);
    }
    
};