import * as Article from "./types/species/Article.js";
export default class Blockframes {
  constructor(url) {
    this.url = url;           // URL of the SVG file to load
    this.svgElement = null;   // Will hold the loaded SVG element
  }

  // Method to load the SVG file
  async load() {
    try {
      // Fetch the SVG file as text
      const response = await fetch(this.url);

      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG. Status: ${response.status} ${response.statusText}`);
      }

      // Get the response text (the SVG content)
      const svgText = await response.text();

      // Parse the SVG text into an SVG document
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

      // Extract the SVG element from the document
      this.svgElement = svgDoc.documentElement;

      // Check if the parsed content is a valid SVG element
      if (this.svgElement.nodeName !== 'svg') {
        throw new Error("The fetched content is not a valid SVG element.");
      }

      // Return the SVG element for potential further use
      return this.svgElement;
    } catch (error) {
      // Log the error with more context
      console.error(`Error loading SVG from ${this.url}:`, error);

      // Rethrow the error to let the caller handle it
      throw error;
    }
  }

 makeResponsive() {
    // Remove any width and height attributes on the SVG
    this.svgElement.removeAttribute('width');
    this.svgElement.removeAttribute('height');

    // Set the viewBox attribute if not already set
    if (!this.svgElement.hasAttribute('viewBox')) {
      const width = this.svgElement.getAttribute('width') || '100';
      const height = this.svgElement.getAttribute('height') || '100';
      this.svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    // Ensure preserveAspectRatio is set
    this.svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Add Tailwind CSS classes to the SVG element
    this.svgElement.classList.add('w-full', 'h-full');
  }


  insertInto(parentSelector) {
    if (this.svgElement) {
      const parent = document.querySelector(parentSelector);

      if (parent) {
        // Append the SVG element to the parent
        parent.appendChild(this.svgElement.cloneNode(true));
      } else {
        const errorMessage = `Parent element not found: ${parentSelector}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
    } else {
      const errorMessage = "SVG element is not loaded yet. Call load() first.";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  getBlock(type) {
    return this.svgElement.querySelector(type);
  }

  paintBlock(type, palette) {
    const elem = this.getBlock(type);
    switch (type) {
        case ".Article":
            Article.paint(elem, palette);
    }
    
    
  }
}
