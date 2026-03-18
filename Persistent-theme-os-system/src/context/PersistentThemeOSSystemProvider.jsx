import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const PersistentThemeOSSContext = createContext(null);

// Hook for consuming the theme in components
export const usePersistentTheme = () => {
  const context = useContext(PersistentThemeOSSContext);
  if (!context) {
    throw new Error(
      "usePersistentTheme must be used within PersistentThemeOSSystemProvider",
    );
  }
  return context;
};

const PersistentThemeOSSystemProvider = ({ children }) => {
  // Detect OS preferred color scheme
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  // Initialise from explicit user choice (if any) otherwise from system
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored || getSystemTheme();
  });

  // Track whether user has explicitly overridden the system theme
  const [userHasOverride, setUserHasOverride] = useState(() => {
    return Boolean(localStorage.getItem("theme"));
  });

  // Apply theme to DOM via data-attribute; CSS handles actual colors
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    if (userHasOverride) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme, userHasOverride]);

  // Listen to OS theme changes when user has not explicitly overridden
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e) => {
      if (!userHasOverride) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [userHasOverride]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setUserHasOverride(true);
  };

  const value = { theme, toggleTheme };

  return (
    <PersistentThemeOSSContext.Provider value={value}>
      {children}
    </PersistentThemeOSSContext.Provider>
  );
};

export default PersistentThemeOSSystemProvider;

//                                     App Load
//                                        ↓
//                                     localStorage check
//                                        ↓
//                                     If not found → OS theme detect
//                                        ↓
//                                     Theme apply to DOM
//                                        ↓
//                                     User toggle → override → persist

// OS Theme ─┐
//           ├──► Initial Theme Resolver ─► React State ─► DOM Root ─► UI
// Storage ──┘                          ▲
//                                      │
//                                 User Toggle
