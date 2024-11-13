import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
export function paint(calendar, palette) {
    var controls = calendar.querySelector(".controls");
    var days = calendar.querySelector(".days");
    var background = calendar.querySelector(".background");
    background.setAttribute("opacity", 0.5);
    paintElement(controls, palette[0]);
    paintElement(days, palette[1]);
}