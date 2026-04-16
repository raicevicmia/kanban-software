import { loadStateFromStorage, saveStateToStorage } from "./storage.js";

export let state = {
  columns: [],
};

export function loadState() {
  const saved = loadStateFromStorage();
  if (saved) state.columns = saved.columns || [];
}

export function saveState() {
  saveStateToStorage(state);
}

export function addCol(title) {
  const newCol = {
    id: Date.now(),
    title,
    tasks: [],
  };

  state.columns.push(newCol);
  saveState();

  return newCol;
}

export function addTask(colId, title) {
  const column = state.columns.find(c => c.id === colId);
  if (!column) return;

  const task = {
    id: Date.now(),
    title,
  };

  column.tasks.push(task);
  saveState();

  return task;
}

/*
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
}*/
