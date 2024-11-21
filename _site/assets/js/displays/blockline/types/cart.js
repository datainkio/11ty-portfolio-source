import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
import * as Image from "./image.js";
export function paint(cart, palette) {
    var rows = cart.querySelectorAll(".rows");
    paintElement(rows, palette[0]);
}