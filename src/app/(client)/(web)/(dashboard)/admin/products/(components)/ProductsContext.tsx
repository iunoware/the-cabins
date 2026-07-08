"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { productFamilies } from "@/src/data/products";

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
}

interface ProductsContextType {
  categories: CategoryState[];
  families: FamilyState[];
  products: ProductState[];
  isLoading: boolean;
  // Category Actions
  addCategory: (category: Omit<CategoryState, "id" | "updatedAt">) => CategoryState;
  updateCategory: (id: string, category: Partial<CategoryState>) => void;
  deleteCategory: (id: string) => void;
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

  // Initialize from products.ts mock data or localStorage
  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem("admin_categories");
      const storedFamilies = localStorage.getItem("admin_families");
      const storedProducts = localStorage.getItem("admin_products");

      if (storedCategories && storedFamilies && storedProducts) {
        setCategories(JSON.parse(storedCategories));
        setFamilies(JSON.parse(storedFamilies));
        setProducts(JSON.parse(storedProducts));
      } else {
        // Build initial structures from static export
        const mappedCategories: CategoryState[] = [];
        const mappedFamilies: FamilyState[] = [];
        const mappedProducts: ProductState[] = [];

        // Track distinct categories
        const catMap = new Map<string, string>(); // name -> id

        productFamilies.forEach((family) => {
          // 1. Process Category
          let catId = catMap.get(family.category);
          if (!catId) {
            catId = `cat-${slugify(family.category)}`;
            catMap.set(family.category, catId);
            mappedCategories.push({
              id: catId,
              name: family.category,
              slug: slugify(family.category),
              description: `Premium engineered ${family.category.toLowerCase()} modular solutions.`,
              image: family.images[0] || "/images/security-cabin.png",
              active: true,
              updatedAt: new Date().toISOString(),
            });
          }

          // 2. Process Family
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

          // 3. Process Variants
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

        // Save back to local storage
        localStorage.setItem("admin_categories", JSON.stringify(mappedCategories));
        localStorage.setItem("admin_families", JSON.stringify(mappedFamilies));
        localStorage.setItem("admin_products", JSON.stringify(mappedProducts));

        setCategories(mappedCategories);
        setFamilies(mappedFamilies);
        setProducts(mappedProducts);
      }
    } catch (e) {
      console.error("Failed to load products context:", e);
    } finally {
      // Small simulated delay for dashboard skeletons
      setTimeout(() => setIsLoading(false), 800);
    }
  }, []);

  // Synchronize state changes to localStorage
  const syncToStorage = (cats: CategoryState[], fams: FamilyState[], prods: ProductState[]) => {
    localStorage.setItem("admin_categories", JSON.stringify(cats));
    localStorage.setItem("admin_families", JSON.stringify(fams));
    localStorage.setItem("admin_products", JSON.stringify(prods));
  };

  // CATEGORY ACTIONS
  const addCategory = (category: Omit<CategoryState, "id" | "updatedAt">) => {
    const newCat: CategoryState = {
      ...category,
      id: `cat-${slugify(category.name)}-${Date.now().toString().slice(-4)}`,
      updatedAt: new Date().toISOString(),
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    syncToStorage(updated, families, products);
    return newCat;
  };

  const updateCategory = (id: string, category: Partial<CategoryState>) => {
    const updated = categories.map((cat) =>
      cat.id === id
        ? { ...cat, ...category, updatedAt: new Date().toISOString() }
        : cat
    );
    setCategories(updated);
    syncToStorage(updated, families, products);
  };

  const deleteCategory = (id: string) => {
    const updatedCats = categories.filter((cat) => cat.id !== id);
    // Cascade delete or detach families and products belonging to this category
    const updatedFams = families.filter((fam) => fam.categoryId !== id);
    const deletedFamIds = families.filter((fam) => fam.categoryId === id).map((f) => f.id);
    const updatedProds = products.filter((prod) => !deletedFamIds.includes(prod.familyId));

    setCategories(updatedCats);
    setFamilies(updatedFams);
    setProducts(updatedProds);
    syncToStorage(updatedCats, updatedFams, updatedProds);
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
    syncToStorage(categories, updated, products);
    return newFam;
  };

  const updateFamily = (id: string, family: Partial<FamilyState>) => {
    const updated = families.map((fam) =>
      fam.id === id
        ? { ...fam, ...family, updatedAt: new Date().toISOString() }
        : fam
    );
    setFamilies(updated);
    syncToStorage(categories, updated, products);
  };

  const deleteFamily = (id: string) => {
    const updatedFams = families.filter((fam) => fam.id !== id);
    const updatedProds = products.filter((prod) => prod.familyId !== id);

    setFamilies(updatedFams);
    setProducts(updatedProds);
    syncToStorage(categories, updatedFams, updatedProds);
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
    syncToStorage(categories, families, updated);
    return newProd;
  };

  const updateProduct = (id: string, product: Partial<ProductState>) => {
    const updated = products.map((prod) =>
      prod.id === id
        ? { ...prod, ...product, updatedAt: new Date().toISOString() }
        : prod
    );
    setProducts(updated);
    syncToStorage(categories, families, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((prod) => prod.id !== id);
    setProducts(updated);
    syncToStorage(categories, families, updated);
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
    syncToStorage(categories, families, updated);
  };

  // Reset to default
  const resetData = () => {
    localStorage.removeItem("admin_categories");
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
