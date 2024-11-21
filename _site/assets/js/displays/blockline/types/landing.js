import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
import * as Image from "../types/image.js";
export function paint(landing, palette) {
    var text = landing.querySelector(".text");
    paintElement(text, findFarthestColor(palette[0], palette), 1);
    Image.paint(
        landing.querySelector(".image"),
        palette
    );
}