import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  projects,
  toggleStatus,
  deleteTask,
  startEdit,
}) {
  if (!tasks.length) {
    return (
      <div className="text-center py-24 text-neutral-400">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="font-mono font-bold text-lg mb-2">No tasks found</h3>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          project={projects.find((p) => p.id === task.projectId)}
          toggleStatus={toggleStatus}
          deleteTask={deleteTask}
          startEdit={startEdit}
        />
      ))}
    </div>
  );
}
