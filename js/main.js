import { state, loadState } from "./api.js";
import { renderColContainer, renderColForm, renderCol } from "./dom.js";

loadState();

renderColContainer();

console.log(state);

const addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", renderColForm);

//localStorage.clear();
