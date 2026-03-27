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

  const h2 = document.createElement("h2");
  h2.innerText = col.nameCol;

  const renameColBtn = document.createElement("button");
  renameColBtn.innerText = "Preimenuj";

  const delColBtn = document.createElement("button");
  delColBtn.innerText = "Ukloni";

  const taskForm = document.createElement("form");
  renderTaskForm(taskForm, col, state);

  colDiv.append(h2, renameColBtn, delColBtn, taskForm);
  renderTasks(colDiv, col, state);

  columnContainerEl.appendChild(colDiv);

  renameColBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = col.nameCol;
    h2.replaceWith(input);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        col.nameCol = input.value;
        saveState();
        h2.innerText = col.nameCol;
        input.replaceWith(h2);
      }
    });
  });

  delColBtn.addEventListener("click", () => {
    state.columns = state.columns.filter((c) => c.id !== col.id);
    state.tasks = state.tasks.filter((t) => t.taskColId !== col.id);
    saveState();
    colDiv.remove();
  });
}

export function renderTaskForm(taskForm, col, state) {
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

      const h3 = document.createElement("h3");
      h3.innerText = task.nameTask;

      const p = document.createElement("p");
      p.innerText = task.content;

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edituj";

      taskDiv.append(h3, p, deleteBtn, editBtn);
      colDiv.appendChild(taskDiv);

      deleteBtn.addEventListener("click", () => {
        state.tasks = state.tasks.filter((t) => t.id !== task.id);
        saveState();
        taskDiv.remove();
      });

      editBtn.addEventListener("click", () => {
        const inputH3 = document.createElement("input");
        inputH3.value = h3.innerText;

        const inputP = document.createElement("input");
        inputP.value = p.innerText;

        h3.replaceWith(inputH3);
        p.replaceWith(inputP);

        taskDiv.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            task.nameTask = inputH3.value;
            task.content = inputP.value;

            saveState();

            h3.innerText = task.nameTask;
            p.innerText = task.content;

            inputH3.replaceWith(h3);
            inputP.replaceWith(p);
          }
        });

        //add save option for for inputH3 and inputP
        console.log();
      });
    });
}
