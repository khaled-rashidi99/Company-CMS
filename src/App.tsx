import { useEffect } from "react";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { seedData } from "./seed/seed";
import { config } from "./config";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import "./App.css";

function App() {
  if (config.SEED_DATA) {
    // Seed data if the local storage is empty
    useEffect(() => {
      const storedDevices = localStorage.getItem("devices");
      if (storedDevices === null) {
        seedData();
      }
    }, []);
  }

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
