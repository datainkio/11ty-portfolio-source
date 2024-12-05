
export function paint(elem) {
    const image = elem.querySelector(".Image");
    const sun = image.querySelector(".sun");
    const sky = image.querySelector(".sky");
    const mountains = image.querySelector(".mountains");
    const breadcrumb =elem.querySelector(".Breadcrumb");
    const header = elem.querySelector(".Header");
    const intro = elem.querySelector(".Introduction");
    const chrome = elem.querySelector(".Chrome");

    sun.classList.add("text-accent");
    mountains.classList.add("text-accent");
    chrome.classList.add("text-secondary");
    console.log(sun);
}
