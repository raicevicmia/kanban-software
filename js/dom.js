import { addCol, addTask } from "./api.js";
import { editColTitle, toggleTasks } from "./utils.js";

export function createColForm(){
  const container = document.querySelector(".kanban-container");

  if(container.querySelector(".add-col-form")) return;

  const form = document.createElement("form");
  form.classList.add("add-col-form");

  const input = document.createElement("input");
  input.classList.add("add-col-in");

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("add-col-btns")

  const addBtn = document.createElement("button");
  addBtn.classList.add("add-col-btn");
  addBtn.type = "submit";
  addBtn.textContent = "Add list";

  const xMark = document.createElement("button");
  xMark.classList.add("x-mark");

  const faXMark = document.createElement("i");
  faXMark.classList.add("fas", "fa-xmark");

  xMark.appendChild(faXMark);
  btnWrapper.append(addBtn, xMark);

  form.append(input, btnWrapper);

  return { form, input, xMark };
}

export function renderColForm(){
  const colContainer = document.querySelector(".col-container");

  const { form, input, xMark } = createColForm();

  colContainer.after(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const colName = input.value.trim();
    if(!colName) return;

    const col = addCol(colName);

    renderCol(col);

    form.remove();
  })  

  xMark.addEventListener("click", () => {
    form.remove();
  });
}

export function createCol(col){
  // COLUMN
  const column = document.createElement("div");
  column.classList.add("column");

  // HEADER
  const colHeader = document.createElement("div");
  colHeader.classList.add("col-header");

  const colTitle = document.createElement("p");
  colTitle.classList.add("col-title");
  colTitle.textContent = col.title;

  const chevronUp = document.createElement("i");
  chevronUp.classList.add("fa", "chevron", "fa-chevron-up");

  const chevronDown = document.createElement("i");
  chevronDown.classList.add("fa", "chevron", "fa-chevron-down", "hidden");

  colHeader.append(colTitle, chevronUp, chevronDown);

  // TASK CONTAINER
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  // FOOTER
  const colFooter = document.createElement("div");
  colFooter.classList.add("col-footer");

  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("add-task-btn");

  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus");

  addTaskBtn.appendChild(plusIcon);
  colFooter.appendChild(addTaskBtn);

  // ASSEMBLE COLUMN
  column.append(colHeader, taskContainer, colFooter);

  return {
    column,
    colTitle,
    chevronUp,
    chevronDown,
    taskContainer,
    addTaskBtn,
    colFooter,
  };
}

export function renderCol(col){
  const colContainer = document.querySelector(".col-container");

  const {
    column,
    colTitle,
    chevronUp,
    chevronDown,
    taskContainer,
    addTaskBtn,
    colFooter,
  } = createCol(col); 
  
  colContainer.appendChild(column);

  // EVENTS
  colTitle.addEventListener("click", editColTitle);

  chevronUp.addEventListener("click", () => {
    toggleTasks(col, taskContainer, chevronUp, chevronDown, colFooter)
  });

  chevronDown.addEventListener("click", () => {
    toggleTasks(col, taskContainer, chevronUp, chevronDown, colFooter)
  });

  addTaskBtn.addEventListener("click", () => {
    renderTaskForm(taskContainer, col.id);
  });

  col.tasks.forEach(task => renderTask(task, taskContainer));

}

export function renderTaskForm(taskContainer, colId){
if (taskContainer.querySelector(".add-task-form")) return;

  // RENDERING TASK FORM
  const form = document.createElement("form");
  form.classList.add("add-task-form");

  const input = document.createElement("input");
  input.className = "add-task-in";

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("add-task-btns");

  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.id = "add-task-btn";
  addBtn.textContent = "Add task";

  const xMark = document.createElement("button");
  xMark.classList.add("x-mark");

  const xIcon = document.createElement("i");
  xIcon.classList.add("fas", "fa-xmark");

  xMark.appendChild(xIcon);
  btnWrapper.append(addBtn, xMark);
  form.append(input, btnWrapper);

  taskContainer.appendChild(form);

  // EVENT LISTENERS
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = input.value.trim();
    if(!taskName) return;

    const task = addTask(colId, taskName);
    renderTask(task, taskContainer);

    form.remove();
  });

  xMark.addEventListener("click", () => form.remove());
}

export function renderTask(task, container){
  const taskEl = document.createElement("div");
  taskEl.classList.add("task");

  const header = document.createElement("div");
  header.classList.add("task-header");

  const name = document.createElement("p");
  name.classList.add("task-name");
  name.textContent = task.title;

  const circle = document.createElement("i");
  circle.classList.add("fas", "fa-circle");

  header.append(name, circle);

  const desc = document.createElement("div");
  desc.classList.add("task-description");

  const proj = document.createElement("p");
  proj.classList.add("task-proj");

  const due = document.createElement("p");
  due.classList.add("task-due-date");

  desc.append(proj, due);

  taskEl.append(header, desc);
  container.appendChild(taskEl);
}


