export function paint(chrome, palette) {
    // Set Settings.size and scale
    // chrome.setAttribute("transform", `scale(${scale})`);

    // BACKGROUND
    var background = chrome.querySelector(".background");
    paint(background, palette[0]);

    // TOOLBAR
    var toolbar = chrome.querySelector(".toolbar");
    
    // background
    var tbg = toolbar.querySelector(".background");
    paint(tbg, findFarthestColor(palette[0], palette));
    tbg.setAttribute("opacity", 0.25);
    tbg.setAttribute("style", "mix-blend-mode: hard-light;");

    // dots
    var dots = toolbar.querySelector(".dots");
    paint(dots, palette[0]);
}