import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CSSVariablesProvider from './context/CSSVariablesProvider.jsx'

// Fix: Set theme immediately before React renders to prevent flash of wrong theme
const initialTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", initialTheme);

createRoot(document.getElementById('root')).render(
  <CSSVariablesProvider>
    <App />
  </CSSVariablesProvider>,
)
