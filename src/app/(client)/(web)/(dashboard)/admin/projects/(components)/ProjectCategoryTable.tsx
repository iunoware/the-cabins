"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Edit2,
  Eye,
  Folder,
  HelpCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import ProjectCategoryModal from "./ProjectCategoryModal";
import { ProjectCategory, useProjects } from "./ProjectsContext";

type ProjectCategoryTableProps = {
  onSelectCategory: (id: string) => void;
};

export default function ProjectCategoryTable({
  onSelectCategory,
}: ProjectCategoryTableProps) {
  const { categories, projects, deleteCategory } = useProjects();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [viewingCategory, setViewingCategory] = useState<
    (ProjectCategory & { projectsCount: number }) | null
  >(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<
    (ProjectCategory & { projectsCount: number }) | null
  >(null);

  const processedCategories = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        projectsCount: projects.filter((project) => project.categoryId === category.id)
          .length,
      }))
      .filter((category) => {
        const matchesSearch =
          category.name.toLowerCase().includes(search.toLowerCase()) ||
          (category.description || "").toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && category.isActive) ||
          (statusFilter === "draft" && !category.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "oldest") {
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        }

        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [categories, projects, search, statusFilter, sortBy]);

  async function handleDeleteConfirm() {
    if (!deletingCategory) return;

    await deleteCategory(deletingCategory.id);
    setDeletingCategory(null);
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4.5 shadow-xs   md:flex-row">
        <div className="relative w-full md:max-w-xs">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-xl border border-gray-100 bg-gray-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25   "
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-1.5  ">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-gray-700 outline-none "
            >
              <option value="all">All Status</option>
              <option value="active">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-1.5  ">
            <ArrowUpDown size={12} className="text-gray-400" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-gray-700 outline-none "
            >
              <option value="newest">Newest Updated</option>
              <option value="oldest">Oldest Updated</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {processedCategories.length === 0 ? (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-gray-150 bg-white p-12 text-center shadow-xs /80 ">
          <HelpCircle className="mb-3 text-gray-300 " size={36} />
          <h4 className="text-sm font-bold text-gray-800 ">No Categories Found</h4>
          <p className="mt-1 max-w-sm text-xs font-medium text-gray-400 ">
            Create project categories first. Then add projects inside those categories.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden w-full overflow-hidden rounded-2xl border border-gray-100/60 bg-white shadow-xs   md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50  /40">
                    <th className="w-20 p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Icon
                    </th>
                    <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Category Name
                    </th>
                    <th className="p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Description
                    </th>
                    <th className="w-28 p-4.5 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
                      Projects
                    </th>
                    <th className="w-24 p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </th>
                    <th className="w-32 p-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Updated
                    </th>
                    <th className="w-32 p-4.5 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 ">
                  {processedCategories.map((category) => (
                    <tr
                      key={category.id}
                      onClick={() => onSelectCategory(category.id)}
                      className="group/row cursor-pointer transition-colors hover:bg-gray-50/30 "
                    >
                      <td className="p-4.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-400  ">
                          <Folder size={20} />
                        </div>
                      </td>

                      <td className="p-4.5">
                        <span className="text-xs font-bold text-gray-900 transition-colors group-hover/row:text-[#e31b23] ">
                          {category.name}
                        </span>
                        <span className="mt-0.5 block text-[10px] font-semibold text-gray-400">
                          /{category.slug}
                        </span>
                      </td>

                      <td className="p-4.5">
                        <p className="max-w-62 truncate text-xs font-medium text-gray-500 ">
                          {category.description || "No description"}
                        </p>
                      </td>

                      <td className="p-4.5 text-center">
                        <span className="inline-flex items-center justify-center rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-extrabold text-gray-600   ">
                          {category.projectsCount}
                        </span>
                      </td>

                      <td className="p-4.5">
                        <StatusBadge active={category.isActive} />
                      </td>

                      <td className="p-4.5">
                        <span className="text-[11px] font-semibold text-gray-500 ">
                          {new Date(category.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      <td className="p-4.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              setViewingCategory(category);
                            }}
                            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                            title="View"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              setEditingCategoryId(category.id);
                            }}
                            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              setDeletingCategory(category);
                            }}
                            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-[#e31b23]"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {processedCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-4.5 shadow-xs transition hover:border-[#e31b23]/30 hover:shadow-md /60 "
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-400  ">
                    <Folder size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-xs font-bold text-gray-900 ">
                      {category.name}
                    </h4>
                    <span className="mt-0.5 block text-[9px] font-semibold text-gray-400">
                      Updated{" "}
                      {new Date(category.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-[11px] font-medium leading-relaxed text-gray-500 ">
                  {category.description || "No description provided."}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3 ">
                  <span className="rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[9px] font-extrabold text-gray-600   ">
                    {category.projectsCount} Projects
                  </span>

                  <StatusBadge active={category.isActive} />
                </div>

                <div className="mt-2.5 flex justify-end gap-1.5 border-t border-gray-50 pt-2.5 ">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setViewingCategory(category);
                    }}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setEditingCategoryId(category.id);
                    }}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setDeletingCategory(category);
                    }}
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-[#e31b23]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ProjectCategoryModal
        isOpen={editingCategoryId !== null}
        onClose={() => setEditingCategoryId(null)}
        editId={editingCategoryId}
      />

      <ConfirmDialog
        isOpen={deletingCategory !== null}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category?"
        message={`Are you sure you want to delete "${deletingCategory?.name}"? This will also delete ${deletingCategory?.projectsCount || 0} project(s), their gallery images, and their testimonial. This action cannot be undone.`}
        confirmText="Yes, Delete Category"
        isDestructive
      />

      {viewingCategory && (
        <div className="fixed inset-0 z-9999 flex items-center justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setViewingCategory(null)}
          />

          <div className="relative flex h-full w-full max-w-md flex-col gap-6 overflow-y-auto border-l border-gray-150 bg-white p-6.5 shadow-2xl  ">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 ">
              <h3 className="text-base font-extrabold text-gray-900 ">
                Category Details
              </h3>

              <button
                onClick={() => setViewingCategory(null)}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600  "
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-gray-400  ">
                <Folder size={36} />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-gray-900 ">
                  {viewingCategory.name}
                </h4>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Slug: {viewingCategory.slug}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-y border-gray-100 py-4 ">
              <InfoRow
                label="Publish Status"
                value={viewingCategory.isActive ? "Published" : "Draft"}
              />
              <InfoRow
                label="Projects"
                value={`${viewingCategory.projectsCount} project(s)`}
              />
              <InfoRow
                label="Last Updated"
                value={new Date(viewingCategory.updatedAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              />
            </div>

            <div>
              <span className="text-xs font-bold text-gray-700 ">Description</span>
              <p className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs font-medium leading-relaxed text-gray-500 /30 /40 ">
                {viewingCategory.description || "No description provided."}
              </p>
            </div>

            <button
              onClick={() => {
                setEditingCategoryId(viewingCategory.id);
                setViewingCategory(null);
              }}
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#e31b23] py-3 text-xs font-bold text-white transition hover:bg-[#ff2d35]"
            >
              <Edit2 size={13} />
              Edit Category
            </button>
          </div>
        </div>
      )}
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-xs font-semibold">
      <span className="text-gray-500">{label}:</span>
      <span className="text-right font-bold text-gray-900 ">{value}</span>
    </div>
  );
}
