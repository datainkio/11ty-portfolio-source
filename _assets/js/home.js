document.addEventListener("DOMContentLoaded", (event) => {
  let dur = 1; // base value for animation duration (in seconds)
  let y_delta = 50; // vertical origin of elements
  let pos = "-=.75"; // offset (in seconds) of animation relative to the previous
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /** INTRO */
  let intro = gsap.timeline({
    scrollTrigger: {
      trigger: '#intro h2',
      start: 'top center',
    }
  });
  intro.from('#intro h2', {duration: dur, y: y_delta, autoAlpha: 0})
  .from('#intro p', {duration: dur, y: y_delta, autoAlpha: 0}, pos)

  /** ORGANIZATIONS */
  let organizations = gsap.timeline({
    scrollTrigger: {
      trigger: '#organizations h2',
      start: 'top center',
    }
  });
  organizations.from('#organizations h2', {duration: dur, y:y_delta, autoAlpha: 0})
  .from("#organizations figure", {duration: dur, y:y_delta, autoAlpha: 0}, pos)

  /** WORK */
  let work = gsap.timeline({
    scrollTrigger: {
      trigger: '#work h2',
      start: 'top center'
    }
  });
  work.from('#work h2', {duration: dur, y:y_delta, autoAlpha: 0});
  const projects = gsap.utils.toArray('#work figure .card');
  projects.forEach(p => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        start: 'top center'
      }, 
    autoAlpha: 0,
  y: y_delta})
  })

  /** RECOGNITION */
  let recognition = gsap.timeline({
    scrollTrigger: {
      trigger: '#recognition figcaption',
      start: 'top center'
    }
  });
  recognition.from('#recognition figcaption', {duration: dur, y:y_delta, autoAlpha: 0});
  const awards = gsap.utils.toArray('#recognition picture');
  awards.forEach(p => {
    recognition.add(gsap.from(p, {autoAlpha: 0, duration: dur*.1}));
  })

  /** METRICS */
  gsap.from('#metrics figcaption', {
    scrollTrigger: {
      trigger: '#metrics figcaption',
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
        start: 'top center'
      },
      autoAlpha: 0,
      y: y_delta,
      duration: dur
    })
  })

  /** LESSONS LEARNED */
  gsap.from('#lessons_learned h2', {
    scrollTrigger: {
      trigger: '#lessons_learned h2',
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
        trigger: lesson,
        start: 'top center'
      }, 
    autoAlpha: 0,
  y: y_delta})
  })
});
