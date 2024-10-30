
/**
 * The purpose of this class is to consolidate all of the funky methods I've created for messing with text
*/
import { TextRadar } from "./text-radar.js";
export function Radar(params) {
    return TextRadar(params);
}

 /* Assumes the given text is outlined via text-stroke text-stroke-[1px] 
 * @param {*} id 
 * @returns GSAP timeline
 */
export function OutlineToFill(params) {
    var tl = gsap.timeline({});
    const elem = document.getElementById(params.id);
    elem.classList.add("text-stroke", "text-stroke-[1px]", "text-transparent", "text-stroke-ink-dark");
    // LETTERS
    var st = new SplitText(elem, { type: "words,chars" });
    var chars = st.chars; //an array of all the divs that wrap each character
    tl.add(gsap.from(chars, {
        duration: 2,
        opacity: 0,
        stagger: 0.1
    }))
    tl.add(gsap.from(chars, {
        duration: params.duration,
        color: "#1A171C00",
        // skewX: 45,
        stagger: 0.1
    }), "<15%");
    // tl.pause();
    return tl;
}