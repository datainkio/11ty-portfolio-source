import { findFarthestColor } from "../../../../utils/color.js";
import { paintElement } from "../../Painter.js";
import * as Image from "./Image.js";
export function paint(cart, palette) {
    var rows = cart.querySelectorAll(".rows");
    paintElement(rows, palette[0]);
}