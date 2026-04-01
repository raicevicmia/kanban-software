export function getDragAfterElement(container, y) {
  // kolona i pozicija misa
  const draggableElements = [
    ...container.querySelectorAll(".task:not(.dragging)"),
  ];
  // draggableElements = [taskDivA, taskDivB, taskDivC]

  return draggableElements.reduce(
    // child is an el from draggableElemets[]
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - (box.top + box.height / 2);

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child }; // this updates the closest
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
