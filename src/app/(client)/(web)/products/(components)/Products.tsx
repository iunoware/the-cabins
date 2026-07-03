"use client";

import { useMemo, useState } from "react";
import { products, categories, Category } from "@/src/data/products";
import ProductCard from "./ProductCard";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<Category | "All Products">("All Products");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") return products;

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const getCategoryCount = (category: Category | "All Products") => {
    if (category === "All Products") return products.length;

    return products.filter((product) => product.category === category).length;
  };

  return (
    <section className="bg-white px-4 py-16 ">
      <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[270px_1fr]">
        {/* Left Categories */}
        <aside className="h-fit rounded-3xl max-w-sm border border-gray-200 bg-white p-3 pt-4 lg:sticky lg:top-24">
          <h3 className="mb-4 px-3 text-xs font-extrabold uppercase tracking-[0.22em] text-gray-500">
            Categories
          </h3>

          <div className="space-y-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-[#e71f32] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{category}</span>

                  <span
                    className={`grid h-7 min-w-7 place-items-center rounded-full px-2 text-xs font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {getCategoryCount(category)}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Product Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

