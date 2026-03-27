export let state = {
  columns: [],
  tasks: [],
};

export function loadState() {
  const saved = localStorage.getItem("state");
  if (saved) {
    const parsed = JSON.parse(saved);
    state.columns = parsed.columns || [];
    state.tasks = parsed.tasks || [];
  }
}

export function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}

export function addCol(newColName) {
  if (!newColName) return;
  const newCol = {
    id: Date.now(),
    nameCol: newColName,
  };
  state.columns.push(newCol);
  saveState();
}

export function addTask(taskNameIn, taskDescrIn, col) {
  const taskName = taskNameIn.value.trim();
  if (!taskName) return;

  const taskDescr = taskDescrIn.value.trim();
  if (!taskDescr) return;

  const newTask = {
    id: Date.now(),
    nameTask: taskName,
    content: taskDescr,
    taskColId: col.id,
  };
  state.tasks.push(newTask);
  saveState();

  //console.log(`Novi task za ${col.nameCol}:`, taskName);
  //console.log(state);
}
