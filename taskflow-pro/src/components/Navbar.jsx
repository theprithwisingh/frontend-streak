import { useTheme } from "../context/ThemeContext";
import React from "react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        padding: "16px",
        background: theme === "light" ? "#f3f4f6" : "#111827",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h3>Theme Changer</h3>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
};

export default Navbar;
