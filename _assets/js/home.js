/**
 * Define the presentation of the homepage.
 * - Assign intro sequences to key blocks
 */
document.addEventListener("DOMContentLoaded", (event) => {
  let dur = 1; // base value for animation duration (in seconds)
  let y_delta = 50; // vertical origin of elements
  let pos = "-=.75"; // offset (in seconds) of animation relative to the previous
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /** TITLE */
  let intro = gsap.timeline({

  });
  intro.add(gsap.from("h1", {duration: dur, y:y_delta, autoAlpha: 0}));
  const pars = gsap.utils.toArray("#title p");
  pars.forEach(p => {
    intro.add(gsap.from(p, {duration: dur, y:y_delta, autoAlpha: 0}), pos);
  })


  const projects = gsap.utils.toArray('#work .card');
  projects.forEach(p => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        start: 'center bottom'
      }, 
    autoAlpha: 0,
  y: y_delta})
  })

  /** RECOGNITION */
  gsap.from('#impact h2', {
    scrollTrigger: {
      trigger: '#impact h2',
      start: 'top center'
    },
    duration: dur, 
    y:y_delta, 
    autoAlpha: 0
  });

  let recognition = gsap.timeline({
    scrollTrigger: {
      trigger: '#recognition',
      start: 'bottom bottom'
    }
  });
  const awards = gsap.utils.toArray('#recognition picture');
  awards.forEach(p => {
    recognition.add(gsap.from(p, {autoAlpha: 0, duration: dur*.1}));
  })

  /** METRICS */
  gsap.from('#metrics', {
    scrollTrigger: {
      trigger: '#metrics',
      start: 'top center'
    },
    autoAlpha: 0,
    y: y_delta,
    duration: dur
  })
  const metrics = gsap.utils.toArray('#metrics .stat');
  metrics.forEach(stat => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'bottom bottom'
      },
      autoAlpha: 0,
      y: y_delta,
      duration: dur
    })
  })

  /** LESSONS LEARNED */
  gsap.from('#lessons_learned figcaption', {
    scrollTrigger: {
      trigger: '#lessons_learned figcaption',
      start: 'top center'
    },
    autoAlpha: 0,
    y: y_delta,
    duration: dur
  });
  const lessons = gsap.utils.toArray('#lessons_learned figure a');
  lessons.forEach(lesson => {
    gsap.from(lesson, {
      scrollTrigger: {
        trigger: "#lessons_learned figcaption",
        start: 'top center'
      }, 
    autoAlpha: 0,
  y: y_delta})
  })
});
