import { state, loadState } from "./api.js";
import { renderColContainer, renderColForm, renderCol } from "./dom.js";

loadState();
renderColContainer();

const addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", renderColForm);

console.log(state);
//localStorage.clear();