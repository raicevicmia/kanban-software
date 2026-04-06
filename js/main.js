import { state, loadState, addCol } from "./api.js";
import { render, addColFormEl, addColInputEl } from "./dom.js";
import { showError, clearError } from "./utils.js";

loadState();
render(state);

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
console.log(state);
