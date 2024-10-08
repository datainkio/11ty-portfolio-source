export function blockframe_animation_test() {
    var tl = gsap.timeline({
        id: "blockframe_animation_test"
    })
    tl.add(gsap.from("#Block_01", {opacity: 0}));
    tl.add(gsap.from("#Arrow", {opacity: 0}));
    tl.add(gsap.from("#Block_02", {opacity: 0}));
    tl.add(gsap.from("#Jump", {opacity: 0}));
    tl.add(gsap.from("#Drag", {opacity: 0}));
    tl.add(gsap.from("#Select", {opacity: 0}));
    tl.add(gsap.from("#Destination", {opacity: 0}));
    tl.pause();
    return tl;
}
