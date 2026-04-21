import { state, loadState } from "./api.js";
import { renderColContainer, renderColForm } from "./dom.js";
import { initBgDialog, openBgDialog } from "./bgDialog.js";

loadState();
renderColContainer();

initBgDialog();

const addListBtn = document.getElementById("add-list-btn");
const customizeBg = document.querySelector(".customize-bg");

addListBtn.addEventListener("click", renderColForm);
customizeBg.addEventListener("click", openBgDialog);

console.log(state);
//localStorage.clear();
