export function editColTitle(){
  // TO DO
}
export function showMore(){
  // TO DO
}
export function showLess(){
  // TO DO
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