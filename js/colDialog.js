import { saveState, state } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialog = document.getElementById("col-dialog");
const color = document.getElementById("col-palette");
const input = document.getElementById("change-col-name");
const saveBtn = document.querySelector(".saveCol");

let columnId = "";

export function editCol(col, el){
  dialog.showModal();
  positionDialogRelativeTo(el, dialog);

  columnId = col.id;
  
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
  saveState();

  renderColContainer();
  closeColDialog();
}

export function changeColTitle(){
  const newTitle = input.value;

  state.columns.find(col => col.id === columnId).title = newTitle;
  saveState();

  renderColContainer();
  closeColDialog();
}

// EVENTS:
saveBtn.addEventListener("click", changeColTitle);
