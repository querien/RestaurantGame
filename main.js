let dropzones = document.querySelector(".dropZone");

let el = null;

let dragItems = document.querySelectorAll(".draggable");

// this allows the items to be dragged and cloned
dragItems.forEach((element) => {
  element.addEventListener("dragstart", (event) => {
    el = event.target.cloneNode(true);
  });
});

//drop item
dropzones.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropzones.addEventListener("dragenter", (event) => {
  if (event.target.classList.contains("dropZone")) {
  }
});

dropzones.addEventListener("drop", (event) => {
  event.preventDefault();
  event.target.appendChild(el);
  el = null;
});
