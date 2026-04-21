export function loadStateFromStorage() {
  const saved = localStorage.getItem("state");
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }

}

export function saveStateToStorage(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

export function saveBg(image) {
  localStorage.setItem("bg-image", image);
}

export function loadBg() {
  return localStorage.getItem("bg-image");
}

export function clearBg() {
  localStorage.removeItem("bg-image");
}