import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import TaskHeader from "../components/tasks/TaskHeader";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    project: "all",
  });

  const tasksApi = useTasks();
  const projectsApi = useProjects();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-neutral-950 text-white transition">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Header theme={theme} setTheme={setTheme} />

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              projectsApi={projectsApi}
            />

            <main>
              <TaskHeader tasks={tasksApi.filteredTasks(filters)} />

              <TaskForm
                projects={projectsApi.projects}
                addTask={tasksApi.addTask}
                editingTask={tasksApi.editingTask}
                saveEditTask={tasksApi.saveEditTask}
                cancelEditTask={tasksApi.cancelEditTask}
              />

              <TaskList
                tasks={tasksApi.filteredTasks(filters)}
                projects={projectsApi.projects}
                toggleStatus={tasksApi.toggleStatus}
                deleteTask={tasksApi.deleteTask}
                startEdit={tasksApi.startEdit}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
