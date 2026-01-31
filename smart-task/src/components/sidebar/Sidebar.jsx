import React from "react";
import Filters from "./Filters";
import ProjectsPanel from "./ProjectsPanel";

export default function Sidebar({ filters, setFilters, projectsApi }) {
    
  return (
    <aside className="space-y-5 sticky top-10 h-fit">
      <Filters filters={filters} setFilters={setFilters} projects={projectsApi.projects} />
      <ProjectsPanel {...projectsApi} />
    </aside>
  );
}
