import React from "react";
import { Sun, Moon } from "lucide-react";

export default function Header({ theme, setTheme }) {
  return (
    <header className="flex justify-between items-start mb-14">
      <div>
        <h1 className="text-5xl font-mono font-bold tracking-tight">TASKS</h1>
        <p className="text-neutral-400 mt-2">
          Organize your work, achieve your goals
        </p>
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-2 border-2 border-neutral-800 bg-neutral-900 px-4 py-2 rounded-lg font-mono font-bold hover:-translate-y-0.5 transition"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        {theme === "dark" ? "LIGHT" : "DARK"}
      </button>
    </header>
  );
}
