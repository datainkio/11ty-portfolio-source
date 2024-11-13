import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
export function paint(cart, palette) {
    var rows = cart.querySelectorAll(".rows");
    paintElement(rows, findFarthestColor(palette[0], palette), 0.75);
}