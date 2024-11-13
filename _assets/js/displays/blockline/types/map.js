import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
export function paint(map, palette) {
    var background = map.querySelector(".background");
    var streets = map.querySelector(".streets");
    var pin = map.querySelector(".pin");
    var text = map.querySelector(".text");
    paintElement(background, palette[0]);
    paintElement(streets, palette[1]);
    paintElement(pin, palette[3], 1);
    paintElement(text, palette[1]);
    streets.setAttribute("opacity", 1);
}