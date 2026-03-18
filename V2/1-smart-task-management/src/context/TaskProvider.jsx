import React from "react";
import { createContext, useContext, useState } from "react";

const TaskContext = createContext();
const data = localStorage.getItem("TASKS_STORAGE_KEY");
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(data);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};

export default TaskProvider;