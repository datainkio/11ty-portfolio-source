gsap.registerPlugin(CustomEase, CustomWiggle);

var CONTAINER, SETTINGS, DUPES, SRC;
export function WanderingGel(elem, params) {

    CONTAINER = elem;
    SETTINGS = params;
    SRC = CONTAINER.innerText;
    DUPES = [];

    buildView();
    var tl = gsap.timeline({id: params.id});
    tl.add(moveXY());
    return tl;
};

function buildView() {
    // CONTAINER.innerText = '';
    for (var i = 0; i < SETTINGS.colors.length; i++) {
        var dupe = document.createElement('div');
        dupe.id = "wg-" + i;
        dupe.innerText = SRC;
        dupe.classList.add("wandering-gel", SETTINGS.colors[i]);
        CONTAINER.appendChild(dupe);
        DUPES.push(dupe);
    };
};

function moveXY() {
    var color = DUPES.filter(item => item.classList.contains(SETTINGS.colors[1]));
    var tl = gsap.timeline();
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