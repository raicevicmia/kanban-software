export let state = {
  columns: [],
};

export function loadState() {
  const saved = localStorage.getItem("state");
  if (saved) state.columns = JSON.parse(saved).columns || [];
}

export function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}

export function addCol(newColName) {
  if (!newColName) return;

  const newCol = {
    id: Date.now(),
    title: newColName,
    tasks: [],
  };

  state.columns.push(newCol);
  saveState();
}

export function addTask(title, content, col) {
  if (!title || !content) return;

  const newTask = {
    id: Date.now(),
    title,
    content,
  };

  col.tasks.push(newTask);
  saveState();
}

export function moveTaskToColumn(taskId, col, afterElement) {
  let movedTask;

  state.columns.forEach((c) => {
    const index = c.tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      movedTask = c.tasks.splice(index, 1)[0];
    }
  });

  if (!movedTask) return;

  let insertIndex = col.tasks.length;
  if (afterElement) {
    const afterId = Number(afterElement.dataset.id);
    insertIndex = col.tasks.findIndex((t) => t.id === afterId);
  }

  col.tasks.splice(insertIndex, 0, movedTask);

  saveState();
}
