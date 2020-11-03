//START GAME

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function randomizeOrder() {
  //randomizes new order
  let randomAmount = Math.ceil(Math.random() * 6);
  for (let i = 0; i < randomAmount; i++) {
    var randomX = document.createElement("p");
    (randomX.className = `${itemArray[Math.floor(Math.random() * 10)]}`),
      "randomItem";
    document.querySelector(".orderZone").appendChild(randomX);
  }
}

function endGame() {
  let finalScreen = document.querySelector(".gameOver");
  finalScreen.style.opacity = 0.2;
  let finalMessage = document.querySelector(".message");
  finalMessage.style.display = "block";
}

function removeEndGame() {
  let finalScreen = document.querySelector(".gameOver");
  finalScreen.style.opacity = 1;
  let finalMessage = document.querySelector(".message");
  finalMessage.style.display = "none";
}

function timer() {
  let sec = 10;
  console.log("timer is set");
  let timer = setInterval(function () {
    document.querySelector(".displayTimer").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function startNewRound() {
  const orderZone = document.querySelector(".orderZone");
  const userZone = document.querySelector(".dropZone");
  removeEndGame();
  timer();
  removeAllChildNodes(orderZone);
  removeAllChildNodes(userZone);
  randomizeOrder();

  score = 0;
}

let startButton = document.querySelector(".startGame");
startButton.addEventListener("click", (event) => {
  console.log("button was clicked");
  startNewRound();
});

//PLAYING THE GAME
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
  el.classList.remove("draggable");
  el = null;
});

//CHECKING THE ORDER
let enterButton = document.querySelector(".enterOrder");

function getClasses(domElement) {
  return Array.from(domElement.children).map((el) => el.classList[0]);
}

function checkOrderEntry() {
  const orderZone = document.querySelector(".orderZone");
  const userZone = document.querySelector(".dropZone");
  const currentOrders = getClasses(orderZone);
  const userOrder = getClasses(userZone);
  //console.log(currentOrders);
  //console.log(userOrder);
  currentOrders.forEach((element, index) => {
    if (element === userOrder[index]) {
      score += 10;
    } else {
      console.log("wrong entry");
      return;
    }
  });
  return score;
}

function updateScore() {
  document.querySelector(".score").innerHTML = `Score: ${score}`;
}

function nextRound() {
  const orderZone = document.querySelector(".orderZone");
  const userZone = document.querySelector(".dropZone");
  removeAllChildNodes(orderZone);
  removeAllChildNodes(userZone);
  randomizeOrder();
}

enterButton.addEventListener("click", (event) => {
  checkOrderEntry();
  updateScore();
  nextRound();
});

//ENDING THE GAME
