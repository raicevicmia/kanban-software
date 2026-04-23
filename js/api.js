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
