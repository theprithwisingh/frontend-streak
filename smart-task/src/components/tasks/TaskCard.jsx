import React from "react";
import { Check, Edit2, Trash2 } from "lucide-react";

const PRIORITY_COLORS = {
  low: "border-emerald-500 text-emerald-500",
  medium: "border-amber-500 text-amber-500",
  high: "border-red-500 text-red-500",
};

export default function TaskCard({
  task,
  project,
  toggleStatus,
  deleteTask,
  startEdit,
}) {
  return (
    <div
      className={`bg-neutral-900 border-2 border-neutral-800 rounded-xl p-5 transition hover:border-neutral-500 hover:translate-x-1 ${
        task.status === "completed" ? "opacity-60" : ""
      }`}
    >
      <div className="flex gap-4">
        <button
          onClick={() => toggleStatus(task.id)}
          className={`w-6 h-6 border-2 border-neutral-700 rounded-md flex items-center justify-center transition ${
            task.status === "completed"
              ? "bg-white text-black border-white"
              : ""
          }`}
        >
          <Check size={14} />
        </button>

        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              task.status === "completed" ? "line-through opacity-60" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-neutral-400 mt-1">
              {task.description}
            </p>
          )}

          <div className="flex gap-3 mt-3 flex-wrap">
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wide px-3 py-1 rounded border-2 ${PRIORITY_COLORS[task.priority]}`}
            >
              {task.priority}
            </span>

            {project && (
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-wide px-3 py-1 rounded border-2 flex items-center gap-2"
                style={{
                  color: project.color,
                  borderColor: project.color,
                  background: `${project.color}20`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: project.color }}
                />
                {project.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 opacity-0 hover:opacity-100 transition">
          <button
            onClick={() => startEdit(task)}
            className="w-8 h-8 flex items-center justify-center border-2 border-neutral-700 rounded-md text-neutral-400 hover:border-blue-500 hover:text-blue-500 transition"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="w-8 h-8 flex items-center justify-center border-2 border-neutral-700 rounded-md text-neutral-400 hover:border-red-500 hover:text-red-500 transition"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
