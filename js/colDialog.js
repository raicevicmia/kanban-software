import { saveState } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialog = document.getElementById("col-dialog");
const color = document.getElementById("col-palette");


export function editCol(col, el){
  dialog.showModal();
  positionDialogRelativeTo(el, dialog);
  
  color.onclick = null;
  color.onclick = (e) => changeColClr(e, col);
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
}