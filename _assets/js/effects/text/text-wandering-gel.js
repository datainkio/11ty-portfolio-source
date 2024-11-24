gsap.registerPlugin(CustomEase, CustomWiggle);

var CONTAINER, SETTINGS, DUPES, SRC;
export function WanderingGel(elem, params) {
    console.log("WanderingGel for " + elem);
    CONTAINER = elem;
    SETTINGS = params;
    SRC = CONTAINER.innerText;
    DUPES = [];

    buildView();
    return moveXY(params.id);
};

function buildView() {
    // CONTAINER.innerText = '';
    // For each color value, create a duplicate of the text
    for (var i = 0; i < SETTINGS.colors.length; i++) {
        var dupe = document.createElement('div');
        dupe.id = "wg-" + i;
        // dupe.innerText = SRC;
        dupe.classList.add(...CONTAINER.classList);
        dupe.classList.replace("text-transparent", SETTINGS.colors[i]);
        dupe.classList.add("absolute");
        CONTAINER.appendChild(dupe);
        DUPES.push(dupe);
    };
};

function moveXY(id) {
    console.log("moveXY");
    var color = DUPES.filter(item => item.classList.contains(SETTINGS.colors[1]));
    var tl = gsap.timeline({id: id});
    tl.add(gsap.from(DUPES, {autoAlpha: 0}));
    tl.add (gsap.to(color, {
        duration: SETTINGS.duration,
        // autoAlpha: 1,
        x: "+=" + SETTINGS.w * SETTINGS.range,
        y: "+=" + SETTINGS.h * SETTINGS.range,
        stagger: .1,
    }));
    return tl;
};