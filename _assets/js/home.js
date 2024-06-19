document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  // Hook up all the animated bits
  let tl = gsap.timeline({
    trigger: "#recognition",
    start: "top top",
    end: "+=500",
    scrub: 1,
    snap: {
      snapTo: "labels",
      duration: { min: 0.2, max: 3 },
      delay: 0.2,
      ease: "power1.inOut",
    },
  });

  tl.addLabel("start")
    .from("a", { scale: 0.3, autoAlpha: 0 })
    .addLabel("color")
    .from("a", { backgroundColor: "#28a92b" })
    .to("a", { rotation: 360 })
    .addLabel("end");
});
