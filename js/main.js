import { state, loadState, addCol } from "./api.js";
import { render, addColFormEl, addColInputEl } from "./dom.js";
//localStorage.clear();

loadState();
console.log(state);

render(state);

addColFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addCol(addColInputEl.value.trim());
  render(state);
  addColInputEl.value = "";
});
