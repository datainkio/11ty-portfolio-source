export function paint(elem, theme) {

    console.log(theme);
    
    const image = elem.querySelector(".Image");
    const sun = image.querySelector(".sun");
    const sky = image.querySelector(".sky");
    const mountains = image.querySelector(".mountains");
    const breadcrumb =elem.querySelector(".Breadcrumb");
    const header = elem.querySelector(".Header");
    const intro = elem.querySelector(".Introduction");
    const chrome = elem.querySelector(".Chrome");

    chrome.setAttribute("stroke", theme.getColor("primary").dark);
    chrome.setAttribute("stroke-width", 10);
    image.setAttribute("stroke", theme.getColor("primary").dark);
    image.setAttribute("stroke-width", 10);

    mountains.classList.add("text-accent");
    chrome.classList.add("text-secondary");
}
