"use client";

import React, { useEffect, useState } from "react";
import { X, Save, Layers, Upload, ImageIcon } from "lucide-react";
import { useProducts, FamilyState } from "./ProductsContext";

interface FamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  editId?: string | null;
  prefilledCategoryId?: string;
  onSaveCallback?: (createdFamily: FamilyState) => void;
}

export default function FamilyModal({
  isOpen,
  onClose,
  editId,
  prefilledCategoryId,
  onSaveCallback,
}: FamilyModalProps) {
  const { categories, families, addFamily, updateFamily } = useProducts();
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("/images/security-cabin.png");
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);

  // If editId is provided, fill form with existing family data, else set defaults
  useEffect(() => {
    if (isOpen) {
      if (editId) {
        const fam = families.find((f) => f.id === editId);
        if (fam) {
          setCategoryId(fam.categoryId);
          setName(fam.name);
          setDescription(fam.shortDescription);
          setThumbnail(fam.thumbnail);
          setActive(fam.active);
          setFeatured(fam.featured);
        }
      } else {
        setCategoryId(prefilledCategoryId || (categories[0]?.id || ""));
        setName("");
        setDescription("");
        setThumbnail("/images/security-cabin.png");
        setActive(true);
        setFeatured(false);
      }
    }
  }, [isOpen, editId, prefilledCategoryId, families, categories]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;

    if (editId) {
      updateFamily(editId, {
        categoryId,
        name,
        shortDescription: description,
        thumbnail,
        active,
        featured,
      });
      onClose();
    } else {
      const created = addFamily({
        categoryId,
        name,
        slug: "", // generated in context
        shortDescription: description,
        thumbnail,
        active,
        featured,
        popular: false,
      });
      if (onSaveCallback) {
        onSaveCallback(created);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/40 rounded-2xl shadow-xl overflow-hidden z-10 animate-[scaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="family-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-100/50 dark:border-zinc-800/30">
          <h3
            id="family-modal-title"
            className="text-base font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2"
          >
            <Layers size={18} className="text-[#e31b23]" />
            {editId ? "Edit Family" : "New Family"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Parent Category *
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all font-semibold"
            >
              <option value="" disabled>Select parent category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Family Name *
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Premium Series"
              className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Thumbnail Upload
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl border border-gray-150 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-800/40 shrink-0 flex items-center justify-center">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="Family Thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={24} className="text-gray-300" />
                )}
              </div>
              <label className="flex-1 border border-dashed border-gray-250 dark:border-zinc-800 rounded-xl p-3.5 flex flex-col items-center justify-center hover:border-[#e31b23] dark:hover:border-[#e31b23] transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-800/20 group">
                <Upload size={16} className="text-gray-400 group-hover:text-[#e31b23] mb-1" />
                <span className="text-[11px] text-gray-500 font-semibold group-hover:text-[#e31b23] transition-colors">
                  Upload file (PNG/JPG)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief description of the family series..."
              className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all resize-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Publish Status
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-zinc-850 bg-gray-50 dark:bg-zinc-800/20 cursor-pointer select-none">
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Published</span>
                  <input
                    type="radio"
                    name="fam-active"
                    checked={active}
                    onChange={() => setActive(true)}
                    className="accent-[#e31b23] h-4.5 w-4.5 cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-zinc-850 bg-gray-50 dark:bg-zinc-800/20 cursor-pointer select-none">
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Draft</span>
                  <input
                    type="radio"
                    name="fam-active"
                    checked={!active}
                    onChange={() => setActive(false)}
                    className="accent-[#e31b23] h-4.5 w-4.5 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Promotion Details
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-zinc-850 bg-gray-50 dark:bg-zinc-800/20 cursor-pointer select-none h-[88px]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Featured</span>
                    <span className="text-[9px] text-gray-500">Show on homepage</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="accent-[#e31b23] h-4.5 w-4.5 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 mt-4 border-t border-gray-100/50 dark:border-zinc-800/30 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4.5 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Save size={14} />
              <span>{editId ? "Update Family" : "Save Family"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
