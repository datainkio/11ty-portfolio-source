export function ARC(ARCParams, parent) {
    var tl = gsap.timeline({
        scrollTrigger: ARCParams.scrollTrigger,
        onStart: parent.onStart,
        onStartParams: ["anim"],
        onComplete: parent.onComplete,
        onCompleteParams: ["anim"]
    })
    tl.from("#Block_01", {duration: ARCParams.duration, opacity: 0});
    tl.from("#Arrow", {duration: ARCParams.duration, opacity: 0}, ARCParams.overlap);
    tl.from("#Block_02", {duration: ARCParams.duration, opacity: 0}, ARCParams.overlap);
    tl.from("#Jump", {duration: ARCParams.duration, opacity: 0}, ARCParams.overlap);
    tl.from("#Drag", {duration: ARCParams.duration, opacity: 0}, ARCParams.overlap);
    tl.from("#Select", {duration: ARCParams.duration, opacity: 0}, ARCParams.overlap);
    tl.from("#Destination", {duration: ARCParams.duration, opacity: 0}, ARCParams.overlap);
    return tl;
}