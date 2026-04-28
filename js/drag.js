import { moveTask } from "./api.js";
import { renderColContainer } from "./dom.js";
import { getDragAfterElement } from "./utils.js";

let draggedTaskId = null;
let afterTaskId = null;

// DRAG START
export function handleDragStart(e) {
  draggedTaskId = Number(e.target.dataset.id);
  e.target.classList.add("dragging");
}

// DRAG END (cleanup)
export function handleDragEnd(e) {
  e.target.classList.remove("dragging");

  draggedTaskId = null;
  afterTaskId = null;
}

// ALLOW DROP
export function handleDragOver(e) {
  e.preventDefault(); // to allow dropping

  const container = e.currentTarget;

  const afterElement = getDragAfterElement(container, e.clientY);

  afterTaskId = afterElement?.dataset.id
    ? Number(afterElement.dataset.id)
    : null;
}

// DROP
export function handleDrop(colId) {
  if (!draggedTaskId) return;

  moveTask(draggedTaskId, colId, afterTaskId);

  draggedTaskId = null;
  afterTaskId = null;

  renderColContainer();
}