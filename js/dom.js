import { addCol, addTask,/* moveTaskToColumn,*/ saveState } from "./api.js";
import { editColTitle, showMore, showLess } from "./utils.js";

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
    else{
      addCol(value);
      saveState();
      renderCol(value);
      addColForm.remove();
      addColIn.value = "";
    }
  })

  xMark.addEventListener("click", (e) => {
    e.preventDefault();
      addColForm.remove();
  });
}

export function createCol(title){
  // COLUMN
  const colDiv = document.createElement("div");
  colDiv.classList.add("column");

  // HEADER
  const colHeader = document.createElement("div");
  colHeader.classList.add("col-header");

  const colTitle = document.createElement("p");
  colTitle.classList.add("col-title");
  colTitle.textContent = title;

  const chevronUp = document.createElement("i");
  chevronUp.classList.add("fa", "chevron", "fa-chevron-up");

  const chevronDown = document.createElement("i");
  chevronDown.classList.add("fa", "chevron", "fa-chevron-down");

  colHeader.append(colTitle, chevronUp, chevronDown);

  // TASK CONTAINER
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  // (tasks will be appended here later)

  // FOOTER
  const colFooter = document.createElement("div");
  colFooter.classList.add("col-footer");

  const addTaskCircleBtn = document.createElement("button");
  addTaskCircleBtn.classList.add("add-task-btn");

  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus");

  addTaskCircleBtn.appendChild(plusIcon);
  colFooter.appendChild(addTaskCircleBtn);

  // ASSEMBLE COLUMN
  colDiv.append(colHeader, taskContainer, colFooter);

  return {
    colDiv,
    colTitle,
    chevronUp,
    chevronDown,
    taskContainer,
    addTaskCircleBtn,
  };
}

export function renderCol(title){
  const colContainer = document.querySelector(".col-container");
  const { colDiv, colTitle, chevronUp, chevronDown, taskContainer, addTaskCircleBtn } = createCol(title);
  colContainer.appendChild(colDiv);

  colTitle.addEventListener("click", editColTitle);
  chevronUp.addEventListener("click", showMore);
  chevronDown.addEventListener("click", showLess);

  addTaskCircleBtn.addEventListener("click", () => {
    renderTaskForm(taskContainer);
  });
}


export function renderTaskForm(taskContainer){
  if (taskContainer.querySelector(".add-task-form")) return;

  const addTaskForm = document.createElement("form");
  addTaskForm.classList.add("add-task-form");

  const addTaskInput = document.createElement("input");
  addTaskInput.id = "add-task-in";

  const addTaskBtns = document.createElement("div");
  addTaskBtns.classList.add("add-task-btns");

  const addTaskBtn = document.createElement("button");
  addTaskBtn.type = "submit";
  addTaskBtn.id = "add-task-btn";
  addTaskBtn.textContent = "Add task";

  const xMark = document.createElement("button");
  xMark.classList.add("x-mark");

  const xIcon = document.createElement("i");
  xIcon.classList.add("fas", "fa-xmark");

  xMark.appendChild(xIcon);
  addTaskBtns.append(addTaskBtn, xMark);
  addTaskForm.append(addTaskInput, addTaskBtns);

  taskContainer.appendChild(addTaskForm);

}
