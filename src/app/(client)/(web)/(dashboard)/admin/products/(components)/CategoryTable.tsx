"use client";

import React, { useState, useMemo } from "react";
import { Search, Eye, Edit2, Trash2, ArrowUpDown, HelpCircle, Check, Play, AlertCircle, X, Image as ImageIcon } from "lucide-react";
import { useProducts, CategoryState } from "./ProductsContext";
import ConfirmDialog from "./ConfirmDialog";
import CategoryModal from "./CategoryModal";

interface CategoryTableProps {
  onSelectCategory: (id: string) => void;
}

export default function CategoryTable({ onSelectCategory }: CategoryTableProps) {
  const { categories, families, products, deleteCategory } = useProducts();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, active, draft
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, name-asc, name-desc

  // Modal / dialog states
  const [viewingCategory, setViewingCategory] = useState<(CategoryState & { familiesCount: number; productsCount: number }) | null>(null);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [deletingCat, setDeletingCat] = useState<CategoryState | null>(null);

  // Derive counts and filter/sort categories
  const processedCategories = useMemo(() => {
    return categories
      .map((cat) => {
        const catFamilies = families.filter((f) => f.categoryId === cat.id);
        const famIds = catFamilies.map((f) => f.id);
        const catProducts = products.filter((p) => famIds.includes(p.familyId));

        return {
          ...cat,
          familiesCount: catFamilies.length,
          productsCount: catProducts.length,
        };
      })
      .filter((cat) => {
        const matchesSearch =
          cat.name.toLowerCase().includes(search.toLowerCase()) ||
          cat.description.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && cat.active) ||
          (statusFilter === "draft" && !cat.active);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        if (sortBy === "oldest") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        // default newest
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [categories, families, products, search, statusFilter, sortBy]);

  const handleDeleteConfirm = () => {
    if (deletingCat) {
      deleteCategory(deletingCat.id);
      setDeletingCat(null);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/40 p-4.5 rounded-2xl shadow-xs">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-zinc-850 border border-gray-100 dark:border-zinc-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#e31b23]/25 focus:border-[#e31b23] text-gray-900 dark:text-gray-100 transition-all font-semibold"
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-850 px-3.5 py-1.5 rounded-xl border border-gray-100 dark:border-zinc-800">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 dark:text-gray-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-0 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-hidden focus:ring-0 cursor-pointer p-0"
            >
              <option value="all">All Status</option>
              <option value="active">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-850 px-3.5 py-1.5 rounded-xl border border-gray-100 dark:border-zinc-800">
            <ArrowUpDown size={12} className="text-gray-400" />
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 dark:text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-0 text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-hidden focus:ring-0 cursor-pointer p-0"
            >
              <option value="newest">Newest Updated</option>
              <option value="oldest">Oldest Updated</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container / Cards view */}
      {processedCategories.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] shadow-xs">
          <HelpCircle className="text-gray-300 dark:text-zinc-700 mb-3" size={36} />
          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">No Categories Found</h4>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-sm">
            {search || statusFilter !== "all"
              ? "Try adjusting your search query or status filter to find categories."
              : "Start by clicking '+ New Category' above to add your first product category."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop/Tablet Table Layout */}
          <div className="hidden md:block w-full bg-white dark:bg-zinc-900 border border-gray-100/60 dark:border-zinc-800/40 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/40">
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-20">Thumbnail</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category Name</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider max-w-[250px]">Description</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center w-28">Families</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center w-28">Products</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-24">Status</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider w-32">Updated</th>
                    <th className="p-4.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-zinc-800/60">
                  {processedCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id)}
                      className="cursor-pointer hover:bg-gray-50/30 dark:hover:bg-zinc-800/10 transition-colors group/row"
                    >
                      <td className="p-4.5">
                        <div className="relative w-12 h-12 rounded-xl border border-gray-100 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-800/60 flex items-center justify-center shrink-0">
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="p-4.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100 group-hover/row:text-[#e31b23] transition-colors">
                          {cat.name}
                        </span>
                      </td>
                      <td className="p-4.5">
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[250px] font-medium">
                          {cat.description || <span className="italic text-gray-300 dark:text-gray-600">No description</span>}
                        </p>
                      </td>
                      <td className="p-4.5 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-800">
                          {cat.familiesCount}
                        </span>
                      </td>
                      <td className="p-4.5 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-800">
                          {cat.productsCount}
                        </span>
                      </td>
                      <td className="p-4.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${
                            cat.active
                              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30"
                              : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-zinc-700/50"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.active ? "bg-emerald-500" : "bg-gray-400"}`} />
                          {cat.active ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4.5">
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold">
                          {new Date(cat.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="p-4.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingCategory(cat);
                            }}
                            className="p-1.5 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg text-gray-400 dark:text-gray-500 transition-all cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingCatId(cat.id);
                            }}
                            className="p-1.5 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg text-gray-400 dark:text-gray-500 transition-all cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingCat(cat);
                            }}
                            className="p-1.5 hover:text-[#e31b23] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-gray-400 dark:text-gray-500 transition-all cursor-pointer"
                            title="Delete Category"
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

          {/* Mobile Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {processedCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/60 rounded-2xl p-4.5 flex flex-col gap-3 shadow-xs hover:shadow-md hover:border-[#e31b23]/30 dark:hover:border-[#e31b23]/30 transition-all cursor-pointer select-none group"
              >
                <div className="flex gap-3.5 items-center">
                  <div className="relative w-12 h-12 rounded-xl border border-gray-100 dark:border-zinc-800 overflow-hidden bg-gray-50 dark:bg-zinc-800/60 flex items-center justify-center shrink-0">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#e31b23] transition-colors truncate">
                      {cat.name}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">
                      Updated {new Date(cat.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium">
                  {cat.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-zinc-850/50 pt-3 mt-1">
                  <div className="flex gap-2">
                    <span className="text-[9px] font-extrabold bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-800 px-2 py-0.5 rounded-md">
                      {cat.familiesCount} Families
                    </span>
                    <span className="text-[9px] font-extrabold bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-800 px-2 py-0.5 rounded-md">
                      {cat.productsCount} Products
                    </span>
                  </div>
                  
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      cat.active
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-zinc-700/50"
                    }`}
                  >
                    {cat.active ? "Published" : "Draft"}
                  </span>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-end gap-1.5 border-t border-gray-50 dark:border-zinc-850/50 pt-2.5 mt-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingCategory(cat);
                    }}
                    className="p-1.5 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg text-gray-400 dark:text-gray-500 transition-all cursor-pointer"
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCatId(cat.id);
                    }}
                    className="p-1.5 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-lg text-gray-400 dark:text-gray-500 transition-all cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingCat(cat);
                    }}
                    className="p-1.5 hover:text-[#e31b23] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-gray-400 dark:text-gray-500 transition-all cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Category Edit Modal */}
      <CategoryModal
        isOpen={editingCatId !== null}
        onClose={() => setEditingCatId(null)}
        editId={editingCatId}
      />

      {/* Category Deletion Confirmation Drawer */}
      <ConfirmDialog
        isOpen={deletingCat !== null}
        onClose={() => setDeletingCat(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category?"
        message={`Are you sure you want to delete the category "${deletingCat?.name}"? WARNING: This will also delete all families and products that belong to this category. This action is irreversible.`}
        confirmText="Yes, Delete All"
        isDestructive={true}
      />

      {/* View Category Details Modal (Drawer style) */}
      {viewingCategory && (
        <div className="fixed inset-0 z-9999 flex items-center justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setViewingCategory(null)} />
          
          {/* Slide-over Content */}
          <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-900 border-l border-gray-150 dark:border-zinc-800 shadow-2xl p-6.5 overflow-y-auto flex flex-col gap-6 animate-[slideInRight_0.25s_ease-out]">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-4">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">Category Details</h3>
              <button onClick={() => setViewingCategory(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 text-center mt-2">
              <div className="w-28 h-28 border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-850 rounded-2xl overflow-hidden shadow-xs">
                <img src={viewingCategory.image} alt={viewingCategory.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">{viewingCategory.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Slug: {viewingCategory.slug}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-b border-gray-100 dark:border-zinc-800 py-4 mt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">Publish Status:</span>
                <span className={viewingCategory.active ? "text-emerald-600 font-bold" : "text-gray-500 font-bold"}>
                  {viewingCategory.active ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">Families:</span>
                <span className="text-gray-900 dark:text-gray-100 font-bold">{viewingCategory.familiesCount} series</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">Products (Variants):</span>
                <span className="text-gray-900 dark:text-gray-100 font-bold">{viewingCategory.productsCount} items</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">Last Updated:</span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {new Date(viewingCategory.updatedAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Description</span>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-850/40 p-3 rounded-xl border border-gray-100 dark:border-zinc-800/30 font-medium">
                {viewingCategory.description || "No description provided."}
              </p>
            </div>
            
            <button
              onClick={() => {
                setEditingCatId(viewingCategory.id);
                setViewingCategory(null);
              }}
              className="mt-auto flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs"
            >
              <Edit2 size={13} />
              <span>Edit Category</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
