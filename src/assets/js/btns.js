const cells = require("./generateCells");
const logic = require("./logic");
const dom = require("./createElementDom");
import * as bootstrap from "bootstrap";

export const newGame = () => {
  logic.params.arrCells.length = 0;
  logic.generateCells(logic.params.size);
  cells.generateCellsHTML(logic.params.size);

  // setInterval;
  logic.params.moves = 0;
  logic.params.time = 0;
  document.getElementById("moves").innerText = logic.params.moves;
  document.getElementById("idBtnSave").disabled = false;
  timer.start();
  // start timer
};

export const saveGame = () => {
  if (logic.params.arrCells.length) {
    localStorage.setItem("game", JSON.stringify({ params: logic.params }));
  } else alert("Нельзя сохранить пустую игру");
  document.getElementById("idBtnContinue").disabled = false;
};

export const continueGame = () => {
  const save = JSON.parse(localStorage.getItem("game"));
  if (save) {
    logic.params.moves = save.params.moves;
    logic.params.time = save.params.time;
    logic.params.size = save.params.size;
    logic.params.arrCells = save.params.arrCells;
    cells.generateCellsHTML(logic.params.size);
    localStorage.setItem("size", logic.params.size);
    document
      .querySelectorAll(".page-link")
      .forEach((elem) => elem.classList.remove("active"));
    const id = `idSize${logic.params.size}`;
    document.getElementById(id).classList.add("active");

    document.getElementById("idBtnSave").disabled = false;
    timer.start();
  }
};
export const resultsGame = () => {
  modalAllResults();
};

export const changeSize = (e) => {
  const id = e.target.id;
  const size = e.target.dataset.size;
  document
    .querySelectorAll(".page-link")
    .forEach((elem) => elem.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  cells.generateCellsEmpty(size);
  localStorage.setItem("size", size);
  logic.params.size = size;
};

export const sound = () => {
  const isSound = document.getElementById("idSound").checked;
  if (isSound) {
    const audio = new Audio();
    audio.src = require("../music/click.mp3");
    audio.autoplay = true;
  }
};

function Interval(fn, time) {
  let timer = false;
  this.start = function () {
    if (!this.isRunning()) {
      timer = setInterval(fn, time);
    }
  };
  this.stop = function () {
    clearInterval(timer);
    timer = false;
  };
  this.isRunning = function () {
    return timer !== false;
  };
}

export const min = (sec) => {
  const m = Math.floor(sec / 60);
  return m < 10 ? "0" + m : m;
};
export const sec = (num) => {
  const s = Math.floor(num % 60);
  return s < 10 ? "0" + s : s;
};
export const viewTime = () => {
  document.getElementById("time").innerHTML = `${min(logic.params.time)}:${sec(
    logic.params.time
  )}`;
};

const changeTime = () => {
  logic.params.time += 1;
  viewTime();
};

export const timer = new Interval(changeTime, 1000);

export const modalResult = () => {
  document.querySelector(".modal-title").innerText = "You win!!!";
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";

  const modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = "";
  const butCloseMod1 = dom.createElemDOM(
    "button",
    "btn btn-secondary",
    "Close"
  );
  butCloseMod1.type = "button";
  butCloseMod1.setAttribute("data-bs-dismiss", "modal");
  butCloseMod1.addEventListener("click", () => {
    console.log("close");
    cells.generateCellsEmpty(localStorage.getItem("size"));
  });
  modalFooter.appendChild(butCloseMod1);

  const newGameMod = dom.createElemDOM(
    "button",
    "btn btn-outline-primary",
    "New game"
  );
  newGameMod.type = "button";
  newGameMod.setAttribute("data-bs-dismiss", "modal");
  newGameMod.addEventListener("click", newGame);

  modalFooter.appendChild(newGameMod);
  modalBody.appendChild(
    dom.createElemDOM(
      "p",
      "",
      `You solved the puzzle in <span id='timeModal'>${min(
        logic.params.time
      )}:${sec(logic.params.time)}</span> and <span id='movesModal'>${
        logic.params.moves
      }</span> moves!`
    )
  );

  const myModal = new bootstrap.Modal(document.getElementById("idModalResult"));
  myModal.show();
};
const optionsDate = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};
export const modalAllResults = () => {
  document.querySelector(".modal-title").innerText = "Results";
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";
  const table = dom.createElemDOM("table", "table table-striped");
  modalBody.appendChild(table);
  table.appendChild(
    dom.createElemDOM(
      "thead",
      "",
      "<tr><th scope='col'>Position</th><th scope='col'>Date</th><th scope='col'>Moves</th><th scope='col'>Time</th></tr>"
    )
  );
  const bodyTable = dom.createElemDOM("tbody");
  table.appendChild(bodyTable);
  let i = 1;
  logic.results.results.map((result) => {
    const tr = dom.createElemDOM("tr", "", `<th scope='row'>${i++}</th>`);
    bodyTable.appendChild(tr);
    tr.appendChild(
      dom.createElemDOM(
        "td",
        "",
        `${new Date(result.date).toLocaleDateString("ru-Ru", optionsDate)}`
      )
    );
    tr.appendChild(dom.createElemDOM("td", "", `${result.moves}`));
    tr.appendChild(dom.createElemDOM("td", "", `${result.time}`));
  });
  const modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = "";
  const butCloseMod1 = dom.createElemDOM(
    "button",
    "btn btn-secondary",
    "Close"
  );
  butCloseMod1.type = "button";
  butCloseMod1.setAttribute("data-bs-dismiss", "modal");
  modalFooter.appendChild(butCloseMod1);

  const myModal = new bootstrap.Modal(document.getElementById("idModalResult"));
  myModal.show();
};
