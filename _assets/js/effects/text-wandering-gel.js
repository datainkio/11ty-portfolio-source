import { trace } from "/assets/js/utils/trace.js";
export function wandering_gel(id) {
    const CLASS_NAME = "wandering-gel";
    const COLORS = ["text-[#06608D]", "text-[#EB5E28]", "text-[#FBC30B]"];
    const CONTAINER = document.getElementById(id);
    const SRC = CONTAINER.innerText;
    const DUPE_COUNT = 3;
    var span;

    CONTAINER.innerText = '';
    CONTAINER.classList.add("relative");
  
    for (var i = 0; i < DUPE_COUNT; i++) {
        span = CONTAINER.appendChild(document.createElement('span'));
        span.classList.add(CLASS_NAME, COLORS[i]);
        span.innerText = SRC;
    }
}