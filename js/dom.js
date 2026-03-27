import { addTask, saveState } from "./api.js";

export const addColFormEl = document.querySelector(".add-column");
export const addColInputEl = document.getElementById("addCol");
export const columnContainerEl = document.querySelector(".column-container");

export function render(state) {
  columnContainerEl.innerHTML = "";
  state.columns.forEach((col) => renderCols(col, state));
}

export function renderCols(col, state) {
  // TODO styling:  colDiv.classList.add("column");
  const colDiv = document.createElement("div");
  colDiv.id = `${col.id}`;

  const h3 = document.createElement("h3");
  h3.innerText = col.nameCol;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Ukloni";

  const taskForm = document.createElement("form");
  renderTaskForm(taskForm, col, colDiv, state);

  colDiv.append(h3, deleteBtn, taskForm);
  renderTasks(colDiv, col, state);

  columnContainerEl.appendChild(colDiv);

  deleteBtn.addEventListener("click", () => {
    state.columns = state.columns.filter((c) => c.id !== col.id);
    state.tasks = state.tasks.filter((t) => t.taskColId !== col.id);
    saveState();
    colDiv.remove();

    //console.log(state);
  });
}

export function renderTaskForm(taskForm, col, colDiv, state) {
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

  taskForm.append(taskNameIn, taskDescrIn, taskBtn);

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(taskNameIn, taskDescrIn, col);
    render(state);
  });
}

export function renderTasks(colDiv, col, state) {
  colDiv.querySelectorAll(".task").forEach((t) => t.remove());

  state.tasks
    .filter((task) => task.taskColId === col.id)
    .forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task"); // za cleanup
      taskDiv.dataset.id = task.id;
      //console.log(taskDiv.dataset.id);

      const h3 = document.createElement("h3");
      h3.innerText = task.nameTask;

      const p = document.createElement("p");
      p.innerText = task.content;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";

      taskDiv.append(h3, p, deleteBtn, editBtn);
      colDiv.appendChild(taskDiv);
      //2
      deleteBtn.addEventListener("click", () => {
        const taskId = task.id;
        state.tasks = state.tasks.filter((t) => t.id !== taskId);
        saveState();
        taskDiv.remove();
      });
      //2
      /*
      editBtn.addEventListener("click", () => {
        const inputH3 = document.createElement("input");
        inputH3.value = h3El.innerText;

        const inputP = document.createElement("input");
        inputP.value = pEl.innerText;

        h3El.replaceWith(inputH3);
        pEl.replaceWith(inputP);

        //add save option for for inputH3 and inputP
        console.log(h3El, pEl);
      });*/
    });
}
