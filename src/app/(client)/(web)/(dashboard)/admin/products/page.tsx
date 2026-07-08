"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight, ArrowLeft, Folder, Layers, Boxes, Plus, RefreshCw, FileQuestion } from "lucide-react";
import { ProductsProvider, useProducts } from "./(components)/ProductsContext";
import CategoryTable from "./(components)/CategoryTable";
import FamilyTable from "./(components)/FamilyTable";
import ProductTable from "./(components)/ProductTable";
import ProductForm from "./(components)/ProductForm";
import CategoryModal from "./(components)/CategoryModal";
import FamilyModal from "./(components)/FamilyModal";

function ProductsAdminContent() {
  const { categories, families, products, isLoading, resetData } = useProducts();

  // Hierarchical Navigation State
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeFamilyId, setActiveFamilyId] = useState<string | null>(null);

  // Form View State
  const [pageView, setPageView] = useState<"list" | "new" | "edit">("list");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Modals state for inline creators
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isFamModalOpen, setIsFamModalOpen] = useState(false);

  // Resolve Names
  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return null;
    return categories.find((c) => c.id === activeCategoryId) || null;
  }, [categories, activeCategoryId]);

  const activeFamily = useMemo(() => {
    if (!activeFamilyId) return null;
    return families.find((f) => f.id === activeFamilyId) || null;
  }, [families, activeFamilyId]);

  // Derive counts for current view
  const currentCategoryFamiliesCount = useMemo(() => {
    if (!activeCategoryId) return 0;
    return families.filter((f) => f.categoryId === activeCategoryId).length;
  }, [families, activeCategoryId]);

  const currentFamilyProductsCount = useMemo(() => {
    if (!activeFamilyId) return 0;
    return products.filter((p) => p.familyId === activeFamilyId).length;
  }, [products, activeFamilyId]);

  // Actions
  const handleEditProduct = (id: string) => {
    setEditingProductId(id);
    setPageView("edit");
  };

  const handleSaveProduct = () => {
    setPageView("list");
    setEditingProductId(null);
  };

  // Breadcrumb navigation click helper
  const handleBreadcrumbClick = (level: "root" | "category" | "family") => {
    setPageView("list");
    setEditingProductId(null);

    if (level === "root") {
      setActiveCategoryId(null);
      setActiveFamilyId(null);
    } else if (level === "category") {
      setActiveFamilyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-12 select-none">
      {/* 1. Breadcrumbs Navigation (Always visible) */}
      <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-bold bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/40 px-4.5 py-3 rounded-2xl shadow-xs">
        <button
          onClick={() => handleBreadcrumbClick("root")}
          className="hover:text-[#e31b23] dark:hover:text-white transition-colors cursor-pointer"
        >
          Products
        </button>

        {activeCategory && (
          <>
            <ChevronRight size={14} className="text-gray-300 dark:text-zinc-700" />
            <button
              onClick={() => handleBreadcrumbClick("category")}
              className="hover:text-[#e31b23] dark:hover:text-white transition-colors cursor-pointer max-w-[150px] truncate"
              title={activeCategory.name}
            >
              {activeCategory.name}
            </button>
          </>
        )}

        {activeFamily && (
          <>
            <ChevronRight size={14} className="text-gray-300 dark:text-zinc-700" />
            <span className="text-gray-900 dark:text-gray-150 max-w-[150px] truncate" title={activeFamily.name}>
              {activeFamily.name}
            </span>
          </>
        )}

        {pageView === "new" && (
          <>
            <ChevronRight size={14} className="text-gray-300 dark:text-zinc-700" />
            <span className="text-gray-450 italic font-medium">New Variant</span>
          </>
        )}

        {pageView === "edit" && (
          <>
            <ChevronRight size={14} className="text-gray-300 dark:text-zinc-700" />
            <span className="text-gray-450 italic font-medium">Edit Variant</span>
          </>
        )}
      </nav>

      {/* 2. Sub-views rendering */}
      {pageView === "new" && activeCategoryId && activeFamilyId && (
        <ProductForm
          categoryId={activeCategoryId}
          familyId={activeFamilyId}
          onCancel={() => setPageView("list")}
          onSave={handleSaveProduct}
        />
      )}

      {pageView === "edit" && activeCategoryId && activeFamilyId && (
        <ProductForm
          editId={editingProductId}
          categoryId={activeCategoryId}
          familyId={activeFamilyId}
          onCancel={() => {
            setPageView("list");
            setEditingProductId(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      {pageView === "list" && (
        /* Key-based remounting triggers animation instantly on drilldown */
        <div
          key={`${activeCategoryId}-${activeFamilyId}`}
          className="flex flex-col gap-6 w-full animate-[fadeIn_0.2s_ease-out]"
        >
          {/* LEVEL 1: Categories Root */}
          {!activeCategoryId && (
            <>
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                    Products
                  </h1>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Manage your product hierarchy.
                  </p>
                </div>
                {categories.length > 0 && (
                  <button
                    onClick={() => setIsCatModalOpen(true)}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer select-none"
                  >
                    <Plus size={15} className="stroke-[2.5]" />
                    <span>New Category</span>
                  </button>
                )}
              </header>

              {categories.length === 0 && !isLoading ? (
                <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[350px] shadow-xs">
                  <FileQuestion className="text-gray-300 dark:text-zinc-700 mb-4" size={42} />
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">No Categories Yet</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-6 max-w-sm">
                    Begin content management by setting up your primary categories of cabins.
                  </p>
                  <button
                    onClick={() => setIsCatModalOpen(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Plus size={15} className="stroke-[2.5]" />
                    <span>Create Category</span>
                  </button>
                </div>
              ) : (
                <CategoryTable onSelectCategory={(id) => setActiveCategoryId(id)} />
              )}
            </>
          )}

          {/* LEVEL 2: Families Listing (Drilled into Category) */}
          {activeCategoryId && !activeFamilyId && activeCategory && (
            <>
              <header className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveCategoryId(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#e31b23] transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft size={14} className="stroke-[2.5]" />
                  <span>Back to Categories</span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                      {activeCategory.name}
                    </h1>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {activeCategory.description || "Manage this category's family series."}
                    </p>
                  </div>
                  {currentCategoryFamiliesCount > 0 && (
                    <button
                      onClick={() => setIsFamModalOpen(true)}
                      className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer select-none"
                    >
                      <Plus size={15} className="stroke-[2.5]" />
                      <span>New Family</span>
                    </button>
                  )}
                </div>
              </header>

              {currentCategoryFamiliesCount === 0 && !isLoading ? (
                <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[350px] shadow-xs">
                  <FileQuestion className="text-gray-300 dark:text-zinc-700 mb-4" size={42} />
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">No Families Created</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-6 max-w-sm">
                    This category does not have any product family series configured yet.
                  </p>
                  <button
                    onClick={() => setIsFamModalOpen(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Plus size={15} className="stroke-[2.5]" />
                    <span>Create Family</span>
                  </button>
                </div>
              ) : (
                <FamilyTable
                  categoryId={activeCategoryId}
                  onSelectFamily={(id) => setActiveFamilyId(id)}
                />
              )}
            </>
          )}

          {/* LEVEL 3: Products Listing (Drilled into Family) */}
          {activeCategoryId && activeFamilyId && activeFamily && (
            <>
              <header className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveFamilyId(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#e31b23] transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft size={14} className="stroke-[2.5]" />
                  <span>Back to Category</span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                      {activeFamily.name}
                    </h1>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1.5">
                      <span className="text-gray-450 italic">{activeCategory?.name}</span>
                      <ChevronRight size={12} className="text-gray-300 dark:text-zinc-800" />
                      <span>{activeFamily.shortDescription}</span>
                    </p>
                  </div>
                  {currentFamilyProductsCount > 0 && (
                    <button
                      onClick={() => setPageView("new")}
                      className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer select-none"
                    >
                      <Plus size={15} className="stroke-[2.5]" />
                      <span>New Product</span>
                    </button>
                  )}
                </div>
              </header>

              {currentFamilyProductsCount === 0 && !isLoading ? (
                <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800/80 rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[350px] shadow-xs">
                  <FileQuestion className="text-gray-300 dark:text-zinc-700 mb-4" size={42} />
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">No Products Found</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-6 max-w-sm">
                    No individual product variant showcase details exist for this family.
                  </p>
                  <button
                    onClick={() => setPageView("new")}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#e31b23] hover:bg-[#ff2d35] rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Plus size={15} className="stroke-[2.5]" />
                    <span>Add Product</span>
                  </button>
                </div>
              ) : (
                <ProductTable
                  familyId={activeFamilyId}
                  onEditProduct={handleEditProduct}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Reset Cache Developer tool bottom bar */}
      <div className="mt-8 border-t border-gray-250 dark:border-zinc-850 pt-5 flex items-center justify-between">
        <span className="text-[10px] text-gray-450 dark:text-gray-500 font-extrabold uppercase tracking-widest">
          Products Explorer • CMS Mode
        </span>
        <button
          onClick={resetData}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:text-[#e31b23] bg-white dark:bg-zinc-900 hover:bg-red-50/50 dark:hover:bg-red-950/20 border border-gray-200 dark:border-zinc-800 rounded-lg transition-colors cursor-pointer select-none"
          title="Reset CMS database to defaults"
        >
          <RefreshCw size={11} />
          <span>Reset Explorer Database</span>
        </button>
      </div>

      {/* Level Modals */}
      <CategoryModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
      />

      {activeCategoryId && (
        <FamilyModal
          isOpen={isFamModalOpen}
          onClose={() => setIsFamModalOpen(false)}
          prefilledCategoryId={activeCategoryId}
        />
      )}
    </div>
  );
}

export default function ProductsAdminPage() {
  return (
    <ProductsProvider>
      <ProductsAdminContent />
    </ProductsProvider>
  );
}
