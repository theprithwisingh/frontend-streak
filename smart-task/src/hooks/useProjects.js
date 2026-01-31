import { useLocalStorage } from "./useLocalStorage";
import React from "react";


export function useProjects() {
  const [projects, setProjects] = useLocalStorage("projects", []);

  const addProject = (project) => {
    setProjects([{ id: Date.now(), ...project }, ...projects]);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return { projects, addProject, deleteProject };
}
