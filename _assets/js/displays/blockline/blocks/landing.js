export function paint(landing, palette) {
    var text = landing.querySelector(".text");
    paint(text, findFarthestColor(palette[0], palette), 1);
    paintImage(
        landing.querySelector(".image"),
        palette
    );
}