document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  // Bring in the title
  gsap.from('#title h1', {
    duration: 2,
    autoAlpha: 0,
    y: 50
  });
});
