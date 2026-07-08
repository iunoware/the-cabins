"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { productFamilies } from "@/src/data/products";
import { toast } from "sonner";

// Helper for slug generation
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Type Definitions conforming to database structure
export interface CategoryState {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean; // true = Published, false = Draft
  updatedAt: string;
  familiesCount: number;
  productsCount: number;
}

export interface FamilyState {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  active: boolean;
  featured: boolean;
  popular: boolean;
  updatedAt: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductSpecification {
  parameter: string;
  value: string;
}

export interface ProductState {
  id: string;
  familyId: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string;
  brochure: string;
  model3d: string;
  thumbnail: string;
  images: string[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  active: boolean;
  featured: boolean;
  updatedAt: string;
  // Overrides & Extra metadata
  ctaText?: string;
  whatsappNumber?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogImage?: string;
  // Pricing
  originalPrice?: number;
  discountedPrice?: number;
  currency?: string;
}

interface ProductsContextType {
  categories: CategoryState[];
  families: FamilyState[];
  products: ProductState[];
  isLoading: boolean;
  loadCategories: (search?: string, status?: string, sortBy?: string) => Promise<void>;
  // Category Actions
  addCategory: (category: Omit<CategoryState, "id" | "updatedAt" | "familiesCount" | "productsCount">) => Promise<CategoryState>;
  updateCategory: (id: string, category: Partial<CategoryState>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  // Family Actions
  addFamily: (family: Omit<FamilyState, "id" | "updatedAt">) => FamilyState;
  updateFamily: (id: string, family: Partial<FamilyState>) => void;
  deleteFamily: (id: string) => void;
  // Product Actions
  addProduct: (product: Omit<ProductState, "id" | "updatedAt">) => ProductState;
  updateProduct: (id: string, product: Partial<ProductState>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  // Reset helper
  resetData: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryState[]>([]);
  const [families, setFamilies] = useState<FamilyState[]>([]);
  const [products, setProducts] = useState<ProductState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories from live backend
  const loadCategories = async (search = "", status = "all", sortBy = "newest") => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ search, status, sortBy }).toString();
      const res = await fetch(`/api/admin/categories?${query}`);

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
      toast.error("Failed to load categories from the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Category and local mock data on mount
  useEffect(() => {
    // Load Categories from Backend API
    loadCategories();

    // Load Families and Products from LocalStorage for UI drilldown fallbacks (Phase 1)
    try {
      const storedFamilies = localStorage.getItem("admin_families");
      const storedProducts = localStorage.getItem("admin_products");

      if (storedFamilies && storedProducts) {
        setFamilies(JSON.parse(storedFamilies));
        setProducts(JSON.parse(storedProducts));
      } else {
        const mappedFamilies: FamilyState[] = [];
        const mappedProducts: ProductState[] = [];

        // Build initial structures from static export
        productFamilies.forEach((family) => {
          const catId = `cat-${slugify(family.category)}`;
          const famId = `fam-${family.slug}`;

          mappedFamilies.push({
            id: famId,
            categoryId: catId,
            name: family.title,
            slug: family.slug,
            shortDescription: family.shortDescription || family.description,
            thumbnail: family.images[0] || "/images/security-cabin.png",
            active: true,
            featured: family.badge === "Popular" || family.badge === "Premium",
            popular: family.badge === "Popular",
            updatedAt: new Date().toISOString(),
          });

          family.variants.forEach((variant) => {
            mappedProducts.push({
              id: `prod-${variant.id}`,
              familyId: famId,
              name: variant.title,
              slug: variant.slug,
              shortDescription: variant.shortDescription || variant.description || "",
              description: variant.fullDescription || variant.description || "",
              price: variant.price || "From AED 9,500",
              brochure: variant.brochure || "",
              model3d: (variant as any).model3d || "",
              thumbnail: variant.images[0] || "/images/security-cabin.png",
              images: variant.images && variant.images.length > 0 ? variant.images : ["/images/security-cabin.png"],
              specifications: variant.specifications
                ? variant.specifications.map((s) => ({ parameter: s.label, value: s.value }))
                : [],
              features: variant.features
                ? variant.features.map((f) => ({ title: f.title, description: f.description, icon: f.icon }))
                : [],
              active: true,
              featured: variant.badge === "Popular" || variant.badge === "Featured",
              updatedAt: new Date().toISOString(),
              ctaText: "Enquire Now",
              whatsappNumber: "+971526856240",
              metaTitle: `${variant.title} | The Cabins`,
              metaDescription: variant.shortDescription || "",
              keywords: `${variant.title}, modular cabins, UAE construction`,
              ogImage: variant.images[0] || "",
            });
          });
        });

        localStorage.setItem("admin_families", JSON.stringify(mappedFamilies));
        localStorage.setItem("admin_products", JSON.stringify(mappedProducts));

        setFamilies(mappedFamilies);
        setProducts(mappedProducts);
      }
    } catch (e) {
      console.error("Failed to load local families/products mock data:", e);
    }
  }, []);

  // Sync family & products data changes to localStorage
  const syncToStorage = (fams: FamilyState[], prods: ProductState[]) => {
    localStorage.setItem("admin_families", JSON.stringify(fams));
    localStorage.setItem("admin_products", JSON.stringify(prods));
  };

  // CATEGORY ACTIONS
  const addCategory = async (category: Omit<CategoryState, "id" | "updatedAt" | "familiesCount" | "productsCount">) => {
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      const newCat = await res.json();
      setCategories((prev) => [newCat, ...prev]);
      toast.success("Category created successfully.");
      return newCat;
    } catch (err: any) {
      console.error("Failed to create category:", err);
      toast.error(err.message || "Failed to create category.");
      throw err;
    }
  };

