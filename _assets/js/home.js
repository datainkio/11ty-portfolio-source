/**
 * Define the presentation of the homepage.
 * - Assign intro sequences to key blocks
 * - Assign scrollTo behaviors to buttons
 */
document.addEventListener("DOMContentLoaded", (event) => {
  let dur = 1; // base value for animation duration (in seconds)
  let y_delta = 50; // vertical origin of elements
  let pos = "-=.25"; // offset (in seconds) of animation relative to the previous
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


  /** TITLE */
  let trigger = {
    trigger: "main",
    scrub: true,
    start: "top top"
  };
  let intro = gsap.timeline({
    scrollTrigger: trigger
  });
  // intro.add(gsap.from("h1", {duration: dur, y:y_delta, autoAlpha: 0}));
  const pars = gsap.utils.toArray("p.anim");
  pars.forEach(p => {
    intro.add(gsap.from(p, {y:y_delta, autoAlpha: 0}), pos);
  });
});
