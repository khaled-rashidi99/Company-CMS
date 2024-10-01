export default function getIsAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

export function setIsAuthenticated(isAuthenticated: boolean) {
  localStorage.setItem("isAuthenticated", isAuthenticated.toString());
}
