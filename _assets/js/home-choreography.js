document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)
// Split the title text into a more manipulatible form
    // var elem = document.getElementsByTagName("h1")[0];
    // var letters = elem.innerText.split("");
    // elem.innerHTML = "<span>" + letters.join("</span><span>") + "</span>";

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

    // Bring the title and tagline out of view
    var titleOutro = gsap.timeline({
        id: "titleOutro",
        scrollTrigger: {
            trigger: '#main-header',
            pin: true, // pin the trigger element while active
            start: 'bottom center', // when the top of the trigger hits the top of the viewport
            // end: '+=500', // end after scrolling 500px beyond the start
            markers: {
                indent: 150,
                startColor: "white",
                endColor: "white"
            },
        }
    });

    titleOutro.add(gsap.to("h1", { duration: 1.25, y: 25, opacity: 0}));
    titleOutro.pause();

    // Run the introduction sequence
    // gsap.set("#intro h2", {opacity: 0});
    var intro = gsap.timeline({ id: "intro"});
    intro.add(gsap.from("h2", {duration: 5, opacity: 0}));
    intro.pause(); 
});
