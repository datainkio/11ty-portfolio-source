/** @format */

document.addEventListener("DOMContentLoaded", (event) => {

  let dur = .25; // base value for animation duration (in seconds)
  let y_delta = 35; // vertical origin of elements
  let pos = "-=50%"; // offset (in seconds) of animation relative to the previous

	gsap.registerPlugin(ScrollTrigger);

	gsap.set(".org", {opacity: 0});
	const organizations = gsap.timeline({		
		scrollTrigger: {
			trigger: "#organizations",
			start: "top center",
		}
	});
	
	organizations.add(
		gsap.to(".org", {
			duration: 2,
			opacity: 1,
			ease: "power1.inOut",
			stagger: {
				grid: [9,5],
				from: 0,
				amount: 1.5
			}
		})
	);
	
});
