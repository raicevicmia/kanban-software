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
    id: Date.now(),
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
    id: Date.now(),
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
}

export function changeTaskDueDate(task, newDate){
  task.dueDate = newDate;
}

export function moveTask(taskId, colId, afterTaskId) {
  let movedTask = null;

  // 1. remove from ANY column
  let sourceCol = null;

  for (const col of state.columns) {
    const index = col.tasks.findIndex(t => t.id === taskId);

    if (index !== -1) {
      sourceCol = col;
      movedTask = col.tasks.splice(index, 1)[0];
      break;
    }
  }

  if (!movedTask) return;

  // 2. find target column
  const targetCol = state.columns.find(c => c.id === colId);
  if (!targetCol) return;

  // 3. compute insert index
  let insertIndex = targetCol.tasks.length;

  if (afterTaskId) {
    const afterIndex = targetCol.tasks.findIndex(t => t.id === afterTaskId);
    if (afterIndex !== -1) {
      insertIndex = afterIndex;
    }
  }

  // 4. insert
  targetCol.tasks.splice(insertIndex, 0, movedTask);

  saveState();
}

