
/**
 * The purpose of this class is to consolidate all of the funky methods I've created for messing with text
*/
import { TextRadar } from "./text-radar.js";
import { TextRoll } from "./text-roll.js";
import { WanderingGel } from "./text-wandering-gel.js";
import { OutlineToFill } from "./text-outline-to-fill.js";
import { SeventiesNewsShow } from "./text-seventies.js";

export function radar(params) {
    return TextRadar(params);
}

export function roll(container, params) {
    return TextRoll(container, params);
}

export function gel(container, params) {
    return WanderingGel(container, params);
}

export function fill(params) {
    return OutlineToFill(params);
}

export function seventies(container, params) {
    return SeventiesNewsShow(container, params);
}


export function lines(id) {
    var pars = document.getElementById(id).querySelectorAll("p");
    var st = new SplitText(pars, { type: "chars"});
    var tl = gsap.timeline();
    tl.id = id;
    tl.from(st.lines, {
        duration: 2,
        opacity: 0,
        y: 25,
        stagger: 0.1,
    })
    return tl;
}

export function fadeInChars(id) {
    var elem = document.getElementById(id);
    var tl = gsap.timeline({});
    tl.id = "fadeInChars";

    // LETTERS
    var st = new SplitText(elem, { 
        type: "chars",
    });
    tl.from(st.chars, {
        duration: 2,
        opacity: 0,
        stagger: 0.1,
    });
    return tl;
};

export function fadeOutChars(id) {
    var elem = document.getElementById(id);
    var tl = gsap.timeline({});
    tl.id = "fadeOutChars";
    // LETTERS
    var st = new SplitText(elem, { type: "chars" });
    tl.to(st.chars, {
        duration: 2,
        opacity: 0,
        stagger: 0.1
    });
    return tl;
}