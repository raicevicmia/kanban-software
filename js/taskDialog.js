import { changeTaskField } from "./api.js";
import { renderColContainer } from "./dom.js";
import { autoResize, formatDate, handleNameSubmission, isTitleValid, setInputWidth, updateDialogDateUI, setPriorityColor } from "./utils.js";

const dialog = document.getElementById("task-dialog");

const xmark = dialog.querySelector(".popup-xmark");

const titleIn = dialog.querySelector("#change-task-name");
const error = dialog.querySelector(".missing-title");

const projectIn = dialog.querySelector("#change-proj-name");

const assigneeWrap = dialog.querySelector(".task-assignee-wrapper");
const assigneeIn = dialog.querySelector("#change-task-assignee");

const descriptionIn = dialog.querySelector("#change-task-descr");

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

// open & close
export function openTaskDialog(task) {
  currentTask = task;
  renderTaskDialog(task);
  dialog.showModal();
}
export function closeTaskDialog() {
  dialog.close();
  renderColContainer();
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


// render data on open
export function renderTaskDialog(task) {
  titleIn.value = task.title || "";
  projectIn.value = task.project || "";
  assigneeIn.value = task.assignee || "";
  descriptionIn.value = task.description || "";
  priorityEl.value = task.priority || "select";
  dueDateEl.value = task.dueDate || "";

  setInputWidth(assigneeIn);
  setPriorityColor(priorityEl);
  updateDialogDateUI(dueDateSpan, task);
  requestAnimationFrame(() => {
    autoResize(descriptionIn);
  });
}


// delete
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


// events
xmark.addEventListener("click", () => {
  if (!isTitleValid(titleIn)) {
    handleNameSubmission(error, titleIn);
    return;
  }

  closeTaskDialog();
});


titleIn.addEventListener("change", () => {
  if(isTitleValid(titleIn)){
    changeTaskField(currentTask, "title", titleIn.value.trim());
    titleIn.blur(); 
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
  changeTaskField(currentTask, "assignee", assigneeIn.value.trim());
  setInputWidth(assigneeIn);
  assigneeIn.blur();
});


priorityDiv.addEventListener("click", () => {
  priorityEl.showPicker();
});
priorityEl.addEventListener("change", (e) => {
  changeTaskField(currentTask, "priority", e.target.value);
  setPriorityColor(priorityEl);
});


dueDateDiv.addEventListener("click", () => {
  dueDateEl.showPicker(); 
});
dueDateEl.addEventListener("change", (e) => {
  changeTaskField(currentTask, "dueDate", e.target.value);
  updateDialogDateUI(dueDateSpan, currentTask);
});


projectIn.addEventListener("change", () => {
  changeTaskField(currentTask, "project", projectIn.value.trim());
  projectIn.blur(); 
});


descriptionIn.addEventListener("input", () => {
  changeTaskField(currentTask, "description", descriptionIn.value.trim());
});
descriptionIn.addEventListener("keydown", (e) => {
  if(e.key !== "Enter") return;

  if(e.shiftKey){
    return;
  }
  
  changeTaskField(currentTask, "description", descriptionIn.value.trim());
  descriptionIn.blur();
});


saveBtnEl.addEventListener("click", () => {
  closeTaskDialog();
});
deleteBtnEl.addEventListener("click", confirmDeleting);
