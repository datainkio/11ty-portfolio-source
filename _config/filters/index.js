module.exports = function(eleventyConfig) {
    require('./array.js')(eleventyConfig);
    require('./date.js')(eleventyConfig);
    require('./dom.js')(eleventyConfig);
    require('./image.js')(eleventyConfig);
    require('./string.js')(eleventyConfig);
}