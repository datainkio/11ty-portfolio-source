export function paint(article, palette) {
    var text = article.querySelector(".text");
    paint(text, findFarthestColor(palette[0], palette), 1);
    paintImage(
        article.querySelector(".image"),
        palette
    );
    var sidebar = article.querySelector(".sidebar");
    paint(sidebar, findFarthestColor(palette[0], palette), 1);
}
