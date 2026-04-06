import { state, loadState, addCol } from "./api.js";
import { render, addColFormEl, addColInputEl } from "./dom.js";

loadState();
render(state);

addColFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const colName = addColInputEl.value.trim();

  if (!colName) {
    showError();
    setTimeout(() => {
      clearError();
    }, 3000);
    return;
  }

  addCol(colName);
  render(state);

  addColInputEl.value = "";
});

function showError() {
  const error = addColFormEl.querySelector(".error");
  if (error) return;
  else {
    const error = document.createElement("p");
    error.classList.add("error");
    error.innerText = "Unesite ime kolone!";
    addColFormEl.appendChild(error);
    return;
  }
}

function clearError() {
  const error = addColFormEl.querySelector(".error");
  if (error) error.remove();
}

//localStorage.clear();
console.log(state);
