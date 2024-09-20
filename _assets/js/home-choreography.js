const { gsap } = require("gsap/dist/gsap");

gsap.registerPlugin(Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,DrawSVGPlugin,ScrollSmoother,GSDevTools,InertiaPlugin,MorphSVGPlugin,MotionPathHelper,Physics2DPlugin,PhysicsPropsPlugin,ScrambleTextPlugin,SplitText,RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle);
document.addEventListener("DOMContentLoaded", (event) => {


    // PARALLAX
    // const parallax = gsap.utils.toArray("section.parallax");
    gsap.to("section.parallax", {
        yPercent: -175,
        ease: "none",
        delay: 1,
        scrollTrigger: {
            trigger: "main",
            scrub: true,
                        markers: {
                indent: 150,
                startColor: "grey",
                endColor: "grey"
            },
        }
    })
    
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
