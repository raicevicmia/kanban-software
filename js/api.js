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

export function addTask(taskNameIn, taskDescrIn, col) {
  const taskName = taskNameIn.value.trim();
  if (!taskName) return;

  const taskDescr = taskDescrIn.value.trim();
  if (!taskDescr) return;

  const newTask = {
    id: Date.now(),
    title: taskName,
    content: taskDescr,
  };

  if (!col.tasks) col.tasks = [];

  col.tasks.push(newTask);

  console.log(col);
  saveState();
}

export function moveTaskToColumn(taskId, col) {
  let movedTask;

  state.columns.forEach((col) => {
    const index = col.tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      movedTask = col.tasks.splice(index, 1)[0];
    }
  });

  if (!movedTask) return;
  col.tasks.push(movedTask);

  saveState();
}
