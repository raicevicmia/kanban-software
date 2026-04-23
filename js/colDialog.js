import { saveState, state } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialogEl = document.getElementById("col-dialog");
const colorEl = document.getElementById("col-palette");
const inputEl = document.getElementById("change-col-name");
const saveBtn = document.querySelector(".saveCol");
const deleteBtn = document.querySelector(".delCol");
const form = document.querySelector(".col-form");

const confirmColDelete = document.getElementById("confirm-col-dialog");
const confirmBtn = document.querySelector(".confirm-col-delete");
const notConfirmBtn = document.querySelector(".not-confirm-col-delete")

let column = "";

export function initColDialog(col, el){
  dialogEl.showModal();
  positionDialogRelativeTo(el, dialogEl);
  inputEl.value = col.title;

  column = col;

  colorEl.onclick = (e) => changeColClr(e, col);
}

function closeColDialog(){
  dialogEl.close();
}

function positionDialogRelativeTo(el, dialogEl) {
  const rect = el.getBoundingClientRect();
  const BOT_DIALOG_OFFSET = -80;
  const LEFT_DIALOG_OFFSET = 220;

  dialogEl.style.position = "fixed";

  dialogEl.style.top = `${rect.bottom - BOT_DIALOG_OFFSET}px`;
  dialogEl.style.left = `${rect.left + LEFT_DIALOG_OFFSET}px`;

}

function changeColClr(e, col){
  const paletteClr = e.target.classList;
  let newColor = null;

  switch(true){
    case paletteClr.contains("fa-c-grey"):
      newColor = "grey";
      break;
    case paletteClr.contains("fa-c-blue"):
      newColor = "blue";
      break;
    case paletteClr.contains("fa-c-green"):
      newColor = "green";
      break;
    case paletteClr.contains("fa-c-yellow"):
      newColor = "yellow";
      break;
    case paletteClr.contains("fa-c-coral"):
      newColor = "coral";
      break;
  }

  if (!newColor) return;
  col.color = newColor;
  saveChanges();
}

function changeColTitle(column){
  const newTitle = inputEl.value;

  const col = state.columns.find(c => c.id === column.id);
  if (!col) return;

  col.title = newTitle;
  saveChanges();
}

function saveChanges(){
  saveState();
  renderColContainer();
}

function deleteCol(){
  state.columns = state.columns.filter(c => c.id !== column.id);
  saveChanges();
  closeColDialog();
}

function confirmDeleting(){
  confirmColDelete.showModal();

  confirmBtn.addEventListener("click", () => {
    confirmColDelete.close();
    deleteCol();
  });

  notConfirmBtn.addEventListener("click", () => {
    confirmColDelete.close();
  });
}

// EVENTS:
form.addEventListener("submit", (e) => {
  e.preventDefault();
  changeColTitle(column);
  closeColDialog();
});

deleteBtn.addEventListener("click", confirmDeleting);

document.addEventListener("click", (e) => {
  if (e.target === dialogEl){
    changeColTitle(column);
    saveChanges();
    closeColDialog();
  }
});