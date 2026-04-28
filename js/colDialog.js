import { saveState, state } from "./api.js";
import { renderColContainer } from "./dom.js";
import { handleNameSubmission, isTitleValid } from "./utils.js";

const dialogEl = document.getElementById("col-dialog");
const colorEl = document.getElementById("col-palette");
const inputEl = document.getElementById("change-col-name");
const error = dialogEl.querySelector(".missing-title");
const saveBtn = document.querySelector(".saveCol");
const deleteBtn = document.querySelector(".delCol");

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
  console.log(error);
}
function closeColDialog(){
  if(!isTitleValid(inputEl)){
    handleNameSubmission(error, inputEl);
    return;
  }
  
  dialogEl.close();
}

function positionDialogRelativeTo(el, dialogEl) {
    if (window.innerWidth <= 600) {
    // mobile → center it
    dialogEl.style.top = "50%";
    dialogEl.style.left = "50%";
    dialogEl.style.transform = "translate(-50%, -50%)";
    return;
  }

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

/* if validation passes, state and UI are updated and dialog is closed */

// validate input on Enter
inputEl.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    if(!isTitleValid(inputEl)){
      handleNameSubmission(error, inputEl);
      return;
    } else {
      changeColTitle(column);
      saveChanges();
      closeColDialog();
    }
  }
});

// validate input on clicking outside of dialog
document.addEventListener("click", (e) => {
  if (e.target === dialogEl && !isTitleValid(inputEl)){
    handleNameSubmission(error, inputEl);
    return;
  }
  if (e.target === dialogEl){
    changeColTitle(column);
    saveChanges();
    closeColDialog();
  }
});

// validate input on ESC
document.addEventListener("keydown", (e) => {
  if(e.key !== "Escape") return;

  if (!isTitleValid(inputEl)) {
    if (!isTitleValid(inputEl)) {
      e.preventDefault();
      e.stopPropagation();
      handleNameSubmission(error, inputEl);
      return;
    }
  
  dialogEl.close();
  }
});


deleteBtn.addEventListener("click", confirmDeleting);
