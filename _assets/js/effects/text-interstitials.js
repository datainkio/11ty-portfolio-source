
export function fadeInAndUp(id) {
    var elem = document.getElementById(id);
    var tl = gsap.timeline();
    tl.fromTo(elem, {y: 50, opacity: 0}, {duration: 1.25, y:0, opacity: 1, ease: "power1.inOut"});
    return tl;
}

export function introLines(id) {
    var elem = document.getElementById(id);
    var st = new SplitText(elem, { type: "lines"});
    var tl = gsap.timeline();
    tl.from(st.lines, {
        duration: 2,
        opacity: 0,
        y: 25,
        stagger: 0.1
    })
    return tl;
}

export function fadeInChars(id) {
    var elem = document.getElementById(id);
    var tl = gsap.timeline();

    // LETTERS
    var st = new SplitText(elem, { type: "chars" });
    tl.to(gsap.from(st.chars, {
        duration: 2,
        opacity: 0,
        stagger: 0.1
    }))
    tl.add(gsap.from(st.chars, {
        duration: SPEED,
        color: "#1A171C00",
        // skewX: 45,
        stagger: 0.1
    }));

    return tl;
}