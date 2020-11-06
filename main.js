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
    (randomX.className = `${
      itemArray[Math.floor(Math.random() * itemArray.length)]
    }`),
      "randomItem";
    document.querySelector(".orderZone").appendChild(randomX);
  }
}

function endGame() {
  //let finalScreen = document.querySelector(".canvas");
  //finalScreen.style.opacity = 0.2;
  let finalMessage = document.querySelector(".message");
  finalMessage.style.display = "block";
}

function store() {
  var name = document.getElementById("name");
  localStorage.setItem(name.value, score);
  localStorage.setItem("highScore", newHighScore);
}

function storeHighScore() {
  if (score > newHighScore) {
    newHighScore = score;
    document.querySelector(
      ".newHighScore"
    ).innerHTML = `NEW High Score: $${newHighScore}`;
  } else {
    document.querySelector(
      ".newHighScore"
    ).innerHTML = `High Score: $${localStorage.getItem(
      "highScore"
    )} <br> Your Score: $${score}`;
  }
}
function removeEndGame() {
  let finalScreen = document.querySelector(".canvas");
  finalScreen.style.opacity = 1;
  let finalMessage = document.querySelector(".message");
  finalMessage.style.display = "none";
}

//TIMER FUNCTION
function timer() {
  let sec = 60;
  //console.log("timer is set");
  let timer = setInterval(function () {
    document.querySelector(".displayTimer").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      endGame();
      storeHighScore();
    }
  }, 1000);
}

//RESTART GAME
var gameMusic = new Audio("bensound-buddy.mp3");

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
startButton.addEventListener("click", () => {
  console.log("button was clicked");
  startNewRound();
  gameMusic.play();
  gameMusic.volume = 0.2;
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
var coins = new Audio("Coins.m4a");
coins.volume = 0.5;

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
      score -= 20;
    }
  });
  return score;
}

function updateScore() {
  document.querySelector(".score").innerHTML = `Score: $${score}`;
}

function nextRound() {
  const orderZone = document.querySelector(".orderZone");
  const userZone = document.querySelector(".dropZone");
  removeAllChildNodes(orderZone);
  removeAllChildNodes(userZone);
  randomizeOrder();
}

//BUTTON TO ENTER ORDER
enterButton.addEventListener("click", (event) => {
  checkOrderEntry();
  updateScore();
  coins.play();
  nextRound();
});

//ADD BUTTON TO RESET GAME WITHOUT STARTING THE GAME
let resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", (event) => {
  const orderZone = document.querySelector(".orderZone");
  const userZone = document.querySelector(".dropZone");
  removeEndGame();
  removeAllChildNodes(orderZone);
  removeAllChildNodes(userZone);
  newHighScore = 0;
  score = 0;
  updateScore();
  clearInterval(timer);
  gameMusic.pause();
});

//ADD BUTTON WITH GAME INSTRUCTIONS
let howToButton = document.querySelector(".buttonQA");
howToButton.addEventListener("click", () => {
  let instructions = document.querySelector(".howTo");
  instructions.style.display = "block";
});

let closeInstructions = document.querySelector(".closeFile");
closeInstructions.addEventListener("click", () => {
  let instructions = document.querySelector(".howTo");
  instructions.style.display = "none";
});

//localStorage.setItem("highScore", "1000000")
// document.querySelector(".score").innerText=`Score ${localStorage.getItem("highScore")}`
// "Score 1000000")
