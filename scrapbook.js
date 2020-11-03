let dropzone = document.querySelector(".dropZone");
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
  console.log("button was clicked");
  randomizeOrder();
});

let randomizedOrder = document.querySelectorAll(".randomItem");

let randomizedArr = [];

function randomizeOrder() {
  randomizedOrder.forEach((element) => {
    let randomItemIndex = Math.floor(Math.random() * 10);
    randomizedArr.push(`${itemArray[randomItemIndex]}`);
    element.classList.remove("draggable", "randomItem");
    element.classList.add(`${itemArray[randomItemIndex]}`, "randomItem");
    randomizedArr = [];
  });
}
//COMPARE THE ORDER WITH THE PRESENTED ITEMS
let enterButton = document.querySelector(".enterOrder");
let orderedItems = document.querySelectorAll(".randomItem");
let nextRound = document.querySelector(".nextRound");
const orderZone = document.querySelector(".orderZone");
const userZone = document.querySelector(".dropZone");

enterButton.addEventListener("click", (event) => {
  const currentOrders = getClasses(orderZone);
  const userOrder = getClasses(userZone);
  console.log(currentOrders);
  console.log(userOrder);
  currentOrders.forEach((element, index) => {
    if (element === userOrder[index]) {
      pointCounter += 10;
    } else {
      pointCounter = -20;
    }
  });
  console.log(pointCounter);
});

// let enteredItems = document.querySelectorAll(".added");
// console.log(enteredItems);
// console.log(enteredItems.item(0).classList());

//TO DO
// Find a way to compare two nodelists on the first 6 characters
// Add a timer
// ADd a point counter
// Add different rounds where point counter remains the same until order is wrong;

function getClasses(domElement) {
  return Array.from(domElement.children).map((el) => el.classList[0]);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

nextRound.addEventListener("click", () => {
  removeAllChildNodes(orderZone);
  removeAllChildNodes(userZone);
  for (x = 0; x < 6; x++) {
    var randomX = document.createElement("p");
    randomX.className = "randomItem";
    document.querySelector(".orderZone").appendChild(randomX);
  }
});
