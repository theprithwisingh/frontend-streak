// import React, { useContext, useEffect, useState } from "react";
// import { createContext } from "react";

// const CSSVariableContext = createContext(null);

// const CSSVariablesProvider = ({ children }) => {
//   const [theme, setTheme] = useState(getStoredTheme);

//   function themeBadalneWalaFunction() {
//     setTheme((prev) => {
//       const next = prev === "light" ? "dark" : "light";
//       document.documentElement.setAttribute("data-theme", next);
//       localStorage.setItem("theme", next);
//       return next;
//     });
//   }
//   function getStoredTheme() {
//     return localStorage.getItem("theme") || "light";
//   }
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", "light");
//   }, [theme]);

//   return (
//     <CSSVariableContext.Provider value={{ theme, themeBadalneWalaFunction }}>
//       {/* Context Provider jo apne children ko theme system ka access dene ke liye wrapper ka kaam karta hai */}
//       {children}
//     </CSSVariableContext.Provider>
//   );
// };
// export default CSSVariablesProvider;

// export const useCSSVariable = () => {
//   const context = useContext(CSSVariableContext);
//   if (!context) {
//     throw new Error(
//       "useCSSVariable must be used inside CSSVariablesProvider or some errr",
//     );
//   }
//   return context;
// };


import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const CSSVariableContext = createContext(null);

function getStoredTheme() {
  return localStorage.getItem("theme") || "light";
}

const CSSVariablesProvider = ({ children }) => {
  // Fix: Call getStoredTheme() to get the actual value, not pass the function reference
  const [theme, setTheme] = useState(() => getStoredTheme());

  function themeBadalneWalaFunction() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      return next;
    });
  }

  useEffect(() => {
    // Fix: Apply theme immediately on mount and whenever it changes
    // This ensures DOM stays in sync with React state
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <CSSVariableContext.Provider value={{ theme, themeBadalneWalaFunction }}>
      {children}
    </CSSVariableContext.Provider>
  );
};

export default CSSVariablesProvider;

export const useCSSVariable = () => {
  const context = useContext(CSSVariableContext);
  if (!context) {
    throw new Error(
      "useCSSVariable must be used inside CSSVariablesProvider or some errr",
    );
  }
  return context;
};
