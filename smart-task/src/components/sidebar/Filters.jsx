import React from "react";
export default function Filters({ filters, setFilters, projects }) {
  return (
    <section className="bg-neutral-900 border-2 border-neutral-800 rounded-xl p-6 space-y-5">
      <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400">
        FILTERS
      </h3>

      <FilterSelect
        label="Status"
        value={filters.status}
        onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
        options={[
          ["all", "All Tasks"],
          ["todo", "To Do"],
          ["completed", "Completed"],
        ]}
      />

      <FilterSelect
        label="Priority"
        value={filters.priority}
        onChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
        options={[
          ["all", "All Priorities"],
          ["low", "Low"],
          ["medium", "Medium"],
          ["high", "High"],
        ]}
      />

      <FilterSelect
        label="Project"
        value={filters.project}
        onChange={(v) => setFilters((f) => ({ ...f, project: v }))}
        options={[
          ["all", "All Projects"],
          ...projects.map((p) => [p.id, p.name]),
        ]}
      />
    </section>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white transition"
      >
        {options.map(([val, text]) => (
          <option key={val} value={val}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
