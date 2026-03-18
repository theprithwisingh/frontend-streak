import React from "react";
import MainLayout from "./layout/MainLayout";
import TaskProvider from "./context/TaskProvider";
// import Sidebar from "./layout/Sidebar";
// import Header from "./layout/Header";

const App = () => {
  return (
    <>
    <TaskProvider>
      <div className="min-h-screen bg-slate-100 p-6">
        <MainLayout />
      </div>
    </TaskProvider>
    </>
  );
};

export default App;