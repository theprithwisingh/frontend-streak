import React from "react";
import { Plus, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
];

export default function ProjectsPanel({ projects, addProject, deleteProject }) {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: "", color: COLORS[0] });

  const submit = () => {
    if (!form.name.trim()) return;
    addProject(form);
    setForm({ name: "", color: COLORS[0] });
    setIsAdding(false);
  };

  return (
    <section className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-6">
      <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 mb-4">
        PROJECTS
      </h3>

      {isAdding ? (
        <div className="space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Project name"
            className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2 text-sm"
          />

          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setForm({ ...form, color: c })}
                style={{ backgroundColor: c }}
                className={`aspect-square rounded-md transition ${
                  form.color === c ? "ring-2 ring-white scale-110" : ""
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={submit}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-mono font-bold py-2 rounded-md"
            >
              <Check size={16} /> Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-neutral-700 text-neutral-400 font-mono font-bold py-2 rounded-md"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group flex items-center gap-3 bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2"
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: p.color }}
                />
                <span className="flex-1 text-sm">{p.name}</span>
                <button
                  onClick={() => deleteProject(p.id)}
                  className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-400 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 border-2 border-dashed border-neutral-700 text-neutral-400 font-mono font-bold py-2 rounded-md hover:text-white hover:border-white transition"
          >
            <Plus size={16} /> NEW PROJECT
          </button>
        </>
      )}
    </section>
  );
}
