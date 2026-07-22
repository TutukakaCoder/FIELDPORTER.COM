/** Force the site into dark mode and sync any listening UI. */
export function forceDarkMode() {
  if (typeof document === "undefined") return;

  try {
    localStorage.setItem("theme", "dark");
  } catch {
    // ignore storage errors
  }

  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
  window.dispatchEvent(new Event("fieldporter-theme-force-dark"));
}
