import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
export function paint(contact, palette) {
    var background = contact.querySelector(".background");
    var fields = contact.querySelector(".fields");
    var title = contact.querySelector(".title");
    var button = contact.querySelector(".submit");
    paintElement(background, findFarthestColor(palette[0], palette));
    paintElement(fields, palette[1], 0.75);
    paintElement(title, palette[1]);
    paintElement(button, palette[1]);
}