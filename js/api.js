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

export function moveTask(taskId, newColId) {
  let movedTask = null;
 
  // remove from old column & store
  const sourceCol = state.columns.find(col =>
    col.tasks.some(t => t.id === taskId)
  );
  if (!sourceCol) return;

  const index = sourceCol.tasks.findIndex(t => t.id === taskId);
  movedTask = sourceCol.tasks.splice(index, 1)[0];
  console.log(movedTask);

  if (!movedTask) return;

  // add to new column
  const newCol = state.columns.find(c => c.id === newColId);

  movedTask.columnId = newColId;
  newCol.tasks.push(movedTask);

  saveState();
}

