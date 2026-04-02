import { addTask, moveTaskToColumn, saveState } from "./api.js";
import { getDragAfterElement } from "./utils.js";

export const addColFormEl = document.querySelector(".add-col-form");
export const addColInputEl = document.getElementById("add-col-in");
export const columnContainerEl = document.querySelector(".column-container");

export function render(state) {
  columnContainerEl.innerHTML = "";
  state.columns.forEach((col) => renderCols(col, state));
}

export function renderCols(col, state) {
  const colDiv = document.createElement("div");
  colDiv.classList.add("column");

  const title = document.createElement("div");
  title.classList.add("column-title");

  const changeTitle = document.createElement("div");
  changeTitle.classList.add("change-title");

  const h1 = document.createElement("h1");
  h1.innerText = col.title;

  const renameColBtn = document.createElement("button");
  renameColBtn.innerText = "🖊️";

  const delColBtn = document.createElement("button");
  delColBtn.innerText = "❌";

  changeTitle.append(renameColBtn, delColBtn);

  title.append(h1, changeTitle);

  const taskForm = document.createElement("form");
  renderTaskForm(taskForm, col, state);

  colDiv.append(title, taskForm);
  renderTasks(colDiv, col);

  columnContainerEl.appendChild(colDiv);

  renameColBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = col.title;
    h1.replaceWith(input);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        col.title = input.value;
        saveState();
        h1.innerText = col.title;
        input.replaceWith(h1);
      }
    });
  });

  delColBtn.addEventListener("click", () => {
    state.columns = state.columns.filter((c) => c.id !== col.id);
    saveState();
    colDiv.remove();
  });

  colDiv.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  colDiv.addEventListener("drop", (e) => {
    e.preventDefault();

    const taskId = Number(e.dataTransfer.getData("text/plain"));

    const afterElement = getDragAfterElement(colDiv, e.clientY);

    moveTaskToColumn(taskId, col, afterElement);

    render(state);
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

    const title = taskNameIn.value.trim();
    const content = taskDescrIn.value.trim();

    if (!title || !content) return;

    addTask(title, content, col);
    render(state);
  });
}

export function renderTasks(colDiv, col) {
  colDiv.querySelectorAll(".task").forEach((t) => t.remove());

  col.tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task"); // za cleanup
    taskDiv.setAttribute("draggable", "true");
    taskDiv.dataset.id = task.id;

    const h3 = document.createElement("h3");
    h3.innerText = task.title;

    const p = document.createElement("p");
    p.innerText = task.content;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edituj";

    taskDiv.append(h3, p, deleteBtn, editBtn);
    colDiv.appendChild(taskDiv);

    deleteBtn.addEventListener("click", () => {
      col.tasks = col.tasks.filter((t) => t.id !== task.id);
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
          task.title = inputH3.value;
          task.content = inputP.value;

          saveState();

          h3.innerText = task.title;
          p.innerText = task.content;

          inputH3.replaceWith(h3);
          inputP.replaceWith(p);
        }
      });
    });

    taskDiv.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", task.id);
      taskDiv.classList.add("dragging");
    });

    taskDiv.addEventListener("dragend", () => {
      taskDiv.classList.remove("dragging");
    });
  });
}
