gsap.registerPlugin(CustomEase, CustomWiggle) 
import * as MathUtils from "/assets/js/utils/math.js";
var CONTAINER, SETTINGS, SRC, DUPES;
export function SeventiesNewsShow(id, params) {
    CONTAINER = document.getElementById(id);
    SETTINGS = params;
    SRC = CONTAINER.innerText;
    DUPES = [];
    buildView();
    // gsap.set(DUPES, {autoAlpha: 0});
    var tl = gsap.timeline();
    tl.add(moveRot());
    tl.add(moveXY(), ">");
    tl.add(wiggle(), ">");
    tl.id;
    return tl;
};

function buildView() {
    // Style the source text with the first color
    ///CONTAINER.classList.add("wandering-gel", SETTINGS.colors[0]);
    // Hide the source text
    CONTAINER.innerHTML = `<span class="block invisible">${CONTAINER.innerText}</span>`;
    // For every other color, create a new instance of the text

    for (var i = 0; i < 6; i++) {
        var dupe = document.createElement('div');
        dupe.id = "wg-" + i;
        dupe.innerText = SRC;
        dupe.classList.add("wandering-gel", "dupe", "origin-right",  SETTINGS.colors[1]);
        CONTAINER.appendChild(dupe);
        DUPES.push(dupe);
    };

    for (var i = 0; i < 6; i++) {
        var dupe = document.createElement('div');
        dupe.id = "wg-" + i;
        dupe.innerText = SRC;
        dupe.classList.add("wandering-gel", "dupe", "origin-left", SETTINGS.colors[0]);
        CONTAINER.appendChild(dupe);
        DUPES.push(dupe);
    };
};

function moveRot() {
    var color0 = DUPES.filter(item => item.classList.contains("origin-right"));
    var color1 = DUPES.filter(item => item.classList.contains("origin-left"));
    gsap.set(color0,{autoAlpha: 0, rotate: 90});
    gsap.set(color1,{autoAlpha: 0, rotate: 90});
    var interleaved = color0.map((item, index) => [item, color1[index]]).flat();
    return gsap.to(interleaved, {
        duration: SETTINGS.duration,
        autoAlpha: .8,
        rotate: 0,
        stagger: {
            // wrap advanced options in an object
            each: 0.1,
            ease: 'sine.in',
        },
        ease: "sine.in"
    }, "<25%");
};

function moveXY() {
    var color = DUPES.filter(item => item.classList.contains("origin-right"));
    return gsap.to(color, {
        duration: SETTINGS.duration,
        // autoAlpha: 1,
        x: "+=" + SETTINGS.w * SETTINGS.range,
        y: "+=" + SETTINGS.h * SETTINGS.range,
        stagger: .1,
    });
}

function wiggle() {
    // Create a Brownian motion wiggle configuration
    CustomWiggle.create("brownianWiggle", {
        wiggles: 100,      // High number of wiggles to simulate randomness
        type: "random",    // Random type to make motion unpredictable
        amplitude: 5       // Small amplitude for subtle, small movements
    });
    return gsap.timeline({    }).to(DUPES, {repeat: -1, repeatRefresh: true, duration: 5, x: "*=" + "random(-2, 2)", ease: "textWiggle" })
    .to(DUPES, {repeat: -1, repeatRefresh: true, duration: 5, y: "*=" + "random(-2, 2)", ease: "textWiggle"  }, "<")
}