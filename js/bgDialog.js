import { saveBg, loadBg, clearBg } from "./storage.js";

export function initBgDialog() {
  const input = document.getElementById("bg-upload-input");
  const resetBtn = document.querySelector(".bg-reset");
  const closeBtn = document.querySelector(".bg-close");

  // LOAD SAVED BACKGROUND
  const savedBg = loadBg();
  if (savedBg) {
    document.body.style.setProperty("--bg-image", `url(${savedBg})`);
    document.body.classList.add("has-bg");
  }

  // UPLOAD IMAGE
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;

      document.body.style.setProperty("--bg-image", `url(${imageUrl})`);
      document.body.classList.add("has-bg");

      saveBg(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  resetBtn.onclick = () => {
    clearBg();
    document.body.style.removeProperty("--bg-image");
    document.body.classList.remove("has-bg");
  };

  closeBtn.onclick = () => {
    const dialog = document.getElementById("bg-dialog");
    dialog.close();
  };
}

export function openBgDialog() {
  const dialog = document.getElementById("bg-dialog");
  dialog.showModal();
}