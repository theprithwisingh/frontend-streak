const STORAGE_KEY = "TASKS_STORAGE_KEY";
/* =========================
   GET ALL TASKS
========================= */
export const getStoredTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing tasks:", error);
    return [];
  }
};

/* =========================
   SAVE TASKS
========================= */
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

/* =========================
   CREATE TASK
========================= */
export const createTask = (taskData) => {
  const tasks = getStoredTasks();

  const newTask = {
    id: Date.now().toString(), // unique id
    title: taskData.title,
    priority: taskData.priority || "low",
    date: taskData.date || "",
    taskDescription: taskData.taskDescription || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);

  return newTask;
};

/* =========================
   READ TASKS
========================= */
export const readTasks = () => {
  return getStoredTasks();
};

/* =========================
   UPDATE TASK
========================= */
export const updateTask = (id, updatedData) => {
  const tasks = getStoredTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updatedData } : task
  );

  saveTasks(updatedTasks);
  return updatedTasks;
};

/* =========================
   DELETE TASK
========================= */
export const deleteTask = (id) => {
  const tasks = getStoredTasks();

  const filteredTasks = tasks.filter((task) => task.id !== id);

  saveTasks(filteredTasks);
  return filteredTasks;
};