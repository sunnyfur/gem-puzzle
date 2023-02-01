const dom = require("./createElementDom");
const logic = require("./logic");
const btns = require("./btns");

const switchElements = (elem1, elem2, direction) => {
  elem1.classList.add(direction);
  let isAnimated = true;
  elem1.addEventListener("animationend", () => {
    if (isAnimated) {
      elem1.classList.remove(direction);
      const temp = elem1.cloneNode();
      elem1.after(temp);

      elem2.after(elem1);
      temp.after(elem2);

      temp.remove();
      isAnimated = false;
    }
  });
};

const move = (cell, emptyCell) => {
  const cells = document.querySelectorAll(".cell");
  const direction = logic.canMove(
    [...cells].indexOf(cell),
    [...cells].indexOf(emptyCell)
  );
  if (direction) {
    switchElements(cell, emptyCell, direction);
    btns.sound();

    if (logic.isFinished()) {
      btns.timer.stop();
      logic.results.addResult({
        date: new Date(),
        moves: logic.params.moves,
        time: logic.params.time,
      });
      logic.results.saveToLocal();
      btns.modalResult();
    }
  }
};

const allowDrop = (e) => {
  e.preventDefault();
};
const dragCell = (e) => {
  e.dataTransfer.setData("id", e.target.id);
};
const dropCell = (e) => {
  const idCell = e.dataTransfer.getData("id");
  // поменять местами
  const cell = document.getElementById(idCell);

  const emptyCell = e.target;

  move(cell, emptyCell);
  // console.log(cells);
};

const clickCell = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const cells = document.querySelectorAll(".cell");
  const cell = e.target;
  const emptyCell = document.getElementById("idCellEmpty");
  move(cell, emptyCell);
};

export const generateCellsHTML = (num) => {
  const cells = document.querySelector(".cells");
  document.getElementById("moves").innerText = logic.params.moves;
  btns.viewTime();

  changeClasses(cells, num);
  cells.innerHTML = "";
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      //   console.log(i, j, arrCells[i][j]);
      if (logic.params.arrCells[i][j] != num * num) {
        const cell = dom.createElemDOM(
          "div",
          "cell ",
          logic.params.arrCells[i][j]
        );
        cells.appendChild(cell);
        cell.draggable = true;
        cell.id = `idCell${logic.params.arrCells[i][j]}`;
        cell.addEventListener("dragstart", dragCell);
        cell.addEventListener("click", clickCell);
      } else {
        const cell = dom.createElemDOM("div", "cell empty");
        cells.appendChild(cell);
        cell.id = `idCellEmpty`;
        cell.addEventListener("dragover", allowDrop);
        cell.addEventListener("drop", dropCell);
      }
    }
  }
};

export const generateCellsEmpty = (num) => {
  const cells = document.querySelector(".cells");
  logic.params.arrCells.length = [];
  logic.params.moves = 0;
  if (logic.params.time) btns.timer.stop();
  logic.params.time = 0;
  btns.viewTime();

  changeClasses(cells, num);
  cells.innerHTML = "";
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      cells.appendChild(dom.createElemDOM("div", "cell empty"));
    }
  }
  document.getElementById("idBtnSave").disabled = true;
  document.getElementById("moves").innerText = 0;
};

const changeClasses = (cells, num) => {
  cells.classList.forEach((elem) =>
    /cells\d/.test(elem) ? cells.classList.remove(elem) : ""
  );

  cells.classList.add(`cells${num}`);
};
