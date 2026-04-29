import { loadStateFromStorage, saveStateToStorage } from "./storage.js";


export let state = {
  columns: [],
};


//  LOAD & SAVE  

export function loadState() {
  const saved = loadStateFromStorage();
  if (saved) state.columns = saved.columns || [];
}

export function saveState() {
  saveStateToStorage(state);
}


//  COLUMN STATE  

export function addCol(title) {
  const newCol = {
    id: crypto.randomUUID(),
    title,
    tasks: [],
    open: true,
    color: "grey",
  };

  state.columns.push(newCol);
  saveState();

  return newCol;
}

export function toggleOpen(col){
 col.open = !col.open;
 saveState();
 return col.open;
}


//  TASK STATE  

export function addTask(colId, title) {
  const column = state.columns.find(c => c.id === colId);
  if (!column) return;

 const task = {
    id: crypto.randomUUID(),
    title,
    project: "",
    assignee: "",
    description: "",
    priority: "",
    dueDate: "",
    columnId: colId,
 };

  column.tasks.push(task);
  saveState();

  return task;
}

export function changeTaskPriority(task, newPriority){
  task.priority = newPriority;
  saveState();
}

export function changeTaskDueDate(task, newDate){
  task.dueDate = newDate;
  saveState();
}

export function moveTask(taskId, colId, afterTaskId) {
  let movedTask = null;

  for (const col of state.columns) {
    const index = col.tasks.findIndex(t => t.id === taskId);

    if (index !== -1) {
      movedTask = col.tasks.splice(index, 1)[0];
      break;
    }
  }
  if (!movedTask) return;

  const targetCol = state.columns.find(c => c.id === colId);
  if (!targetCol) return;

  let insertIndex = targetCol.tasks.length;

  if (afterTaskId) {
    const afterIndex = targetCol.tasks.findIndex(t => t.id === afterTaskId);
    if (afterIndex !== -1) {
      insertIndex = afterIndex;
    }
  }

  targetCol.tasks.splice(insertIndex, 0, movedTask);

  saveState();
}

