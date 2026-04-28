import { moveTask } from "./api.js";
import { renderColContainer } from "./dom.js";

let draggedTaskId = null;

// DRAG START
export function handleDragStart(e) {
  draggedTaskId = Number(e.target.dataset.id);
  e.target.classList.add("dragging");
}

// DRAG END (cleanup)
export function handleDragEnd(e) {
  e.target.classList.remove("dragging");
}

// ALLOW DROP
export function handleDragOver(e) {
  e.preventDefault();
}

// DROP
export function handleDrop(colId) {
  if (!draggedTaskId) return;

  moveTask(draggedTaskId, colId);
  draggedTaskId = null;

  renderColContainer();
}