import React, { useState } from 'react'
import { useCallback } from 'react';
import { createContext } from "react";
import { useContext } from "react";


//first create global provider or global scope
export const BasicThemeContext = createContext(null);

// second then providing value to consumers or components
const BasiccontextProvider = ({children}) => {
  const [theme, setTheme]=useState("light")
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  return (
    <BasicThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </BasicThemeContext.Provider>
  )
}
export default BasiccontextProvider;

// import { BasicThemeContext } from "./BasicThemeContext";

export const useBasicThemeContext = () => {
  const context = useContext(BasicThemeContext);

  if (!context) {
    throw new Error("useBasicThemeContext must be used inside BasicThemeProvider");
  }

  return context;
};
