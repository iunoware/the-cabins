"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Edit2,
  Eye,
  HelpCircle,
  ImageIcon,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { Project, useProjects } from "./ProjectsContext";
import Image from "next/image";

type ProjectTableProps = {
  categoryId: string;
  onEditProject: (id: string) => void;
};

export default function ProjectTable({ categoryId, onEditProject }: ProjectTableProps) {
  const { projects, deleteProject } = useProjects();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const processedProjects = useMemo(() => {
    return projects
      .filter((project) => project.categoryId === categoryId)
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          (project.description || "").toLowerCase().includes(search.toLowerCase()) ||
          (project.city || "").toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && project.isActive) ||
          (statusFilter === "draft" && !project.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "title-asc") return a.title.localeCompare(b.title);
        if (sortBy === "title-desc") return b.title.localeCompare(a.title);
        if (sortBy === "oldest") {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }

        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [projects, categoryId, search, statusFilter, sortBy]);

  async function handleDeleteConfirm() {
    if (!deletingProject) return;

    await deleteProject(deletingProject.id);
    setDeletingProject(null);
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4.5 shadow-xs md:flex-row">
        <div className="relative w-full md:max-w-xs">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-gray-100 bg-gray-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25"
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              Status:
            </span>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-gray-700 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-1.5">
            <ArrowUpDown size={12} className="text-gray-400" />

            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              Sort:
            </span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-gray-700 outline-none"
            >
              <option value="newest">Newest Updated</option>
              <option value="oldest">Oldest Updated</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {processedProjects.length === 0 ? (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-gray-150 bg-white p-12 text-center shadow-xs">
          <HelpCircle className="mb-3 text-gray-300" size={36} />

          <h4 className="text-sm font-bold text-gray-800">No Projects Found</h4>

          <p className="mt-1 max-w-sm text-xs font-medium text-gray-400">
            Add your first project inside this category.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden w-full overflow-hidden rounded-2xl border border-gray-100/60 bg-white shadow-xs md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="w-20 p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Cover
                    </th>
                    <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Project
                    </th>
                    <th className="w-36 p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      City
                    </th>
                    <th className="w-28 p-4.5 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
                      Images
                    </th>
                    <th className="w-28 p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </th>
                    <th className="w-28 p-4.5 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
                      Featured
                    </th>
                    <th className="w-32 p-4.5 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {processedProjects.map((project) => {
                    const cover =
                      project.images.find((image) => image.isCover) || project.images[0];

                    return (
                      <tr
                        key={project.id}
                        className="transition-colors hover:bg-gray-50/30"
                      >
                        <td className="p-4.5">
                          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                            {cover?.imageUrl ? (
                              <Image
                                src={cover.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <ImageIcon size={20} className="text-gray-300" />
                            )}
                          </div>
                        </td>

                        <td className="p-4.5">
                          <button
                            onClick={() => onEditProject(project.id)}
                            className="text-left text-xs font-bold text-gray-900 transition hover:text-[#e31b23]"
                          >
                            {project.title}
                          </button>

                          <span className="mt-0.5 block text-[10px] font-semibold text-gray-400">
                            /{project.slug}
                          </span>
                        </td>

                        <td className="p-4.5">
                          <span className="text-xs font-semibold text-gray-500">
                            {project.city || "-"}
                          </span>
                        </td>

                        <td className="p-4.5 text-center">
                          <span className="inline-flex items-center justify-center rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-extrabold text-gray-600">
                            {project.images.length}
                          </span>
                        </td>

                        <td className="p-4.5">
                          <StatusBadge active={project.isActive} />
                        </td>

                        <td className="p-4.5 text-center">
                          <Star
                            size={16}
                            className={
                              project.isFeatured
                                ? "mx-auto fill-amber-500 text-amber-500"
                                : "mx-auto text-gray-300"
                            }
                          />
                        </td>

                        <td className="p-4.5">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* <a
                              href={`/projects/${project.slug}`}
                              target="_blank"
                              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                              title="Preview"
                            >
                              <Eye size={15} />
                            </a> */}

                            <button
                              onClick={() => onEditProject(project.id)}
                              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
                              title="Edit"
                            >
                              <Edit2 size={15} />
                            </button>

                            <button
                              onClick={() => setDeletingProject(project)}
                              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-[#e31b23]"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {processedProjects.map((project) => {
              const cover =
                project.images.find((image) => image.isCover) || project.images[0];

              return (
                <div
                  key={project.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4.5 shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                      {cover?.imageUrl ? (
                        <Image
                          src={cover.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon size={20} className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xs font-bold text-gray-900">
                        {project.title}
                      </h4>
                      <p className="mt-0.5 text-[9px] font-semibold text-gray-400">
                        {project.city || "-"} • {project.images.length} images
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-[11px] font-medium leading-relaxed text-gray-500">
                    {project.description || "No description provided."}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                    <StatusBadge active={project.isActive} />

                    {project.isFeatured && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-amber-100 bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex justify-end gap-1.5 border-t border-gray-50 pt-2.5">
                    <a
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={14} />
                    </a>

                    <button
                      onClick={() => onEditProject(project.id)}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      onClick={() => setDeletingProject(project)}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-[#e31b23]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <ConfirmDialog
        isOpen={deletingProject !== null}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project?"
        message={`Are you sure you want to delete "${deletingProject?.title}"? This will also delete its gallery images and testimonial. This action cannot be undone.`}
        confirmText="Yes, Delete Project"
        isDestructive
      />
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold ${
        active
          ? "border-emerald-100/50 bg-emerald-50 text-emerald-700"
          : "border-gray-200/50 bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-gray-400"
        }`}
      />
      {active ? "Published" : "Draft"}
    </span>
  );
}
