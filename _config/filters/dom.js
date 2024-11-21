module.exports = function(eleventyConfig) {
    /**
   * Insert referenced content into text.
   * str: the string containing references to external content; uses format {type, id}
   * ds: the datasource containing the referenced content; yes, this is far from ideal and
   * should probably access the datasource directly but I can't figure out how to do that
   * because promises.
   */
  eleventyConfig.addFilter("expand", function (str, ds) {
    // console.log(str);
    var expanded = str;
    if (str) {
      var results = str.matchAll("{(.*?)}");
      for (result of results) {
        var item = result[1].split(",");
        switch (item[0]) {
          case "image":
            // Let's find ourselves an image...
            var image = ds.find((img) => img["id"] == item[1].trim());
            expanded = expanded.replace("{" + result[1] + "}", figure(image));
            break;
          default:
          // do nothing
        }
      }
    }
    return expanded;
  });
}