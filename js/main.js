import { state, loadState, saveState, addCol, addTask } from "./api.js";

const addColFormEl = document.querySelector(".add-column");
const addColInputEl = document.getElementById("addCol");
const columnContainerEl = document.querySelector(".column-container");

//localStorage.clear();

loadState();
console.log(state);

render();

addColFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  addCol(addColInputEl.value.trim());
  render();
});

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

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Ukloni";

  const taskForm = document.createElement("form");
  renderTaskForm(taskForm, col, colDiv);

  colDiv.appendChild(h3);
  colDiv.appendChild(deleteBtn);
  colDiv.appendChild(taskForm);

  renderTasks(colDiv, col);

  columnContainerEl.appendChild(colDiv);

  deleteBtn.addEventListener("click", (e) => {
    const column = e.target.parentElement;
    const colId = Number(column.id);

    console.log(colId);

    state.columns = state.columns.filter((c) => c.id !== colId);
    saveState();
    console.log(state);

    column.remove();
  });
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
      taskDiv.dataset.id = task.id;
      console.log(taskDiv.dataset.id);

      const h3 = document.createElement("h3");
      h3.innerText = task.nameTask;

      const p = document.createElement("p");
      p.innerText = task.content;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";

      taskDiv.appendChild(h3);
      taskDiv.appendChild(p);
      taskDiv.appendChild(deleteBtn);
      taskDiv.appendChild(editBtn);

      colDiv.appendChild(taskDiv);

      //2
      deleteBtn.addEventListener("click", (e) => {
        const taskEl = e.target.parentElement;
        const taskId = Number(taskEl.dataset.id);

        state.tasks = state.tasks.filter((t) => t.id !== taskId);
        saveState();

        taskEl.remove();
      });

      //2
      editBtn.addEventListener("click", (e) => {
        const taskEl = e.target.parentElement;
        const h3El = taskEl.children[0];
        const pEl = taskEl.children[1];

        const inputH3 = document.createElement("input");
        inputH3.value = h3El.innerText;

        const inputP = document.createElement("input");
        inputP.value = pEl.innerText;

        h3El.replaceWith(inputH3);
        pEl.replaceWith(inputP);

        //add save option for for inputH3 and inputP

        console.log(h3El, pEl);
      });
    });
}
