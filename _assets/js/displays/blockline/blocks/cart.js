export function paint(cart, palette) {
    var rows = cart.querySelectorAll(".rows");
    paint(rows, findFarthestColor(palette[0], palette), 0.75);
}