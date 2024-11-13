import { findFarthestColor } from "../../../utils/color.js";
import { paintElement } from "../painter.js";
export function paint(article, palette) {
    var text = article.querySelector(".text");
    paintElement(text, findFarthestColor(palette[0], palette), 1);
    paintElement(
        article.querySelector(".image"),
        palette
    );
    var sidebar = article.querySelector(".sidebar");
     paintElement(sidebar, findFarthestColor(palette[0], palette), 1);
}
