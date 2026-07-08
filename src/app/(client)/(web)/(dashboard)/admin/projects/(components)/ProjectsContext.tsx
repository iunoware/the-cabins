"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export type ProjectCategory = {
  id: string;
  name: string;
  slug: string;
  badgeLabel: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  projects?: Project[];
};

export type ProjectImage = {
  id: string;
  projectId: string;
  imageUrl: string;
  altText: string | null;
  isCover: boolean;
  sortOrder: number;
};

export type ProjectTestimonial = {
  id: string;
  projectId: string;
  clientName: string;
  designation: string | null;
  companyName: string | null;
  testimonial: string;
  rating: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  categoryId: string;
  city: string | null;
  country: string | null;
  status: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
  category: ProjectCategory;
  images: ProjectImage[];
  testimonials: ProjectTestimonial[];
};

type ProjectsContextType = {
  categories: ProjectCategory[];
  projects: Project[];
  isLoading: boolean;
  loadData: () => Promise<void>;

  createCategory: (data: CategoryPayload) => Promise<void>;
  updateCategory: (id: string, data: CategoryPayload) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  createProject: (data: FormData) => Promise<void>;
  updateProject: (id: string, data: FormData) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
};

export type CategoryPayload = {
  name: string;
  slug: string;
  badgeLabel?: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
};

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects must be used inside ProjectsProvider");
  }

  return context;
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    try {
      setIsLoading(true);

      const [categoriesRes, projectsRes] = await Promise.all([
        axios.get("/api/admin/project-categories"),
        axios.get("/api/admin/projects"),
      ]);

      setCategories(categoriesRes.data.categories || []);
      setProjects(projectsRes.data.projects || []);
    } catch {
      toast.error("Failed to load projects data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createCategory(data: CategoryPayload) {
    await axios.post("/api/admin/project-categories", data);
    toast.success("Category created");
    await loadData();
  }

  async function updateCategory(id: string, data: CategoryPayload) {
    await axios.put(`/api/admin/project-categories/${id}`, data);
    toast.success("Category updated");
    await loadData();
  }

  async function deleteCategory(id: string) {
    await axios.delete(`/api/admin/project-categories/${id}`);
    toast.success("Category deleted");
    await loadData();
  }

  async function createProject(data: FormData) {
    await axios.post("/api/admin/projects", data);
    toast.success("Project created");
    await loadData();
  }

  async function updateProject(id: string, data: FormData) {
    await axios.put(`/api/admin/projects/${id}`, data);
    toast.success("Project updated");
    await loadData();
  }

  async function deleteProject(id: string) {
    await axios.delete(`/api/admin/projects/${id}`);
    toast.success("Project deleted");
    await loadData();
  }

  return (
    <ProjectsContext.Provider
      value={{
        categories,
        projects,
        isLoading,
        loadData,
        createCategory,
        updateCategory,
        deleteCategory,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
