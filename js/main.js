import { state, loadState } from "./api.js";
import { renderColForm } from "./dom.js";

loadState();
console.log(state);

const addListBtn = document.getElementById("add-list-btn");

addListBtn.addEventListener("click", renderColForm);

localStorage.clear();
