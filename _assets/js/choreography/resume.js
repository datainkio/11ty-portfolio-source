const TL = gsap.timeline();

export function animate() {
    registerTimeline(headerAnimation(gsap.utils.toArray("#resume header")[0]));
    registerTimeline(statementAnimation(gsap.utils.toArray("#statement")[0]));
    registerTimeline(practicesAnimation(gsap.utils.toArray("#practice-areas")[0]));
    registerTimeline(philosophyAnimation(gsap.utils.toArray("#philosophy")[0]));
    registerTimeline(avatarAnimation(gsap.utils.toArray("#resume #avatar")[0]));
    registerTimeline(awardsAnimation(gsap.utils.toArray("#awards")[0]));
    return TL;
};

function headerAnimation(elem) {
    const tl = gsap.timeline();
    tl.id = "header";
    return tl;
};

function statementAnimation(elem) {
    const tl = gsap.timeline();
    tl.id = "statement";
    return tl;
};

function practicesAnimation(elem) {
    const tl = gsap.timeline();
    tl.id = "practices";
    return tl;
};

function philosophyAnimation(elem) {
    const tl = gsap.timeline();
    tl.id = "philosophy";
    return tl;
};

function avatarAnimation(elem) {
    const tl = gsap.timeline();
    tl.id = "avatar";
    return tl;
};

function awardsAnimation(elem) {
    const tl = gsap.timeline();
    tl.id = "awards";
    return tl;
};

function registerTimeline(tl) {
    tl.eventCallback("onStart", onStart, [tl.id]);
    tl.eventCallback("onComplete", onComplete, [tl.id]);
    // TL.addLabel(tl.id);
    TL.add(tl, tl.id);
};

function onStart(id) {
    console.log(id + ".onStart");
};
function onUpdate(obj) {
    console.log(obj + ".onUpdate");
};
function onComplete(id) {
    console.log(id + ".onComplete");
};