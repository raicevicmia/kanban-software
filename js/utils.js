import { state, toggleOpen } from "./api.js";

export function toggleTasks(col, container, chevron, footer){
  const isOpen = toggleOpen(col);
  applyColState(isOpen, container, chevron, footer);
}

export function applyColState(isOpen, container, chevron, footer){
  container.classList.toggle("collapsed", !isOpen);
  footer.classList.toggle("collapsed", !isOpen);  
  chevron.classList.toggle("rotated", !isOpen);
}

export function getPrioColor(task, taskEl){
  let taskColor = null;
  taskEl.classList.remove("green-border", "yellow-border", "red-border");

  switch(task.priority){
    case "low":
      taskEl.classList.add("green-border");
      break;

    case "medium":
      taskEl.classList.add("yellow-border");
      break;

    case "high":
      taskEl.classList.add("red-border");
      break;
    }

  return taskColor;
}

export function applyColClr(col, title) {
  title.dataset.color = col.color;
}

export function updatePriorityColor(select){
  select.dataset.priority = select.value;
}

export function formatDate(dateString){
  const date = new Date(dateString);

  if (isNaN(date)) return ""; 

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });
}

export function updateDialogDateUI(dateUI, task){
  dateUI.textContent = formatDate(task.dueDate) || "Select date";

  if(formatDate(task.dueDate)){
    dateUI.classList.add("date-added");
  } else {
    dateUI.classList.remove("date-added");
  }
}

export function setInputWidth(el) {
  el.style.width = Math.max(3, el.value.length + 2) + "ch";
}

export function autoResize(el) {
  el.style.height = 'auto'; 
  el.style.height = el.scrollHeight + "px";
}



/*
export function getColClr(task){
  return state.columns.find(c => c.id === task.columnId).color;
}

export function applyTaskHeaderClr(taskHeader, task){
  taskHeader.dataset.color = getColClr(task);
  console.log(taskHeader.dataset.color);
}
*/

/*
export function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".task:not(.dragging)"),
  ];

  let closest = { offset: Number.NEGATIVE_INFINITY, element: null };

  draggableElements.forEach((child) => {
    const box = child.getBoundingClientRect();
    const offset = y - (box.top + box.height / 2);

    if (offset < 0 && offset > closest.offset) {
      closest = { offset, element: child };
    }
  });

  return closest.element;
}

export function showError(container, message) {
  const error = container.querySelector(".error");
  if (error) return;
  else {
    const error = document.createElement("p");
    error.classList.add("error");
    error.innerText = message;
    container.appendChild(error);
    return;
  }
}

export function clearError(container) {
  const error = container.querySelector(".error");
  if (error) error.remove();
}
*/

/*
export function getPriorityColor(task, circle){
  let circleColor = null;

  switch(task.priority){
    case "Low":
      circle.classList.add("prio-low");
      break;

    case "Medium":
      circle.classList.add("prio-medium");
      break;

    case "High":
      circle.classList.add("prio-high");
      break;
    }

  return circleColor;
}
*/