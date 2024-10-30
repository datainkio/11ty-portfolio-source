/**
 * Run the title sequence. Assumes the given text is outlined via text-stroke text-stroke-[1px] 
 * @param {*} id 
 * @returns GSAP timeline
 * 
 */
export function OutlineToFill(params) {
    var tl = gsap.timeline({});
    var container = document.getElementById(params.container);
    container.classList.add("text-outline");
    // LETTERS
    var st = new SplitText(container, { type: "words,chars" });
    var chars = st.chars; //an array of all the divs that wrap each character
    tl.add(gsap.from(chars, {
        duration: params.duration,
        opacity: 0,
        stagger: params.stagger
    }))
    tl.add(gsap.from(chars, {
        duration: params.duration,
        color: params.color, // "#1A171C00",
        // skewX: 45,
        stagger: params.stagger
    }), params.overlap);
    // tl.pause();
    return tl;
}