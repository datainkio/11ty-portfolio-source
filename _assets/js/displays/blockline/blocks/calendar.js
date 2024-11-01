export function paint(calendar, palette) {
    var controls = calendar.querySelector(".controls");
    var days = calendar.querySelector(".days");
    var background = calendar.querySelector(".background");
    background.setAttribute("opacity", 0.5);
    paint(controls, palette[0]);
    paint(days, palette[1]);
}