import { saveState, state } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialog = document.getElementById("col-dialog");
const color = document.getElementById("col-palette");
const input = document.getElementById("change-col-name");
const saveBtn = document.querySelector(".saveCol");
const deleteBtn = document.querySelector(".delCol");
const form = document.querySelector(".col-form");

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

  dialog.style.position = "fixed";

  dialog.style.top = `${rect.bottom - 12}px`;
  dialog.style.left = `${rect.left + 200}px`;

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

  const col = state.columns.find(c => c === column);
  if (!col) return;

  col.title = newTitle;
  saveChanges();
}

function saveChanges(){
  saveState();
  renderColContainer();
  closeColDialog();
}

export function deleteCol(){
  state.columns = state.columns.filter(col => col !== column);
  saveChanges();
}

// EVENTS:
form.addEventListener("submit", (e) => {
  e.preventDefault();
  changeColTitle();
});
deleteBtn.addEventListener("click", deleteCol);

document.addEventListener("click", (e) => {
  if (e.target === dialog){
    closeColDialog();
  }
});