document.addEventListener("DOMContentLoaded", (event) => {


    // PARALLAX
    // apply parallax effect to any element with a data-speed attribute
    gsap.to("[data-speed]", {
    y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
    });
    
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
