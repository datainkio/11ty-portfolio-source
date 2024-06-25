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
  let intro = gsap.timeline({});
  intro.add(gsap.from("h1", {duration: dur, y:y_delta, autoAlpha: 0}));
  const pars = gsap.utils.toArray('#introduction p');
  pars.forEach(stat => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'bottom bottom'
      },
      autoAlpha: 0,
      y: y_delta,
      duration: dur
    })
  });

  /** PROJECT CATEGORIES */
  const categories = gsap.utils.toArray("a.category");
  categories.forEach(cat => {
    cat.addEventListener("click", () => {
      console.log(cat.id);
      gsap.to(window, {duration: 1, scrollTo:{y:cat.id, offsetY: 72}});
    });
  })



  // CATEGORY TITLES
  const captions = gsap.utils.toArray("figcaption");
  captions.forEach(caption => {
    gsap.from(caption, {
      scrollTrigger: {
        trigger: caption,
        start: 'bottom bottom'
      },
      autoAlpha: 0,
      y:y_delta,
      duration: dur
    })
  })

  // CATEGORY PROJECTS
  const cards = gsap.utils.toArray(".card");
  cards.forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'center bottom'
      },
      autoAlpha: 0,
      y:y_delta,
      duration: dur
    })
  })
});
