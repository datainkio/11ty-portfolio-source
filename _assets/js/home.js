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
  intro.add(gsap.from("#title p", {duration: dur, y:y_delta, autoAlpha: 0}), pos);
  intro.add(gsap.from("#title .hacky", {duration: dur, y:y_delta, autoAlpha: 0}), pos);

  const more_work = document.getElementById("more_work");

  more_work.addEventListener("click", () => {
    gsap.to(window, {duration: 1, scrollTo:{y:"#work"}});
  });

  /** WORK */
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
  gsap.from('#recognition figcaption', {
    scrollTrigger: {
      trigger: '#recognition figcaption',
      start: 'bottom bottom'
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
  gsap.from('#metrics figcaption', {
    scrollTrigger: {
      trigger: '#metrics figcaption',
      start: 'bottom bottom'
    },
    duration: dur, 
    y:y_delta, 
    autoAlpha: 0
  });
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
      start: 'bottom bottom'
    },
    autoAlpha: 0,
    y: y_delta,
    duration: dur
  });
  const lessons = gsap.utils.toArray('#lessons_learned .card');
  lessons.forEach(lesson => {
    gsap.from(lesson, {
      scrollTrigger: {
        trigger: lesson,
        start: 'center bottom'
      }, 
    autoAlpha: 0,
  y: y_delta})
  })
});
