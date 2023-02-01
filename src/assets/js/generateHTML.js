const dom = require("./createElementDom");
const cells = require("./generateCells");
const btns = require("./btns");

const generateHtml = () => {
  const container = dom.createElemDOM("div", "container mt-4 text-center ");
  document.querySelector("body").appendChild(container);
  const gameContainer = dom.createElemDOM("div", "game__container");
  container.appendChild(gameContainer);
  const rowSound = dom.createElemDOM("div", "row justify-content-end ");
  gameContainer.appendChild(rowSound);
  const rowBtns = dom.createElemDOM("div", "row align-items-center");
  gameContainer.appendChild(rowBtns);
  const rowBtnsCol = dom.createElemDOM("div", "col");
  rowBtns.appendChild(rowBtnsCol);
  const gridBtns = dom.createElemDOM("div", "d-grid  d-md-block col");
  rowBtnsCol.appendChild(gridBtns);

  const btnNew = dom.createElemDOM(
    "button",
    "btn btn-outline-primary",
    "New game"
  );
  btnNew.addEventListener("click", btns.newGame);

  gridBtns.appendChild(btnNew);
  const btnSave = dom.createElemDOM(
    "button",
    "btn btn-outline-primary",
    "Save"
  );
  gridBtns.appendChild(btnSave);
  btnSave.addEventListener("click", btns.saveGame);
  btnSave.disabled = true;
  btnSave.id = "idBtnSave";
  const btnContinue = dom.createElemDOM(
    "button",
    "btn btn-outline-primary",
    "Continue"
  );
  gridBtns.appendChild(btnContinue);
  btnContinue.addEventListener("click", btns.continueGame);
  btnContinue.id = "idBtnContinue";
  const game = localStorage.getItem("game");
  if (game) {
    btnContinue.disabled = false;
  } else {
    btnContinue.disabled = true;
  }

  const btnResults = dom.createElemDOM(
    "button",
    "btn btn-outline-primary",
    "Results"
  );
  gridBtns.appendChild(btnResults);
  btnResults.addEventListener("click", btns.resultsGame);

  // sound check
  const rowBtnsCol2 = dom.createElemDOM("div", "col-2");
  rowSound.appendChild(rowBtnsCol2);
  const soundCheck = dom.createElemDOM("div", "form-check form-switch");
  rowBtnsCol2.appendChild(soundCheck);
  const soundCheckInput = dom.createElemDOM("input", "form-check-input");
  soundCheck.appendChild(soundCheckInput);

  soundCheckInput.id = "idSound";
  soundCheckInput.type = "checkbox";

  const soundCheckLabel = dom.createElemDOM(
    "label",
    "form-check-label",
    "Sound"
  );
  soundCheck.appendChild(soundCheckLabel);
  soundCheckLabel.for = "idSound";
  //time
  const rowTimeMoves = dom.createElemDOM(
    "div",
    "row align-items-center row_width"
  );
  gameContainer.appendChild(rowTimeMoves);
  const colTime = dom.createElemDOM("div", "col-6");
  rowTimeMoves.appendChild(colTime);
  colTime.appendChild(
    dom.createElemDOM("p", "", "Time: <span id='time'>00:00 </span>")
  );
  const colMoves = dom.createElemDOM("div", "col-6");
  rowTimeMoves.appendChild(colMoves);
  colMoves.appendChild(
    dom.createElemDOM("p", "", "Moves: <span id='moves'> 0 </span>")
  );

  //cells
  const rowCells = dom.createElemDOM("div", "row");
  gameContainer.appendChild(rowCells);
  rowCells.appendChild(dom.createElemDOM("div", "cells col"));

  localStorage.setItem("size", 4);
  cells.generateCellsEmpty(4);

  //sizes
  const rowSizes = dom.createElemDOM("div", "row align-items-center");
  gameContainer.appendChild(rowSizes);
  rowSizes.appendChild(dom.createElemDOM("div", "col-12", "<p>Sizez:</p>"));
  const colSizes = dom.createElemDOM("div", "col-12");
  rowSizes.appendChild(colSizes);
  const ulSizes = dom.createElemDOM("ul", "pagination justify-content-center");
  colSizes.appendChild(ulSizes);
  for (let i = 3; i <= 8; i++) {
    // const li = dom.createElemDOM("li", "page-item page-link", `${i}x${i}`);
    // li.id = `idSize${i}`;
    // ulSizes.appendChild(li);

    const li = dom.createElemDOM("li", "page-item ");

    ulSizes.appendChild(li);
    const link = dom.createElemDOM("a", "page-link", `${i}x${i}`);
    link.id = `idSize${i}`;
    link.href = "#";
    link.dataset.size = i;
    li.appendChild(link);
    li.addEventListener("click", btns.changeSize);
  }
  document.querySelector("#idSize4").classList.add("active");
  //result
  const modalResult = dom.createElemDOM("div", "modal fade");
  modalResult.id = "idModalResult";
  container.appendChild(modalResult);
  const modalDialog = dom.createElemDOM("div", "modal-dialog");
  modalResult.appendChild(modalDialog);
  const modalContent = dom.createElemDOM("div", "modal-content");
  modalDialog.appendChild(modalContent);
  const modalHeader = dom.createElemDOM("div", "modal-header");
  modalContent.appendChild(modalHeader);

  modalHeader.appendChild(dom.createElemDOM("h5", "modal-title", "You win!!!"));

  const butCloseMod = dom.createElemDOM("button", "btn-close");
  butCloseMod.type = "button";
  butCloseMod.setAttribute("data-bs-dismiss", "modal");
  modalHeader.appendChild(butCloseMod);

  const modalBody = dom.createElemDOM("div", "modal-body");
  modalContent.appendChild(modalBody);

  const modalFooter = dom.createElemDOM("div", "modal-footer");
  modalContent.appendChild(modalFooter);

  //results
};
generateHtml();
