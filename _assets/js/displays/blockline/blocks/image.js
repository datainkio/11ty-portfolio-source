export function paint(image, palette) {
    var base = findFarthestColor(palette[0], palette);
    var background = image.querySelector(".background"
    );
    paint(background, "#FFFFFF");
    var mountains = image.querySelector(".mountains"
    );
    paint(mountains, base, 0.5);
    var sun = image.querySelector(".sun");
    paint(sun, base, 1);
}