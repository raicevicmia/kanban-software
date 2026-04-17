import { saveState } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialog = document.getElementById("task-dialog");

const xmark = dialog.querySelector(".popup-xmark");
const titleEl = dialog.querySelector(".task-name");
const projectEl = dialog.querySelector(".task-proj");
const assigneeEl = dialog.querySelector(".task-assignee");
const descriptionEl = dialog.querySelector(".task-description");
const priorityEl = dialog.querySelector("#task-priority");
const dueDateEl = dialog.querySelector("#task-due-date");
const saveBtnEl = dialog.querySelector("#popup-save");

let currentTask = null;

// Track inputs per field
let editingEl = {
  title: null,
  project: null,
  assignee: null,
  description: null,
};


// OPEN / CLOSE
export function openTaskDialog(task) {
  currentTask = task;
  fillDialog(task);
  dialog.showModal();
}

export function closeTaskDialog() {
  dialog.close();
}


// FILL DATA
export function fillDialog(task) {
  titleEl.textContent = task.title || "";
  projectEl.textContent = task.project || "";
  assigneeEl.textContent = task.assignee || "";
  descriptionEl.textContent = task.description || "";
  priorityEl.value = task.priority || "select";
  dueDateEl.value = task.dueDate || "";
}


// EDIT 
export function editMode(el, key) {
  // prevent opening multiple inputs on same field
  if (editingEl[key]) return;

  const input = document.createElement("input");
  input.classList.add("edit");
  input.value = el.textContent;

  editingEl[key] = input;

  el.replaceWith(input);
}

export function changePriority(e){
  currentTask.priority = e.target.value;
}

export function changeDueDate(e){
  currentTask.dueDate = e.target.value;
}


// SAVE
export function saveField(fieldEl, field){
  const input = editingEl[field];
  if (!currentTask || !input) return;

  const newValue = input.value.trim();
  if (!newValue) return;

  currentTask[field] = newValue; // change state value
  fieldEl.textContent = newValue; // change dialog value

  input.replaceWith(fieldEl);
  editingEl[field] = null;
}

export function saveAll() {
  saveField(titleEl, "title");
  saveField(projectEl, "project");
  saveField(descriptionEl, "description");
  saveField(assigneeEl, "assignee");

  saveState();              // save once
  renderColContainer();     // re-render UI
}


// EVENTS
xmark.addEventListener("click", closeTaskDialog);

titleEl.addEventListener("click", () => {
  editMode(titleEl, "title");
});

projectEl.addEventListener("click", () => {
  editMode(projectEl, "project");
});

assigneeEl.addEventListener("click", () => {
  editMode(assigneeEl, "assignee");
});

descriptionEl.addEventListener("click", () => {
  editMode(descriptionEl, "description");
});

priorityEl.addEventListener("change", (e) => {
  changePriority(e);
});

dueDateEl.addEventListener("change", (e) => {
  changeDueDate(e);
});


saveBtnEl.addEventListener("click", saveAll);


