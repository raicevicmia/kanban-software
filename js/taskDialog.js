const dialog = document.getElementById("task-dialog");

export function openTaskDialog(task){
    fillDialog(task);
    dialog.showModal();
}

export function closeTaskDialog(){
    dialog.close();
}

export function fillDialog(task){
  dialog.querySelector(".task-name").textContent = task.title;
  dialog.querySelector(".task-proj").textContent = task.project || "";
  dialog.querySelector(".task-assignee").textContent = task.assignee || "";
  dialog.querySelector(".task-description").textContent = task.description || "";
  dialog.querySelector("#task-priority").value = task.priority || "select";
  dialog.querySelector("#task-due-date").value = task.dueDate || "";
}

dialog.querySelector(".popup-xmark").addEventListener("click", () => {
  dialog.close();
});