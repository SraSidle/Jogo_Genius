let order = [];

let clickedOrder = [];

let score = 0;

const divIntroduction = document.querySelector(".introduction");
const divGenius = document.querySelector(".genius");
const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");
const green = document.querySelector(".green");

function shufferOrder() {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
}

function lightColor(element, time) {
  time = time * 1000;
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
    alert(`pontuação: ${score}`);
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
  shufferOrder();
}

function gameOver() {
  alert(`pontuação: ${score}. Você perdeu o jogo!`);
  order = [];
  clickedOrder = [];

  playGame();
}

function playGame() {
  score = 0;
  nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//playGame();
//será chamada na funcção do click do overlay start

function start() {
  setTimeout(() => {
    divIntroduction.style.display = "none";
  }, 500);
  setTimeout(() => {
    divGenius.style.display = "grid";
  }, 1000);
  setTimeout(() => {
    playGame();
  }, 2250);
}
