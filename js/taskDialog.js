import { saveState, state, changeTaskPriority, changeTaskDueDate, } from "./api.js";
import { renderColContainer } from "./dom.js";
import { autoResize, formatDate, handleNameSubmission, isTitleValid, setInputWidth, updateDialogDateUI, updatePriorityColor } from "./utils.js";

const dialog = document.getElementById("task-dialog");

const xmark = dialog.querySelector(".popup-xmark");

const titleIn = dialog.querySelector("#change-task-name");
const error = dialog.querySelector(".missing-title");

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
const deleteBtnEl = dialog.querySelector(".popup-delete");

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
  if (e.target !== dialog) return;

  if (!isTitleValid(titleIn)) {
    handleNameSubmission(error, titleIn);
    return;
  }

  closeTaskDialog();
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!dialog.open) return;

  if (!isTitleValid(titleIn)) {
    e.preventDefault();
    e.stopPropagation();
    handleNameSubmission(error, titleIn);
    return;
  }

  dialog.close();
});


// render data
export function renderTaskDialog(task) {
  titleIn.value = task.title || "";
  projectIn.value = task.project || "";
  assigneeIn.value = task.assignee || "";
  setInputWidth(assigneeIn);
  descriptionEl.value = task.description || "";
  priorityEl.value = task.priority || "Priority";
  dueDateEl.value = task.dueDate || "";
}

// SAVE
export function saveAll() {
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
xmark.addEventListener("click", () => {
  if (!isTitleValid(titleIn)) {
    handleNameSubmission(error, titleIn);
    return;
  }

  closeTaskDialog();
});


titleIn.addEventListener("change", () => {
  if(isTitleValid(titleIn)){
    currentTask.title = titleIn.value.trim();
    titleIn.blur(); 
    saveAll();
  } else {
    handleNameSubmission(error, titleIn);
    return;
  }
});
titleIn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!isTitleValid(titleIn)) {
      handleNameSubmission(error, titleIn);
    }
  }
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
  dueDateEl.showPicker(); 
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
  currentTask.description = descriptionEl.value.trim();
  autoResize(descriptionEl);
  saveAll();
});


saveBtnEl.addEventListener("click", saveAll);
deleteBtnEl.addEventListener("click", confirmDeleting);

