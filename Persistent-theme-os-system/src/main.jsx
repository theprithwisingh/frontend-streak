import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PersistentThemeOSSystemProvider from './context/PersistentThemeOSSystemProvider.jsx'


createRoot(document.getElementById('root')).render(
  <PersistentThemeOSSystemProvider>
    <App />
  </PersistentThemeOSSystemProvider>,
)
