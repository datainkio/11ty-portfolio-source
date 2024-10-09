export function textRadar(id) {
    const tl = gsap.timeline();
    const DUPLICATES = 6;
    const DUR = 1;
    const Y_DELTA = 6;
    try {
        // Start by duplicating the element
        const source = document.getElementById(id);
        const originalText = source.textContent;
        source.textContent = '';
        for (let i = 0; i < DUPLICATES; i++) {
            // Duplicate the element
            const dupe = document.createElement("span");
            dupe.id = id + "_" + i;
            dupe.textContent = originalText;
            dupe.classList.add("text-radar-dupe");
            source.appendChild(dupe);
        }

    } catch(e) {
        console.log(e);
    }
    return tl;
};