const divIntroduction = document.querySelector(".introduction");
const divGenius = document.querySelector(".genius");
const divBall = document.querySelector(".ball");
const divScore = document.querySelector(".score");

const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const green = document.querySelector(".green");

const miniBlue = document.querySelector(".mini_blue");
const miniYellow = document.querySelector(".mini_yellow");
const miniRed = document.querySelector(".mini_red");
const miniGreen = document.querySelector(".mini_green");

let order = [];

let clickedOrder = [];

let points = 0;

let score = 0;

let miniColors = [miniBlue, miniRed, miniGreen, miniYellow];

function shufferOrder() {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    setTimeout(() => {
      lightColor(elementColor, Number(i) + 1);
    }, 750);
  }
}

function lightSpin() {
  let i = Math.floor(Math.random() * 4);
  setTimeout(() => {
    lightColor(miniColors[i], 1);
  }, 500);
}

let callLightSpin = window.setInterval(lightSpin, 1500);

function lightColor(element, time) {
  time = time * 1200;
  setTimeout(() => {
    element.classList.add("selected");
  }, time - 800);
  setTimeout(() => {
    element.classList.remove("selected");
  }, time);
}

function checkOrder() {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    nextLevel();
  }
}

function click(color) {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");
  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 300);
}

function createColorElement(color) {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
}

function nextLevel() {
  score++;
  points += clickedOrder.length;
  divScore.innerHTML = `Nível: ${score}  Pontuação: ${points}`;
  shufferOrder();
}

function gameOver() {
  alert(`Você perdeu! sua Pontuação foi: ${points}!`);
  order = [];
  clickedOrder = [];

  playGame();
}

function playGame() {
  score = 0;
  points = 0;
  nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

function start() {
  setTimeout(() => {
    divIntroduction.style.display = "none";
    clearInterval(callLightSpin);
  }, 500);
  setTimeout(() => {
    divBall.style.display = "flex";
    divScore.style.display = "flex";
    divGenius.style.display = "grid";
  }, 1000);
  setTimeout(() => {
    playGame();
  }, 2250);
}
