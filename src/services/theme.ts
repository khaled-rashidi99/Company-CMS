import { ThemeMode } from "../types";

export default function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme as ThemeMode;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
}
