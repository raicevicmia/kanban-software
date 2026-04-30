import { state, toggleOpen } from "./api.js";

export function toggleTasks(col, container, chevron, footer){
  const isOpen = toggleOpen(col);
  applyIsColOpen(isOpen, container, chevron, footer);
}

export function applyIsColOpen(isOpen, container, chevron, footer){
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

export function setPriorityColor(select){
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

/* error handling */

export function isTitleValid(title){
  return title.value.trim().length > 0;
}

export function handleNameSubmission(error, input){
  error.textContent = "Please fill out this field!";

  input.addEventListener("input", () => {
    error.textContent = "";
  }, { once: true });

  setTimeout(() => {
    error.textContent = "";
  }, 3000);
}

export function getDragAfterElement(container, y) {
  const tasks = [...container.querySelectorAll(".task:not(.dragging)")];

  return tasks.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - ( box.top + box.height / 2);

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }

      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
