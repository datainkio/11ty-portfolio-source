
/**
 * The purpose of this class is to consolidate all of the funky methods I've created for messing with text
*/
import { TextRadar } from "./text-radar.js";
import { TextRoll } from "./text-roll.js";
import { WanderingGel } from "./text-wandering-gel.js";
import { OutlineToFill } from "./text-outline-to-fill.js";

export function radar(params) {
    return TextRadar(params);
}

export function roll(params) {
    return TextRoll(params);
}

export function gel(params) {
    return WanderingGel(params);
}

export function fill(params) {
    return OutlineToFill(params);
}


export function introLines(elem) {
    // var elem = document.getElementById(id);
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

export function fadeInChars(elem) {
    // var elem = document.getElementById(id);
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