  const updateCategory = async (id: string, category: Partial<CategoryState>) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      const updatedCat = await res.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCat : cat))
      );
      toast.success("Category updated successfully.");
    } catch (err: any) {
      console.error("Failed to update category:", err);
      toast.error(err.message || "Failed to update category.");
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted successfully.");
    } catch (err: any) {
      console.error("Failed to delete category:", err);
      toast.error(err.message || "Failed to delete category.");
      throw err;
    }
  };

  // FAMILY ACTIONS
  const addFamily = (family: Omit<FamilyState, "id" | "updatedAt">) => {
    const newFam: FamilyState = {
      ...family,
      id: `fam-${slugify(family.name)}-${Date.now().toString().slice(-4)}`,
      updatedAt: new Date().toISOString(),
    };
    const updated = [...families, newFam];
    setFamilies(updated);
    syncToStorage(updated, products);
    return newFam;
  };

  const updateFamily = (id: string, family: Partial<FamilyState>) => {
    const updated = families.map((fam) =>
      fam.id === id
        ? { ...fam, ...family, updatedAt: new Date().toISOString() }
        : fam
    );
    setFamilies(updated);
    syncToStorage(updated, products);
  };

  const deleteFamily = (id: string) => {
    const updatedFams = families.filter((fam) => fam.id !== id);
    const updatedProds = products.filter((prod) => prod.familyId !== id);

    setFamilies(updatedFams);
    setProducts(updatedProds);
    syncToStorage(updatedFams, updatedProds);
  };

  // PRODUCT ACTIONS
  const addProduct = (product: Omit<ProductState, "id" | "updatedAt">) => {
    const newProd: ProductState = {
      ...product,
      id: `prod-${slugify(product.name)}-${Date.now().toString().slice(-4)}`,
      updatedAt: new Date().toISOString(),
    };
    const updated = [...products, newProd];
    setProducts(updated);
    syncToStorage(families, updated);
    return newProd;
  };

  const updateProduct = (id: string, product: Partial<ProductState>) => {
    const updated = products.map((prod) =>
      prod.id === id
        ? { ...prod, ...product, updatedAt: new Date().toISOString() }
        : prod
    );
    setProducts(updated);
    syncToStorage(families, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((prod) => prod.id !== id);
    setProducts(updated);
    syncToStorage(families, updated);
  };

  const duplicateProduct = (id: string) => {
    const source = products.find((prod) => prod.id === id);
    if (!source) return;

    const dupName = `${source.name} (Copy)`;
    const dupSlug = `${source.slug}-copy`;
    const duplicated: ProductState = {
      ...source,
      id: `prod-${slugify(dupName)}-${Date.now().toString().slice(-4)}`,
      name: dupName,
      slug: dupSlug,
      updatedAt: new Date().toISOString(),
    };
    const updated = [...products, duplicated];
    setProducts(updated);
    syncToStorage(families, updated);
  };

  // Reset to default
  const resetData = () => {
    localStorage.removeItem("admin_families");
    localStorage.removeItem("admin_products");
    window.location.reload();
  };

  return (
    <ProductsContext.Provider
      value={{
        categories,
        families,
        products,
        isLoading,
        loadCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        addFamily,
        updateFamily,
        deleteFamily,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        resetData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
