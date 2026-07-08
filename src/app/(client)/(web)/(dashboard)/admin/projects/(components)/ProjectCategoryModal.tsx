/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Save, Tags, X } from "lucide-react";
import { CategoryPayload, slugify, useProjects } from "./ProjectsContext";

type ProjectCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editId?: string | null;
};

export default function ProjectCategoryModal({
  isOpen,
  onClose,
  editId,
}: ProjectCategoryModalProps) {
  const { categories, createCategory, updateCategory } = useProjects();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [badgeLabel, setBadgeLabel] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (editId) {
      const category = categories.find((item) => item.id === editId);

      if (category) {
        setName(category.name);
        setSlug(category.slug);
        setBadgeLabel(category.badgeLabel || "");
        setDescription(category.description || "");
        setSortOrder(category.sortOrder);
        setIsActive(category.isActive);
        setIsSlugEdited(true);
      }
    } else {
      setName("");
      setSlug("");
      setBadgeLabel("");
      setDescription("");
      setSortOrder(0);
      setIsActive(true);
      setIsSlugEdited(false);
    }
  }, [isOpen, editId, categories]);

  useEffect(() => {
    if (!isSlugEdited) {
      setSlug(slugify(name));
    }
  }, [name, isSlugEdited]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim() || !slug.trim()) return;

    const payload: CategoryPayload = {
      name,
      slug,
      badgeLabel,
      description,
      sortOrder: Number(sortOrder),
      isActive,
    };

    try {
      setSaving(true);

      if (editId) {
        await updateCategory(editId, payload);
      } else {
        await createCategory(payload);
      }

      onClose();
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-zinc-800/40 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-zinc-800/40">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-gray-900 dark:text-gray-100">
            <Tags size={18} className="text-[#e31b23]" />
            {editId ? "Edit Project Category" : "New Project Category"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800 dark:hover:text-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Category Name *
            </label>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Accommodation"
              className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25 dark:border-zinc-850 dark:bg-zinc-800/50 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Slug *
            </label>
            <input
              required
              value={slug}
              onChange={(event) => {
                setSlug(slugify(event.target.value));
                setIsSlugEdited(true);
              }}
              placeholder="accommodation"
              className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25 dark:border-zinc-850 dark:bg-zinc-800/50 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Badge Label
            </label>
            <input
              value={badgeLabel}
              onChange={(event) => setBadgeLabel(event.target.value)}
              placeholder="e.g. Custom Build"
              className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25 dark:border-zinc-850 dark:bg-zinc-800/50 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short internal description..."
              className="w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25 dark:border-zinc-850 dark:bg-zinc-800/50 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(event) => setSortOrder(Number(event.target.value))}
              className="w-full rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#e31b23] focus:ring-2 focus:ring-[#e31b23]/25 dark:border-zinc-850 dark:bg-zinc-800/50 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Publish Status
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5 dark:border-zinc-850 dark:bg-zinc-800/20">
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  Published
                </span>
                <input
                  type="radio"
                  checked={isActive}
                  onChange={() => setIsActive(true)}
                  className="h-4 w-4 accent-[#e31b23]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5 dark:border-zinc-850 dark:bg-zinc-800/20">
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  Draft
                </span>
                <input
                  type="radio"
                  checked={!isActive}
                  onChange={() => setIsActive(false)}
                  className="h-4 w-4 accent-[#e31b23]"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-gray-100 pt-4 dark:border-zinc-800/40">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-4.5 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="flex items-center gap-1.5 rounded-xl bg-[#e31b23] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff2d35] disabled:opacity-60"
            >
              <Save size={14} />
              {saving ? "Saving..." : editId ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
