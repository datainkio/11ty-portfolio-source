import BlockLine from '/assets/js/displays/blockline/BlockLine.js';

export default class StageManager {
  constructor(container) {
    this._container = container;

    // Create the elem that will contain all the things
    this._view = document.createElement("div");
    this._view.setAttribute("aria-hidden", true);
    this._view.classList.add("absolute","top-0","w-full","h-dvh","col-span-full");
    this._container.prepend(this._view); // Assume that we want this under everything else

    // Create the acetate overlay
    this._acetate = document.createElement("div");
    this._acetate.classList.add("bg-gradient-to-t","from-primary-950","to-primary-800","w-full", "h-dvh", "mix-blend-multiply");
    this._view.appendChild(this._acetate);

  }

  get acetate() {
    return this._acetate;
  };

  set blockline(elem) {
    // Apply blocklines to a given container
    this._blockline = new BlockLine(elem, 
    {
      type: "background", // "element" or "background" depending on purpose
      id: "BlockframeLibrary",
      colCount: 24,  // Number of buildings * 2
      rowCount: 8,
      size: 100, // WTF is this for now other than not being 0?
      angle: 12,
      brightness: 0.25,
      opacity: 1,
      types: ["Article","Calendar","Cart","Contact","Landing","Map","Timeline"]
    });
  };

  get blockline() {
    return this._blockline;
  }

  set video(url) {
    if (typeof url === 'string' && url.length > 0) {

        // Create the video element
        this._video = document.createElement("video");
        this._video.setAttribute("autoplay", true);
        this._video.setAttribute("loop", true);
        this._video.setAttribute("muted", true);
        this._video.setAttribute("playsinline", true);
        this._video.setAttribute("aria-hidden", "true"); // Mark as decorative
        this._video.id = "bgVideo";
        this._video.classList.add("fixed", "inset-0", "w-full", "h-full", "object-cover");  
        
        // Add the video sources
        const sourceMP4 = document.createElement("source");
        sourceMP4.src = url;
        sourceMP4.type = "video/mp4";

        this._video.appendChild(sourceMP4);
        this._view.prepend(this._video);

    } else {
      console.error('Invalid video URL');
    }
  };

  get video() {
    return this._video;
  };

}

