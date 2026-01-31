import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (data) => {
    const task = {
      id: Date.now(),
      ...data,
      projectId: data.projectId ? Number(data.projectId) : null,
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "todo" : "completed" }
          : t
      )
    );
  };

  const startEdit = (task) => setEditingTask(task);

  const saveEditTask = (updates) => {
    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id ? { ...t, ...updates } : t
      )
    );
    setEditingTask(null);
  };

  const cancelEditTask = () => setEditingTask(null);

  const filteredTasks = (filters) => {
    return tasks.filter((task) => {
      if (filters.status !== "all" && task.status !== filters.status)
        return false;
      if (filters.priority !== "all" && task.priority !== filters.priority)
        return false;
      if (
        filters.project !== "all" &&
        task.projectId !== Number(filters.project)
      )
        return false;
      return true;
    });
  };

  return {
    tasks,
    editingTask,
    addTask,
    deleteTask,
    toggleStatus,
    startEdit,
    saveEditTask,
    cancelEditTask,
    filteredTasks,
  };
}
