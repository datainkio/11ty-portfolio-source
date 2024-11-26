/**
 * Adds graphic elements mimicking printer proof marks, registration, etc., positioned inside the element.
 */

function createMarkElement(type, styles) {
    const mark = document.createElement('div');
    mark.classList.add(type);
    Object.assign(mark.style, styles);
    return mark;
}

export function addBleed(elem, offset = 0) {
    const bleed = createMarkElement('printmark-bleed', border(offset));
    elem.style.position = 'relative'; // Ensure the element is positioned relatively
    elem.appendChild(bleed);
}

export function addMargins(elem, offset = 0) {
    const bleed = createMarkElement('printmark-margins', border(offset));
    elem.style.position = 'relative'; // Ensure the element is positioned relatively
    elem.appendChild(bleed);
}

function border(offset) {
    return {
        position: 'absolute',
        // border: '1px dashed rgba(255, 0, 0, 0.8)', // Dashed border, 1px thick
        width: `calc(100% - ${2 * offset}px)`,
        height: `calc(100% - ${2 * offset}px)`,
        top: `${offset}px`,
        left: `${offset}px`,
        boxSizing: 'border-box',
        pointerEvents: 'none',
    }
}

export function addTrim(elem, offset = 0) {
    // Define the positions of the corners
    const corners = [
        { side1: 'top', side2: 'left' },
        { side1: 'top', side2: 'right' },
        { side1: 'bottom', side2: 'left' },
        { side1: 'bottom', side2: 'right' },
    ];

    // Add two trim marks (horizontal and vertical) at each corner
    corners.forEach(({ side1, side2 }) => {
        // Horizontal trim mark
        const horizontalMark = createMarkElement('printmark-trim-horiz', {
            position: 'absolute',
            [side1]: `${offset}px`,
            [side2]: side2 === 'left' ? `${offset}px` : 'auto',
            right: side2 === 'right' ? `${offset}px` : 'auto',
        });

        // Vertical trim mark
        const verticalMark = createMarkElement('printmark-trim-vert', {
            position: 'absolute',
            [side1]: side1 === 'top' ? `${offset}px` : 'auto',
            [side2]: `${offset}px`,
            bottom: side1 === 'bottom' ? `${offset}px` : 'auto',
        });

        elem.style.position = 'relative'; // Ensure the element is positioned relatively
        elem.appendChild(horizontalMark);
        elem.appendChild(verticalMark);
    });
}

export function addRegistrationBar(elem, count) {
    const container = createMarkElement("printmark-registration-bar", {});
    addGradientBar(container, count, "printmark-neutrals");
    addRegistration(container);
    addGradientBar(container, count, "printmark-colors");
    elem.appendChild(container);
}


function addRegistration(elem) {
    // const regMark = createMarkElement('printmark-registration', {});
    const ul = document.createElement("ul");
    ul.classList.add("printmark-registration");
    for (var i = 0; i < 5; i++) {
        ul.appendChild(document.createElement('li'));
    }
    elem.appendChild(ul);
}

function addGradientBar(elem, count, className) {
    const gradient = document.createElement('ul');
    gradient.classList.add(className);
    for (var i = 0; i < count; i++) {
        gradient.appendChild(document.createElement('li'));
    }
    elem.appendChild(gradient);
}

export function addStarTarget(elem, size) {
    const starTarget = createMarkElement('star-target', {
        position: 'absolute',
        width: `${size * 2}rem`,
        height: `${size * 2}rem`,
        border: '0.1rem solid black',
        borderRadius: '50%',
        top: `calc(50% - ${size}rem)`,
        left: `calc(50% - ${size}rem)`,
        pointerEvents: 'none',
    });

    const center = createMarkElement('center-dot', {
        position: 'absolute',
        width: '0.2rem',
        height: '0.2rem',
        backgroundColor: 'black',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    });

    starTarget.appendChild(center);
    elem.style.position = 'relative';
    elem.appendChild(starTarget);
}
