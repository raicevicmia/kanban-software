import { saveState, state, changeTaskPriority, changeTaskDueDate, } from "./api.js";
import { renderColContainer } from "./dom.js";
import { formatDate, updateDialogDateUI, updatePriorityColor } from "./utils.js";
//import { applyTaskHeaderClr } from "./utils.js"

const dialog = document.getElementById("task-dialog");

//const headerEl = dialog.querySelector(".task-header")
const xmark = dialog.querySelector(".popup-xmark");
const titleForm = dialog.querySelector(".task-name");
const titleIn = dialog.querySelector("#change-task-name");
const projectEl = dialog.querySelector("#change-proj-name");
const assigneeEl = dialog.querySelector(".task-assignee");
const descriptionEl = dialog.querySelector("#change-task-descr");
const priorityEl = dialog.querySelector("#task-priority");

const dueDateDiv = dialog.querySelector(".due-date-opt");
const dueDateSpan = dialog.querySelector("#due-date-display");
const dueDateEl = dialog.querySelector("#task-due-date");

const saveBtnEl = dialog.querySelector("#popup-save");
const deleteBtnEl = dialog.querySelector("#popup-delete");

const confirmTaskDelete = document.getElementById("confirm-task-dialog");
const confirmBtn = document.querySelector(".confirm-task-delete");
const notConfirmBtn = document.querySelector(".not-confirm-task-delete")

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
  updatePriorityColor(priorityEl);
  updateDialogDateUI(dueDateSpan, task);
  dialog.showModal();
}

export function closeTaskDialog() {
  dialog.close();
}

// FILL DATA
export function fillDialog(task) {
  //applyTaskHeaderClr(headerEl, task);

  titleIn.textContent = task.title || "";
  projectEl.textContent = task.project || "";
  assigneeEl.textContent = task.assignee || "";
  descriptionEl.textContent = task.description || "Add a more detailed description...";
  priorityEl.value = task.priority || "select";
  dueDateEl.value = task.dueDate || "";
}

// EDIT 
export function editMode(el, key) {
  // prevent opening multiple inputs on same field
  if (editingEl[key]) return;

  const textareaEl = document.createElement("textarea");
  textareaEl.classList.add("edit");
  textareaEl.value = el.textContent;

  editingEl[key] = textareaEl;

  el.replaceWith(textareaEl);
  
  textareaEl.style.height = textareaEl.scrollHeight + "px";
  textareaEl.spellcheck = false;

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
  saveField(titleIn, "title");
  saveField(projectEl, "project");
  saveField(descriptionEl, "description");
  saveField(assigneeEl, "assignee");

  saveState();
  renderColContainer();
}

// DELETE
export function confirmDeleting(){
  confirmTaskDelete.showModal();
  confirmBtn.addEventListener("click", () => {
    confirmTaskDelete.close();
    deleteTask();
  });
  notConfirmBtn.addEventListener("click", () => {
    confirmTaskDelete.close();
  });
}
export function deleteTask(){
  for (const col of state.columns) {
    const index = col.tasks.findIndex(t => t.id === currentTask.id);

    if (index !== -1) { // aka if found (not NOT found)
      col.tasks.splice(index, 1);
      break;
    }
  }

  saveState();
  renderColContainer();
  closeTaskDialog();
}


// EVENTS
xmark.addEventListener("click", closeTaskDialog);

titleIn.addEventListener("click", () => {
  editMode(titleIn, "title");
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
  changeTaskPriority(currentTask, e.target.value);
  updatePriorityColor(priorityEl);
  saveAll();
});

dueDateDiv.addEventListener("click", () => {
  dueDateEl.showPicker(); // moderni browseri imaju ovo
});

dueDateEl.addEventListener("change", (e) => {
  changeTaskDueDate(currentTask, e.target.value);
  updateDialogDateUI(dueDateSpan, currentTask);
  saveAll();
});

saveBtnEl.addEventListener("click", saveAll);

deleteBtnEl.addEventListener("click", confirmDeleting);

document.addEventListener("click", (e) => {
  if(e.target === dialog) closeTaskDialog();
})
