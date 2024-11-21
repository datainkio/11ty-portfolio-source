import BlockLine from '/assets/js/displays/blockline/BlockLine.js';

export default class StageManager {
  constructor(container) {
    this._container = container;

    let v = this.view;

    this._container.prepend(v); // Assume that we want this under everything else
    console.log(v);
  }

  get view() {
    if (document.getElementById("stage-manager")) {
      // all good. send it.
      return document.getElementById("stage-manager")
    } else {
      // Create the elem that will contain all the things and place it at the very bottom of the z stack
      var v = document.createElement("div");
      v.setAttribute("aria-hidden", true);
      v.id = "stage-manager";
      v.classList.add("absolute","top-0","w-full","h-dvh","col-span-full");
      return v;
    }
    ;
  }

  /**
   * Add layers of color to the stage
   * Important: Make sure to explicitly state the generated colors somewhere (e.g. Design) so that Tailwind
   * knows what to do.
   */
  set gels(colors) {
    colors.forEach(color => {
      var a = document.createElement("div");
      a.id = color.id;
      a.classList.add("gel", "bg-gradient-to-t","from-" + color.from,"to-" + color.to,"w-full", "h-dvh", "mix-blend-multiply");
      this.view.appendChild(a);
    })
  }

  get gels() {
    return document.getElementsByClassName("gel");
  }

  getGel(id) {
    return document.getElementById(id);
  }

  get blue() {
    return this._blue;
  };

  get yellow() {
    return this._yellow;
  }

  get red() {
    return this._red;
  }

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
    this.videos = [url];
  }

  set videos(urls) {
    urls.forEach(src => {
        // Create the video element
        var video = document.createElement("video");
        video.setAttribute("autoplay", true);
        video.setAttribute("loop", true);
        video.setAttribute("muted", true);
        video.setAttribute("playsinline", true);
        video.setAttribute("aria-hidden", "true"); // Mark as decorative
        video.id = "bgVideo";
        video.classList.add("fixed", "inset-0", "w-full", "h-full", "object-cover");  
        
        // Add the video sources
        const sourceMP4 = document.createElement("source");
        sourceMP4.src = src;
        sourceMP4.type = "video/mp4";

        video.appendChild(sourceMP4);
        this.view.prepend(video);
    })
  };

  get videos() {
    return this._videos;
  };

}

