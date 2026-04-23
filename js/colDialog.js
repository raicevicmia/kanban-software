import { saveState, state } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialog = document.getElementById("col-dialog");
const color = document.getElementById("col-palette");
const input = document.getElementById("change-col-name");
const saveBtn = document.querySelector(".saveCol");
const deleteBtn = document.querySelector(".delCol");
const form = document.querySelector(".col-form");

const confirmColDelete = document.getElementById("confirm-col-dialog");
const confirmBtn = document.querySelector(".confirm-col-delete");
const notConfirmBtn = document.querySelector(".not-confirm-col-delete")

let column = "";

export function editCol(col, el){
  dialog.showModal();
  positionDialogRelativeTo(el, dialog);

  column = col;
  
  color.onclick = null;
  color.onclick = (e) => changeColClr(e, col);
}

export function closeColDialog(){
  dialog.close();
}

export function positionDialogRelativeTo(el, dialog) {
  const rect = el.getBoundingClientRect();
  const BOT_DIALOG_OFFSET = -80;
  const LEFT_DIALOG_OFFSET = 220;

  dialog.style.position = "fixed";

  dialog.style.top = `${rect.bottom - BOT_DIALOG_OFFSET}px`;
  dialog.style.left = `${rect.left + LEFT_DIALOG_OFFSET}px`;

}

export function changeColClr(e, col){
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

export function changeColTitle(){
  const newTitle = input.value;

  const col = state.columns.find(c => c.id === column.id);
  if (!col) return;

  col.title = newTitle;
  saveChanges();
}

function saveChanges(){
  saveState();
  renderColContainer();
}

export function deleteCol(){
  state.columns = state.columns.filter(c => c.id !== column.id);
  saveChanges();
}

export function confirmDeleting(){
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
  changeColTitle();
  closeColDialog();
});
deleteBtn.addEventListener("click", confirmDeleting);

document.addEventListener("click", (e) => {
  if (e.target === dialog){
    changeColTitle();
    saveChanges();
    closeColDialog();
  }
});