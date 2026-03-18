import { createContext, useContext, useState, useInsertionEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body { background: ${dark ? "#111" : "#fff"}; color: ${dark ? "#fff" : "#000"} }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(v => !v) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
