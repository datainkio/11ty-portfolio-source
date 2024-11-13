import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
export function paint(landing, palette) {
    var text = landing.querySelector(".text");
    paintElement(text, findFarthestColor(palette[0], palette), 1);
    paintElement(
        landing.querySelector(".image"),
        palette
    );
}