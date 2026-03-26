const addColFormEl = document.querySelector(".add-column");
const addColInputEl = document.getElementById("addCol");
const columnContainerEl = document.querySelector(".column-container");

let state = {
  columns: [],
  tasks: [],
};

localStorage.clear();

loadState();
console.log(state);

render();

addColFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  addCol();
  render();
});

function loadState() {
  const saved = localStorage.getItem("state");

  if (saved) {
    state = JSON.parse(saved);
  }
}

function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}

function addCol() {
  const newColName = addColInputEl.value.trim();
  if (!newColName) return;
  const newCol = {
    id: state.columns.length,
    nameCol: newColName,
  };
  state.columns.push(newCol);
  saveState();
}

function addTask(taskNameIn, taskDescrIn, col) {
  const taskName = taskNameIn.value.trim();
  if (!taskName) return;

  const taskDescr = taskDescrIn.value.trim();
  if (!taskDescr) return;

  const newTask = {
    id: state.tasks.length,
    nameTask: taskName,
    content: taskDescr,
    taskColId: col.id,
  };
  state.tasks.push(newTask);
  saveState();

  console.log(`Novi task za ${col.nameCol}:`, taskName);
  console.log(state);

  taskNameIn.value = "";
}

function render() {
  columnContainerEl.innerHTML = "";
  state.columns.forEach((col) => {
    renderCols(col);
  });
}

function renderCols(col) {
  // TODO styling:  colDiv.classList.add("column");
  const colDiv = document.createElement("div");
  colDiv.id = `${col.id}`;

  const h3 = document.createElement("h3");
  h3.innerText = col.nameCol;

  const taskForm = document.createElement("form");
  renderTaskForm(taskForm, col, colDiv);

  colDiv.appendChild(h3);
  colDiv.appendChild(taskForm);

  renderTasks(colDiv, col);

  columnContainerEl.appendChild(colDiv);
  //console.log(colDiv.id);
}

function renderTaskForm(taskForm, col) {
  // TODO styling: taskForm.classList.add("add-task");
  const taskNameIn = document.createElement("input");
  taskNameIn.type = "text";
  taskNameIn.placeholder = "Upisi ime task-a...";

  const taskDescrIn = document.createElement("input");
  taskDescrIn.type = "text";
  taskDescrIn.placeholder = "Upisi task...";

  const taskBtn = document.createElement("button");
  taskBtn.type = "submit";
  taskBtn.innerText = "Dodaj task";

  taskForm.appendChild(taskNameIn);
  taskForm.appendChild(taskDescrIn);
  taskForm.appendChild(taskBtn);

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(taskNameIn, taskDescrIn, col);
    render();
  });
}

function renderTasks(colDiv, col) {
  const existingTasks = colDiv.querySelectorAll(".task");
  existingTasks.forEach((t) => t.remove());

  state.tasks
    .filter((task) => task.taskColId === col.id)
    .forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task"); // za cleanup

      const h3 = document.createElement("h3");
      h3.innerText = task.nameTask;

      const p = document.createElement("p");
      p.innerText = task.content;

      taskDiv.appendChild(h3);
      taskDiv.appendChild(p);

      colDiv.appendChild(taskDiv);
    });
}
