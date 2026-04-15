import { state, addTask,/* moveTaskToColumn,*/ saveState } from "./api.js";

export function createColForm(){
  const addColForm = document.createElement("form");
  addColForm.classList.add("add-col-form");

  const addColIn = document.createElement("input");
  addColIn.classList.add("add-col-in");

  const addColBtns = document.createElement("div");
  addColBtns.classList.add("add-col-btns")

  const addColBtn = document.createElement("button");
  addColBtn.classList.add("add-col-btn");
  addColBtn.type = "submit";
  addColBtn.textContent = "Add list";

  const xMark = document.createElement("button");
  xMark.classList.add("x-mark");
  const faXMark = document.createElement("i");
  faXMark.classList.add("fas", "fa-xmark");

  xMark.appendChild(faXMark);
  addColBtns.append(addColBtn, xMark);

  addColForm.append(addColIn, addColBtns);

  return { addColForm, addColIn, xMark };
}

export function renderColForm(){
  const kanbanContainer = document.querySelector(".kanban-container");
  const { addColForm, addColIn, xMark } = createColForm();
  kanbanContainer.prepend(addColForm);

  addColForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = addColIn.value.trim();
    if(!value) return;

    state.columns.push(value);
    saveState();
    //console.log("Create column:", value);
    //console.log(state);
    addColIn.value = "";

  })

   xMark.addEventListener("click", (e) => {
    e.preventDefault();
      addColForm.remove();
    });
}
