let dropzone = document.querySelector(".dropZone");
let randomizedOrder = document.querySelectorAll(".randomItem");
let el = null;
let dragItems = document.querySelectorAll(".draggable");

// this allows the items to be dragged and cloned
dragItems.forEach((element) => {
  element.addEventListener("dragstart", (event) => {
    el = event.target.cloneNode(true);
  });
});

//DROP ITEM
dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropzone.addEventListener("dragenter", (event) => {
  if (event.target.classList.contains("dropZone")) {
  }
});

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  event.target.appendChild(el);
  el.addEventListener("click", (event) => dropzone.removeChild(event.target));
  el.classList.add("added");
  el.classList.remove("draggable");
  el = null;
});

// RANDOM ORDER GENERATOR
let startGame = document.querySelector(".startGame");
let itemArray = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
  "item7",
  "item8",
  "item9",
  "item10",
];

startGame.addEventListener("click", (event) => {
  randomizeOrder();
});

let randomizedArr = [];

function randomizeOrder() {
  randomizedOrder.forEach((element) => {
    let randomItem = Math.floor(Math.random() * 10);
    randomizedArr.push(`${itemArray[randomItem]}`);
    element.classList.remove("draggable", "randomItem");
    element.classList.add(`${itemArray[randomItem]}`, "randomItem");
  });
}

//COMPARE THE ORDER WITH THE PRESENTED ITEMS
let enterButton = document.querySelector(".enterOrder");
let orderedItems = document.querySelectorAll(".randomItem");

enterButton.addEventListener("click", (event) => {
  let enteredItems = document.querySelectorAll(".added");
  console.log(enteredItems);
  console.log(enteredItems.item(0).classList());
});

//TO DO
// Find a way to compare two nodelists on the first 6 characters
// Add a timer
// ADd a point counter
// Add different rounds where point counter remains the same until order is wrong;
