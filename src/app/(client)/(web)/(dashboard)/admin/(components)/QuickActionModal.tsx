"use client";

import { useEffect, useRef } from "react";
import { X, Send, Plus, Upload } from "lucide-react";

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: "product" | "category" | "project" | "review" | null;
  onSubmit: (data: any) => void;
}

export default function QuickActionModal({
  isOpen,
  onClose,
  actionType,
  onSubmit,
}: QuickActionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !actionType) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
    onClose();
  };

  const getTitle = () => {
    switch (actionType) {
      case "product":
        return "Add New Product";
      case "category":
        return "Create New Category";
      case "project":
        return "Add New Project";
      case "review":
        return "Publish Customer Review";
      default:
        return "Quick Action";
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/40 rounded-2xl shadow-xl overflow-hidden z-10 animate-[scaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-100/50 dark:border-zinc-800/30">
          <h3
            id="modal-title"
            className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"
          >
            <Plus size={18} className="text-[#e31b23]" />
            {getTitle()}
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
          {actionType === "product" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Product Name *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="e.g. Luxury Portable Cabin"
                  className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    name="category"
                    className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                  >
                    <option>Portable Cabins</option>
                    <option>Office Cabins</option>
                    <option>Container Offices</option>
                    <option>Custom Buildings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Estimated Price (AED)
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 45000"
                    className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe the cabin structure, dimensions, layout..."
                  className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-100 dark:border-zinc-850 rounded-xl p-4.5 flex flex-col items-center justify-center hover:border-[#e31b23] transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-800/20">
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">
                    Drag files here, or browse
                  </span>
                </div>
              </div>
            </>
          )}

          {actionType === "category" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Category Name *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="e.g. Modular Classrooms"
                  className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  slug (automatically generated)
                </label>
                <input
                  type="text"
                  name="slug"
                  placeholder="modular-classrooms"
                  className="w-full text-sm px-3.5 py-2.5 bg-gray-100 dark:bg-zinc-850 border border-gray-100 dark:border-zinc-850 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  disabled
                />
              </div>
            </>
          )}

          {actionType === "project" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="e.g. Abu Dhabi Site Offices"
                  className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Location *
                  </label>
                  <input
                    required
                    type="text"
                    name="location"
                    placeholder="e.g. Abu Dhabi, UAE"
                    className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    placeholder="e.g. 2026"
                    className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Project Gallery
                </label>
                <div className="border-2 border-dashed border-gray-100 dark:border-zinc-850 rounded-xl p-4.5 flex flex-col items-center justify-center hover:border-[#e31b23] transition-colors cursor-pointer bg-gray-50 dark:bg-zinc-800/20">
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">
                    Upload multiple project photos
                  </span>
                </div>
              </div>
            </>
          )}

          {actionType === "review" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="author"
                    placeholder="e.g. John Doe"
                    className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Rating (1-5) *
                  </label>
                  <select
                    name="rating"
                    className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all"
                  >
                    <option value="5">5 Stars (Excellent)</option>
                    <option value="4">4 Stars (Good)</option>
                    <option value="3">3 Stars (Average)</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Review Text *
                </label>
                <textarea
                  required
                  name="text"
                  rows={4}
                  placeholder="What did the customer say about our services/cabins..."
                  className="w-full text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-850 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all resize-none"
                />
              </div>
            </>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 mt-4 border-t border-gray-100/50 dark:border-zinc-800/30 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4.5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-100 dark:border-zinc-850 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs"
            >
              Submit
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
