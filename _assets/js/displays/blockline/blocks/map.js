export function paint(map, palette) {
    var background = map.querySelector(".background");
    var streets = map.querySelector(".streets");
    var pin = map.querySelector(".pin");
    var text = map.querySelector(".text");
    paint(background, palette[0]);
    paint(streets, palette[1]);
    paint(pin, palette[3], 1);
    paint(text, palette[1]);
    streets.setAttribute("opacity", 1);
}