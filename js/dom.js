import { state, addCol, addTask } from "./api.js";
import { openTaskDialog } from "./taskDialog.js";
import { initColDialog } from "./colDialog.js";
import { getPrioColor, formatDate, toggleTasks, applyIsColOpen, applyColClr, handleNameSubmission } from "./utils.js";
import { handleDragStart, handleDragEnd, handleDragOver, handleDrop } from "./drag.js";

const container = document.querySelector(".kanban-container");
const colContainer = document.querySelector(".col-container");

export function renderColContainer(){
  colContainer.innerHTML = "";

  state.columns.forEach(col => renderCol(col));
}

function createColForm(){
  if(container.querySelector(".add-col-form")) return;

  const form = document.createElement("form");
  form.classList.add("add-col-form");

  const input = document.createElement("input");
  input.classList.add("add-col-in");

  const error = document.createElement("p");
  error.classList.add("missing-title");

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("add-col-btns")
  const addBtn = document.createElement("button");
  addBtn.classList.add("add-col-btn");
  addBtn.type = "submit";
  addBtn.textContent = "Add list";

  const xIconBtn = document.createElement("button");
  xIconBtn.classList.add("x-icon");
  xIconBtn.type = "button";
  const xIcon = document.createElement("i");
  xIcon.classList.add("fas", "fa-xmark", "x-mark");

  xIconBtn.appendChild(xIcon);
  btnWrapper.append(addBtn, xIconBtn);

  form.append(input, error, btnWrapper);

  return { form, input, error, xIconBtn };
}
export function renderColForm(){
  const formElements = createColForm();
  if (!formElements) return;
  const { form, input, xIconBtn, error } = formElements;
    
  colContainer.after(form);

  form.addEventListener("submit", (e) => {
    handleAddColSubmit(e, { form, input, error});
  })  

  xIconBtn.addEventListener("click", () => {
    form.remove();
  });
}

function createCol(col){
  const column = document.createElement("div");
  column.classList.add("column");

  const header = document.createElement("div");
  header.classList.add("col-header");
  const title = document.createElement("p");
  title.classList.add("col-title");
  title.classList.add("col-color");
  title.textContent = col.title;
  const chevron = document.createElement("i");
  chevron.classList.add("fa", "chevron", "fa-chevron-up");

  header.append(title, chevron);

  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const footer = document.createElement("div");
  footer.classList.add("col-footer");
  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("add-task-btn");
  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus");

  addTaskBtn.appendChild(plusIcon);
  footer.appendChild(addTaskBtn);

  column.append(header, taskContainer, footer);

  return {
    column,
    title,
    chevron,
    taskContainer,
    addTaskBtn,
    footer,
  };
}
function renderCol(col){
  const {
    column,
    title,
    chevron,
    taskContainer,
    addTaskBtn,
    footer,
  } = createCol(col); 
  
  colContainer.appendChild(column);

  applyIsColOpen(col.open, taskContainer, chevron, footer);
  applyColClr(col, title);

  bindColumnEvents(col, {
    title,
    chevron,
    taskContainer,
    addTaskBtn,
    footer,
  });

  renderTasks(col.tasks, taskContainer);
}

function createTaskForm(taskContainer){
  if (taskContainer.querySelector(".add-task-form")) return;

  const form = document.createElement("form");
  form.classList.add("add-task-form");

  const containerEl = document.createElement("div");
  containerEl.classList.add("add-task-form-container");

  const input = document.createElement("input");
  input.className = "add-task-in";

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("add-task-btns");
  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.id = "add-task-btn";
  addBtn.textContent = "Add task";
  const xIconBtn = document.createElement("button");
  xIconBtn.classList.add("x-icon");
  xIconBtn.type = "button";
  const xIcon = document.createElement("i");
  xIcon.classList.add("fas", "fa-xmark", "x-mark");


  const error = document.createElement("p");
  error.classList.add("missing-title");

  xIconBtn.appendChild(xIcon);
  btnWrapper.append(addBtn, xIconBtn);
  containerEl.append(input, btnWrapper);

  form.append(containerEl, error);

  return {
    form,
    input,
    error,
    xIconBtn,
  }
}
function renderTaskForm(taskContainer, colId){
  const formElements = createTaskForm(taskContainer);
  if (!formElements) return;
  const { form, input, error, xIconBtn } = formElements;

  taskContainer.appendChild(form);

  form.addEventListener("submit", (e) => {
   handleAddTaskSubmit(e, formElements, colId, taskContainer);
  });

  xIconBtn.addEventListener("click", () => { 
    form.remove();
  });
}

function createTask(task){
  const taskEl = document.createElement("div");
  taskEl.classList.add("task");
  getPrioColor(task, taskEl);
  taskEl.draggable = true;
  taskEl.dataset.id = task.id;

  const header = document.createElement("div");
  header.classList.add("task-header");
  const name = document.createElement("p");
  name.classList.add("task-name");
  name.textContent = task.title;

  header.append(name);

  const desc = document.createElement("div");
  desc.classList.add("task-description");
  const proj = document.createElement("p");
  proj.classList.add("task-proj");
  proj.textContent = task.project;
  const due = document.createElement("p");
  due.classList.add("task-due-date");
  due.textContent = formatDate(task.dueDate);

  desc.append(proj, due);

  taskEl.append(header, desc);

  return taskEl;
}

function renderTask(task, taskContainer){
  const taskEl = createTask(task);

  taskContainer.appendChild(taskEl);
  bindTaskEvents(taskEl, task);

  return taskEl;
}


// internal DOM utilities :

function renderTasks(tasks, taskContainer){
  tasks.forEach(task => {
    const taskEl = renderTask(task, taskContainer);
  })
}

function handleAddColSubmit(e, formElements){
  e.preventDefault();
  const {form, input, error} = formElements;

  const colName = input.value.trim();

  if(!colName) {
    handleNameSubmission(error, input);
    return;
  }

  const col = addCol(colName);
  renderCol(col);

  form.remove();
}

function handleAddTaskSubmit(e, formElements, colId, taskContainer){
  e.preventDefault();
  const { form, input, error, xIconBtn } = formElements;

  const taskName = input.value.trim();

  if (!taskName) {
    handleNameSubmission(error, input);
    return;
  }

  const task = addTask(colId, taskName);
  const taskEl = renderTask(task, taskContainer);

  form.remove();
}

function bindColumnEvents(col, colElements){
  const { title, chevron, taskContainer, addTaskBtn, footer } = colElements;

  title.addEventListener("click", () => {
    initColDialog(col, title)
  });

  chevron.addEventListener("click", () => {
    toggleTasks(col, taskContainer, chevron, footer);
  });

  addTaskBtn.addEventListener("click", () => {
    renderTaskForm(taskContainer, col.id);
  });

  taskContainer.addEventListener("dragover", handleDragOver);

  taskContainer.addEventListener("drop", () => {
    handleDrop(col.id);
  });
}

function bindTaskEvents(taskEl, task){
  taskEl.addEventListener("click", () => {
    openTaskDialog(task);
  });

  taskEl.addEventListener("dragstart", handleDragStart);
  taskEl.addEventListener("dragend", handleDragEnd);
}
