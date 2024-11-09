gsap.registerPlugin(CustomEase, CustomWiggle, SplitText);

var CONTAINER, SETTINGS, DUPES;
export function WanderingGel(id, params) {
    console.log("here we are");
    CONTAINER = document.getElementById(id);
    SETTINGS = params;
    DUPES = [];
    buildView();

    // gsap.set(DUPES, {autoAlpha: 0});
    var tl = gsap.timeline({});
    tl.to(DUPES, {
        duration: SETTINGS.duration,
        autoAlpha: 1,
        x: "+=" + SETTINGS.w * SETTINGS.range,
        y: "+=" + SETTINGS.h * SETTINGS.range,
        stagger: .1,
    });
    tl.id;
    return tl;
};

function buildView() {
    // Style the source text with the first color
    CONTAINER.classList.add("wandering-gel", SETTINGS.colors[0]);
    // For every other color, create a new instance of the text
    var dupe;
    for (var i = 1; i < SETTINGS.colors.length; i++) {
        dupe = document.createElement('div');
        dupe.id = "wg-" + i;
        dupe.innerText = CONTAINER.innerText;
        dupe.classList.add("wandering-gel", "dupe", SETTINGS.colors[i]);
        CONTAINER.appendChild(dupe);
        DUPES.push(dupe);
    };
};