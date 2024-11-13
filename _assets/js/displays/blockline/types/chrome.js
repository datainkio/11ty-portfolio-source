import { findFarthestColor } from "../../../utils/color.js";
export function paint(chrome, palette, method) {
    // Set Settings.size and scale
    // chrome.setAttribute("transform", `scale(${scale})`);

    // BACKGROUND
    var background = chrome.querySelector(".background");
    method(background, palette[0]);

    // TOOLBAR
    var toolbar = chrome.querySelector(".toolbar");
    
    // background
    var tbg = toolbar.querySelector(".background");
    method(tbg, findFarthestColor(palette[0], palette));
    tbg.setAttribute("opacity", 0.25);
    tbg.setAttribute("style", "mix-blend-mode: hard-light;");

    // dots
    var dots = toolbar.querySelector(".dots");
    method(dots, palette[0]);
}