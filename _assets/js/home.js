document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  const sections = gsap.utils.toArray('.anim');
  sections.forEach(section => {
    gsap.from(section, { 
      y: 150,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: section,
        scrub: true
      }
    })
  });
});
