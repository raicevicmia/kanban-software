import { saveState } from "./api.js";
import { renderColContainer } from "./dom.js";

const dialog = document.getElementById("task-dialog");

const xmark = dialog.querySelector(".popup-xmark");
const nameEl = dialog.querySelector(".task-name");
const projectEl = dialog.querySelector(".task-proj");
const assigneeEl = dialog.querySelector(".task-assignee");
const descriptionEl = dialog.querySelector(".task-description");
const priorityEl = dialog.querySelector("#task-priority");
const dueDateEl = dialog.querySelector("#task-due-date");
const saveBtnEl = dialog.querySelector("#popup-save");

let currentTask = null;

// Track inputs per field

let editingEl = {
  name: null,
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
  nameEl.textContent = task.title || "";
  projectEl.textContent = task.project || "";
  assigneeEl.textContent = task.assignee || "";
  descriptionEl.textContent = task.description || "";
  priorityEl.value = task.priority || "select";
  dueDateEl.value = task.dueDate || "";
}


// EDIT MODE

export function editMode(el, key) {
  // prevent opening multiple inputs on same field
  if (editingEl[key]) return;

  const input = document.createElement("input");
  input.classList.add("edit");
  input.value = el.textContent;

  editingEl[key] = input;

  el.replaceWith(input);
}


// SAVE FUNCTIONS

export function saveName() {
  const input = editingEl.name;
  if (!currentTask || !input) return;

  const newValue = input.value.trim();
  if (!newValue) return;

  currentTask.title = newValue; //changes value in state
  nameEl.textContent = newValue; //changes value in dialog

  input.replaceWith(nameEl);
  editingEl.name = null;
}

export function saveProject() {
  const input = editingEl.project;
  if (!currentTask || !input) return;

  const newValue = input.value.trim();
  if (!newValue) return;

  currentTask.project = newValue; // change state value
  projectEl.textContent = newValue; // change dialog value

  input.replaceWith(projectEl);
  editingEl.project = null;
}

export function saveDescr(){
  const input = editingEl.description;
  const newValue = input.value.trim()

  currentTask.description = newValue;
  descriptionEl.textContent = newValue;

  input.replaceWith(descriptionEl);
  editingEl.project = null;
}

// SAVE ALL

export function saveAll() {
  saveName();
  saveProject();
  saveDescr();

  saveState();              // save once
  renderColContainer();     // re-render UI
}


// EVENTS

xmark.addEventListener("click", closeTaskDialog);

nameEl.addEventListener("click", () => {
  editMode(nameEl, "name");
});

projectEl.addEventListener("click", () => {
  editMode(projectEl, "project");
});

descriptionEl.addEventListener("click", () => {
  editMode(descriptionEl, "description");
})

saveBtnEl.addEventListener("click", saveAll);