var board;
var rows = 4;
var columns = 4;
var touchStart;
var touchEnd;
const score = localStorage.getItem("score") || 0;
document.getElementById("best-score").innerHTML = score;
const btn = document.getElementById("btn-try-again");
const modal = document.querySelector(".modal");

window.onload = function () {
  loadGames();
};

const screenGame = document.querySelector(".game-screen");

function loadGames() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      let item = document.createElement("div");
      item.id = r.toString() + "-" + c.toString();

      let num = board[r][c];
      upDateItem(item, num);
      document.querySelector(".game-screen").append(item);
    }
  }
  randomNumberTwo();
  randomNumberTwo();
}

function Score() {
  var max = board[0][0];
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      if (max < board[r][c]) {
        max = board[r][c];
      }
    }
  }

  document.getElementById("score").innerHTML = max;
  const bestScore = max > score ? max : score;
  document.getElementById("best-score").innerHTML = bestScore;
  localStorage.setItem("score", bestScore);
}

function hasEmptyTitle() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function randomNumberTwo() {
  if (!hasEmptyTitle()) {
    modal.classList.add("open");
    return;
  }

  let foundNumber = false;
  while (!foundNumber) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let item = document.getElementById(r.toString() + "-" + c.toString());
      item.innerHTML = "2";
      item.classList.add("x2");
      foundNumber = true;
    }
  }
}

function upDateItem(item, num) {
  item.innerText = "";
  item.classList.value = "";
  item.classList.add("item");
  if (num > 0) {
    item.innerText = num;
    if (num <= 4096) {
      item.classList.add("x" + num.toString());
    } else {
      item.classList.add("8192");
    }
  }
}

//handle event key
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    randomNumberTwo();
  }
  if (e.code == "ArrowRight") {
    slideRight();
    randomNumberTwo();
  }
  if (e.code == "ArrowUp" || e.code == "") {
    slideUp();
    randomNumberTwo();
  }
  if (e.code == "ArrowDown") {
    slideDown();
    randomNumberTwo();
  }
  Score();
});

screenGame.addEventListener("touchstart", (e) => {
  touchStart = [e.changedTouches[0].screenX, e.changedTouches[0].screenY];
});

screenGame.addEventListener("touchend", (e) => {
  touchEnd = [e.changedTouches[0].screenX, e.changedTouches[0].screenY];
  let X = touchEnd[0] - touchStart[0];
  let Y = touchEnd[1] - touchStart[1];
  let sub = X - Y;
  if (Y <= 0 && sub > 0) {
    slideUp();
    randomNumberTwo();
    return;
  }
  if (Y >= 0 && sub < 0) {
    slideDown();
    randomNumberTwo();
    return;
  }
  if (X < 0 && sub < 0) {
    slideLeft();
    randomNumberTwo();
    return;
  }
  if (X > 0 && sub > 0) {
    slideRight();
    randomNumberTwo();
    return;
  }
});

function filterZero(array) {
  return array.filter((num) => num !== 0);
}

function slide(array) {
  rFilter0 = filterZero(array); //get array rid of zeros

  for (let i = 0; i < rFilter0.length - 1; i++) {
    if (rFilter0[i] === rFilter0[i + 1]) {
      rFilter0[i] *= 2;
      rFilter0[i + 1] = 0;
      //   [2, 2, 2] -> [4, 0, 2]
    }
  }
  newArray = filterZero(rFilter0);
  while (newArray.length < columns) {
    newArray.push(0);
  }

  return newArray;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    newRow = slide(row);
    board[r] = newRow;

    for (let c = 0; c < columns; c++) {
      let item = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      upDateItem(item, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    newRow = slide(row);
    newRow.reverse();
    board[r] = newRow;

    for (let c = 0; c < columns; c++) {
      let item = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      upDateItem(item, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
    newColumn = slide(column);

    for (let r = 0; r < rows; r++) {
      board[r][c] = newColumn[r];
      let item = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      upDateItem(item, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let column = [board[0][c], board[1][c], board[2][c], board[3][c]];
    column.reverse();
    newColumn = slide(column);
    newColumn.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = newColumn[r];
      let item = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      upDateItem(item, num);
    }
  }
}

const tryAgain = () => {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
      document.getElementById(r.toString() + "-" + c.toString())?.remove();
    }
  }
  document.getElementById("score").innerHTML = 0;
  loadGames();
  modal.classList.remove("open");
};

btn.addEventListener("click", tryAgain);
