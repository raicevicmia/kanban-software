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