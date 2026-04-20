import { toggleOpen } from "./api.js";

export function toggleTasks(col, container, chevron, footer){
  const isOpen = toggleOpen(col);
  applyColState(isOpen, container, chevron, footer);
}

export function applyColState(isOpen, container, chevron, footer){
  container.classList.toggle("collapsed", !isOpen);
  footer.classList.toggle("collapsed", !isOpen);  
  chevron.classList.toggle("rotated", !isOpen);
}

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

export function formatDate(dateString){
  const date = new Date(dateString);

  if (isNaN(date)) return ""; 

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });
}

export function applyColClr(col, title) {
  title.dataset.color = col.color;
}





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