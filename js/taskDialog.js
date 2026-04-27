import { saveState, state, changeTaskPriority, changeTaskDueDate, } from "./api.js";
import { renderColContainer } from "./dom.js";
import { autoResize, formatDate, setInputWidth, updateDialogDateUI, updatePriorityColor } from "./utils.js";

const dialog = document.getElementById("task-dialog");

const xmark = dialog.querySelector(".popup-xmark");

const titleIn = dialog.querySelector("#change-task-name");

const projectIn = dialog.querySelector("#change-proj-name");

const assigneeWrap = dialog.querySelector(".task-assignee-wrapper");
const assigneeIn = dialog.querySelector("#change-task-assignee");

const descriptionEl = dialog.querySelector("#change-task-descr");

const priorityDiv = dialog.querySelector(".priority-task");
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

// OPEN / CLOSE
export function openTaskDialog(task) {
  currentTask = task;
  renderTaskDialog(task);
  updatePriorityColor(priorityEl);
  updateDialogDateUI(dueDateSpan, task);
  dialog.showModal();
}
export function closeTaskDialog() {
  dialog.close();
}
document.addEventListener("click", (e) => {
  if(e.target === dialog) closeTaskDialog();
})

// render DATA
export function renderTaskDialog(task) {
  titleIn.value = task.title || "";
  projectIn.value = task.project || "";
  assigneeIn.value = task.assignee || "";
  setInputWidth(assigneeIn);
  //descriptionEl.value = task.description || "Add a more detailed description...";
  priorityEl.value = task.priority || "select";
  dueDateEl.value = task.dueDate || "";
}

// SAVE
export function saveAll() {
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

titleIn.addEventListener("change", () => {
  currentTask.title = titleIn.value.trim();
  titleIn.blur(); 
  saveAll();
});

assigneeWrap.addEventListener("click", () => {
  assigneeIn.focus();
  assigneeIn.setSelectionRange(assigneeIn.value.length, assigneeIn.value.length);
});

assigneeIn.addEventListener("input", () => {
  setInputWidth(assigneeIn);
});

assigneeIn.addEventListener("change", () => {
  currentTask.assignee = assigneeIn.value.trim();
  setInputWidth(assigneeIn);
  assigneeIn.blur();
  saveAll();
});

priorityDiv.addEventListener("click", () => {
  priorityEl.showPicker();
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

projectIn.addEventListener("change", () => {
  currentTask.project = projectIn.value.trim();
  projectIn.blur(); 
  saveAll();
});

descriptionEl.addEventListener("input", () => {
  autoResize(descriptionEl);
  saveAll();
});

saveBtnEl.addEventListener("click", saveAll);
deleteBtnEl.addEventListener("click", confirmDeleting);

