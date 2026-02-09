import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import SmartFormBuilder from "./SmartFormBuilder";
import ExpenseTracker from "./ExpanceTracker";
import SmartFormBuilder from "./SmartFormBuilder";

const App = () => {
  return (
    <BrowserRouter>
    <ExpenseTracker />
      <Routes>
        <Route path="/form" element={<SmartFormBuilder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
