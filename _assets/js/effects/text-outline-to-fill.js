/**
 * Run the title sequence. Assumes the given text is outlined via text-stroke text-stroke-[1px] 
 * @param {*} id 
 * @returns GSAP timeline
 */
export function text_outline_to_fill(elem) {
        var tl = gsap.timeline({});

        // LETTERS
        var st = new SplitText(elem, { type: "words,chars" });
        var chars = st.chars; //an array of all the divs that wrap each character
        tl.add(gsap.from(chars, {
            duration: 2,
            opacity: 0,
            stagger: 0.1
        }))
        tl.add(gsap.from(chars, {
            duration: SPEED,
            color: "#1A171C00",
            // skewX: 45,
            stagger: 0.1
        }), "<15%");
        // tl.pause();
        return tl;
    }