import { findFarthestColor } from "../../../../utils/color.js";
import { paintElement } from "../../Painter.js";
export function paint(image, palette) {
    // console.log("Image.paint");
    var base = findFarthestColor(palette[0], palette);
    var background = image.querySelector(".background"
    );
    paintElement(background, "#FFFFFF80");
    var mountains = image.querySelector(".mountains"
    );
    paintElement(mountains, base, 0.5);
    var sun = image.querySelector(".sun");
    paintElement(sun, base, 1);
}