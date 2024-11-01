export function paint(contact, palette) {
    var background = contact.querySelector(".background");
    var fields = contact.querySelector(".fields");
    var title = contact.querySelector(".title");
    var button = contact.querySelector(".submit");
    paint(background, findFarthestColor(palette[0], palette));
    paint(fields, palette[1], 0.75);
    paint(title, palette[1]);
    paint(button, palette[1]);
}