import React from "react";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function TaskForm({
  projects,
  addTask,
  editingTask,
  saveEditTask,
  cancelEditTask,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    projectId: "",
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        projectId: editingTask.projectId ?? "",
      });
    }
  }, [editingTask]);

  const submit = () => {
    if (!form.title.trim()) return;

    if (editingTask) {
      saveEditTask(form);
    } else {
      addTask(form);
    }

    setForm({
      title: "",
      description: "",
      priority: "medium",
      projectId: "",
    });
  };

  if (!editingTask && !addTask) return null;

  return (
    <div className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-6 mb-6 space-y-5 animate-fadeIn">
      <div>
        <label className="block text-sm font-semibold mb-2">Task Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2 min-h-[80px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Priority</label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Project</label>
          <select
            value={form.projectId}
            onChange={(e) =>
              setForm({
                ...form,
                projectId: e.target.value || "",
              })
            }
            className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2"
          >
            <option value="">No Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={submit}
          className="flex items-center gap-2 bg-white text-black font-mono font-bold px-5 py-2 rounded-md hover:-translate-y-0.5 transition"
        >
          <Check size={16} /> {editingTask ? "SAVE" : "ADD"}
        </button>
        <button
          onClick={cancelEditTask}
          className="flex items-center gap-2 border-2 border-neutral-700 text-neutral-400 font-mono font-bold px-5 py-2 rounded-md hover:border-neutral-400 transition"
        >
          <X size={16} /> CANCEL
        </button>
      </div>
    </div>
  );
}
