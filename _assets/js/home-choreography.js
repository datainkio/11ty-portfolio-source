document.addEventListener("DOMContentLoaded", (event) => {


    // PARALLAX
    try {
        trace("setting up parallax...");
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        trace("ScrollSmoother");

        // see https://codepen.io/GreenSock/pen/bGaWjpw
        // create the smooth scroller FIRST!
        const smoother = ScrollSmoother.create({
            wrapper: "body",
            content: "main",
            smooth: 1,
            normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
            ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
            effects: true,
            preventDefault: true
        });

        gsap.set("#title", {
            yPercent: -150,
            opacity: 1
        });

        let tl = gsap.timeline();
        // let mySplitText = new SplitText("#split-stagger", { type: "words,chars" });
        let sections = gsap.utils.toArray("main section");
        trace(sections);

        sections.forEach((section, i) => {
            smoother.effects(section, { speed: 1, lag: (i + 1) * 0.1 });
        });

        trace("parallax setup complete");
    } catch(e) {
        trace("couldn't set up parallax");
        trace(e);
    }
    
    
    // INTROS AND OUTROS

    // Bring the title and tagline into view
    var titleIntro = gsap.timeline({ 
        id: "title"
    });
    // H1
    titleIntro.add(gsap.from("h1", { duration: 1.25, y: 25, opacity: 0}));
    // P
    titleIntro.add(gsap.from("#tagline", { duration: 1.5, opacity: 0}));
    // Wait until you're called on, most likely by the preloader
    titleIntro.pause();
});
