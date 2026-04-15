import { state, loadState, /*addCol*/ } from "./api.js";
import { renderColForm } from "./dom.js";


loadState();
console.log(state);

const addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", renderColForm);


localStorage.clear();

//import { showError, clearError } from "./utils.js";

//render(state);
/*
addColFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const colName = addColInputEl.value.trim();

  if (!colName) {
    showError(addColFormEl, "Ime kolone ne smije biti prazno!");
    setTimeout(() => {
      clearError(addColFormEl);
    }, 3000);
    return;
  }

  addCol(colName);
  render(state);

  addColInputEl.value = "";
});

//localStorage.clear();



THIS CODE IS FOR VIEWING/EDITING TASK DETAILS

const taskDialog = document.getElementById("task-dialog");
taskDialog.showModal();

THIS CODE IS FOR POSITIONING COLOR PALETTE ACCORDINGLY TO COL HEADER
const parent = document.querySelector(".col-header");
const rect = parent.getBoundingClientRect();
console.log(rect);

const colDialog = document.getElementById("col-dialog");

colDialog.style.position = "absolute";
colDialog.style.top = rect.top + rect.height / 2 + "px";
colDialog.style.left = rect.left + rect.width / 2 + "px";
colDialog.style.transform = "translate(-25%, -90%)";

colDialog.showModal();
*/