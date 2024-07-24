/**
 * Define the presentation of the homepage.
 * - Assign intro sequences to key blocks
 * - Assign scrollTo behaviors to buttons
 */
document.addEventListener("DOMContentLoaded", (event) => {

  let dur = .25; // base value for animation duration (in seconds)
  let y_delta = 35; // vertical origin of elements
  let pos = "-=50%"; // offset (in seconds) of animation relative to the previous
  // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /** INITIALIZE VIEW */
  const cards = gsap.utils.toArray("a.card.project");
  cards.forEach(card => {
      card.style.opacity = 0;
      card.classList.add("hidden");
  });


  /** WELCOME SEQUENCE */
  let welcome = gsap.timeline();
  welcome.add(gsap.from("h1", {duration: dur, y:y_delta, autoAlpha: 0, ease: "sine.inOut", delay: .5}));
  welcome.add(gsap.from(".abstract", {duration: dur, autoAlpha: 0, ease: "sine.inOut",}), pos);
  // welcome.add(gsap.from('.card.project.featured', {autoAlpha: 0, duration: dur, ease: "sine.inOut"}), pos);
  welcome.add(gsap.from('.navbar-end', {autoAlpha: 0, duration: dur, ease: "sine.inOut"}), pos);

  // CONTROLS
  const btns = gsap.utils.toArray('.navbar-start li');
  btns.forEach(btn => {
    welcome.add(gsap.from(btn, {
      autoAlpha: 0,
      y: y_delta,
      duration: dur
    }), pos);
  });

  // SHOW FEATURED PROJECTS
  const featured = gsap.utils.toArray("a.card.project.featured");
  featured.forEach(card => {
    card.classList.remove("hidden");
    card.classList.add("current");
    welcome.add(gsap.to(card, {opacity: 1, y:-y_delta, duration: dur*.76, ease: "sine.inOut"}), pos);
  });
  applyAlternatingStyles();

  /** 
   * CATEGORY SELECTION
   * Bring a category into view when its menu item is selected
   * */
  const categories = gsap.utils.toArray("a.category");
  categories.forEach(cat => {
    var label = document.getElementById("category_current");
    cat.addEventListener("click", () => {
      // Update button states
      categories.forEach(item => {
        item.classList.remove("active");
        item.classList.remove("btn-active");
        if (item.innerHTML == cat.innerHTML) {
          if(item.classList.contains("btn")) {
            item.classList.add("btn-active");
          } else {
            item.classList.add("active");
          }
        }
        // Update the project previews
        const outro = gsap.timeline({onComplete: clearCards});
        const intro = gsap.timeline({onStart: showSelected, onStartParams: [cat]});
        cards.forEach(card => {
          // clear all visible projects
          if (!card.classList.contains("hidden")) {
            outro.add(gsap.to(card, {opacity: 0, y:y_delta, duration: dur*.75, ease: "sine.inOut"}), pos);
          }
          
          if (card.classList.contains(cat.id)) {
            // display projects belonging to the selected category
            intro.add(gsap.to(card, {opacity: 1, y:-y_delta, duration: dur*.75, ease: "sine.inOut"}), pos);
          }
        })
        const transition = gsap.timeline({});
        // intro.pause();
        transition.add(outro);
        transition.add(intro);
        transition.play();
      })

     // Update the button label with title of the selected category
     label.innerHTML = cat.innerHTML;
    });
  })

  function clearCards() {
    console.log("clearCards");
    cards.forEach((card, index) => {
      card.classList.add("hidden");
      card.classList.remove("current");
      card.classList.remove("even-column");
    })
  }

  function showSelected(cat) {
    let projects = gsap.utils.toArray("." + cat.id);
    console.log("showSelected");
    projects.forEach(project => {
      project.classList.remove("hidden");
      project.classList.add("current");
    });
    applyAlternatingStyles();
  };

  function applyAlternatingStyles() {
    const grid = document.getElementById('projects');
    const cols = window.getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ').length;
    const current = gsap.utils.toArray(".project.current");
    console.log(current.length + " cards in " + cols + " columns");
    current.forEach((card, index) => {
      const colIndex = (index % cols) + 1; // Get the 1-based column index
      if ((cols > 1) && (colIndex % 2 !== 0)) {
        card.classList.remove('even-column');
      } else {
        card.classList.add('even-column');
      }
    });

  }
  window.addEventListener('resize', applyAlternatingStyles);
  let portrait = window.matchMedia("(orientation: portrait)");
  portrait.addEventListener("change", function(e) {
      applyAlternatingStyles();
  })
});
