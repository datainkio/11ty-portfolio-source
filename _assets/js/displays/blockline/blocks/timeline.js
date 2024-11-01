export function paint(timeline, palette) {
    var chop = timeline.querySelector(".chop");
    var bullets = timeline.querySelector(".bullets");
    var history = timeline.querySelector(".history");
    chop.setAttribute("opacity", 1);
    chop
        .querySelector(".background")
        .setAttribute("fill", findFarthestColor(palette[1], palette));
    chop
        .querySelector(".star")
    paint(bullets, palette[3], 1);
    paint(history, palette[2], 1);
}