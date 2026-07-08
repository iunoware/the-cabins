"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ChevronRight, FileQuestion, Folder, Plus } from "lucide-react";
import { ProjectsProvider, useProjects } from "./(components)/ProjectsContext";
import ProjectCategoryTable from "./(components)/ProjectCategoryTable";
import ProjectCategoryModal from "./(components)/ProjectCategoryModal";
import ProjectTable from "./(components)/ProjectTable";
import ProjectModal from "./(components)/ProjectModal";

function ProjectsAdminContent() {
  const { categories, projects, isLoading } = useProjects();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return null;
    return categories.find((category) => category.id === activeCategoryId) || null;
  }, [categories, activeCategoryId]);

  const editingProject = useMemo(() => {
    if (!editingProjectId) return null;
    return projects.find((project) => project.id === editingProjectId) || null;
  }, [projects, editingProjectId]);

  const categoryProjectsCount = useMemo(() => {
    if (!activeCategoryId) return 0;
    return projects.filter((project) => project.categoryId === activeCategoryId).length;
  }, [projects, activeCategoryId]);

  function openNewProject() {
    setEditingProjectId(null);
    setIsProjectModalOpen(true);
  }

  function openEditProject(id: string) {
    setEditingProjectId(id);
    setIsProjectModalOpen(true);
  }

  function closeProjectModal() {
    setEditingProjectId(null);
    setIsProjectModalOpen(false);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      <nav className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-gray-100 bg-white px-4.5 py-3 text-xs font-bold text-gray-500 shadow-xs">
        <button
          onClick={() => setActiveCategoryId(null)}
          className="transition hover:text-[#e31b23]"
        >
          Projects
        </button>

        {activeCategory && (
          <>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="max-w-40 truncate text-gray-900">{activeCategory.name}</span>
          </>
        )}
      </nav>

      {!activeCategory && (
        <>
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Projects
              </h1>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Create categories first, then add projects inside each category.
              </p>
            </div>

            {categories.length > 0 && (
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#e31b23] px-4.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff2d35]"
              >
                <Plus size={15} />
                New Category
              </button>
            )}
          </header>

          {categories.length === 0 && !isLoading ? (
            <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-gray-150 bg-white p-16 text-center shadow-xs">
              <FileQuestion className="mb-4 text-gray-300" size={42} />

              <h4 className="text-sm font-bold text-gray-800">
                No Project Categories Yet
              </h4>

              <p className="mt-1 mb-6 max-w-sm text-xs font-medium text-gray-400">
                Start by creating a project category. After that, you can add projects
                inside it.
              </p>

              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#e31b23] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff2d35]"
              >
                <Plus size={15} />
                Create Category
              </button>
            </div>
          ) : (
            <ProjectCategoryTable onSelectCategory={setActiveCategoryId} />
          )}
        </>
      )}

      {activeCategory && (
        <>
          <header className="flex flex-col gap-3">
            <button
              onClick={() => setActiveCategoryId(null)}
              className="flex items-center gap-1.5 self-start text-xs font-bold text-gray-500 transition hover:text-[#e31b23]"
            >
              <ArrowLeft size={14} />
              Back to Categories
            </button>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-gray-900">
                  <Folder size={24} className="text-[#e31b23]" />
                  {activeCategory.name}
                </h1>

                <p className="mt-1.5 text-xs font-medium text-gray-500">
                  {categoryProjectsCount} project(s) inside this category.
                </p>
              </div>

              <button
                onClick={openNewProject}
                className="flex items-center gap-1.5 rounded-xl bg-[#e31b23] px-4.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff2d35]"
              >
                <Plus size={15} />
                New Project
              </button>
            </div>
          </header>

          <ProjectTable categoryId={activeCategory.id} onEditProject={openEditProject} />

          <ProjectModal
            isOpen={isProjectModalOpen}
            onClose={closeProjectModal}
            category={activeCategory}
            editProject={editingProject}
          />
        </>
      )}

      <ProjectCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </main>
  );
}

export default function ProjectsAdminPage() {
  return (
    <ProjectsProvider>
      <ProjectsAdminContent />
    </ProjectsProvider>
  );
}
