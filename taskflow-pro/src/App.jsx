import React from 'react'
import { useTheme } from "./context/ThemeContext";
import Navbar from './components/Navbar';
import MiddleBody from './components/MiddleBody';
import Footer from './components/Footer';

const App = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme === "light" ? "#fff" : "#020617",
        color: theme === "light" ? "#000" : "#fff",
        padding: "40px",
      }}
    >
      <Navbar />
      <MiddleBody/>
      <Footer/>
    </div>
  );
};

export default App;
