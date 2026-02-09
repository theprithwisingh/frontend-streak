import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BasiccontextProvider from './context/BasiccontextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BasiccontextProvider>
    <App />
  </BasiccontextProvider>,
)
