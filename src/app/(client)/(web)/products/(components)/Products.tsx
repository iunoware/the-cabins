"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Category =
  | "All Products"
  | "Security Cabins"
  | "Portable Cabins"
  | "Office Cabins"
  | "Accommodation"
  | "Toilet Cabins"
  | "Container Offices"
  | "Container Buildings"
  | "Custom Buildings";

type Product = {
  id: number;
  title: string;
  category: Exclude<Category, "All Products">;
  description: string;
  size: string;
  capacity: string;
  price: string;
  badge?: string;
  image: string;
};

const categories: Category[] = [
  "All Products",
  "Security Cabins",
  "Portable Cabins",
  "Office Cabins",
  "Accommodation",
  "Toilet Cabins",
  "Container Offices",
  "Container Buildings",
  "Custom Buildings",
];

const products: Product[] = [
  // security cabins
  {
    id: 1,
    title: "Security Guard Cabin",
    category: "Security Cabins",
    description: "Single-occupancy booth with 360° glazing and AC-ready insulation.",
    size: "1.5×1.5 m",
    capacity: "1 person",
    price: "From AED 9,500",
    badge: "Popular",
    image: "/images/security-cabin.png",
  },
  {
    id: 2,
    title: "Watchman Booth",
    category: "Security Cabins",
    description: "Compact entry-gate booth with signage strip and sliding window.",
    size: "2×2 m",
    capacity: "1–2 person",
    price: "From AED 12,000",
    image: "/images/security-cabin.png",
  },

  // portable cabin
  {
    id: 3,
    title: "Standard Portable Cabin",
    category: "Portable Cabins",
    description: "The all-purpose relocatable cabin - fast to deploy, easy to move.",
    size: "3×6 m",
    capacity: "4-6 person",
    price: "From AED 16,000",
    image: "/images/portable-cabin.png",
  },
  {
    id: 4,
    title: "Portable Site Office",
    category: "Portable Cabins",
    description: "Ready-to-work cabin with desk-ready power and data provisions.",
    size: "3×7 m",
    capacity: "6 person",
    price: "From AED 19,500",
    image: "/images/portable-cabin.png",
  },

  // Office Cabins
  {
    id: 5,
    title: "Executive Office Cabin",
    category: "Office Cabins",
    description: "Insulated, climate-controlled workspace with premium interior finish.",
    size: "4×8 m",
    capacity: "8 person",
    price: "From AED 28,000",
    badge: "Premium",
    image: "/images/office-cabin.png",
  },
  {
    id: 6,
    title: "Modular Office Suite",
    category: "Office Cabins",
    description: "Multi-room office configuration with meeting space and pantry.",
    size: "6×12 m",
    capacity: "12+ person",
    price: "From AED 52,000",
    image: "/images/office-cabin.png",
  },

  // Accommodation
  {
    id: 7,
    title: "Labour Accommodation",
    category: "Accommodation",
    description: "Durable bunk-ready housing engineered for the regional climate.",
    size: "6×14 m",
    capacity: "8-12 beds",
    price: "From AED 34,000",
    image: "/images/accommodation.png",
  },
  {
    id: 8,
    title: "Staff Accommodation",
    category: "Accommodation",
    description: "Partitioned living quarters with private rooms and shared facilities.",
    size: "6×16 m",
    capacity: "6 rooms",
    price: "From AED 46,000",
    image: "/images/accommodation.png",
  },

  // Toilet Cabins
  {
    id: 9,
    title: "Portable Toilet Block",
    category: "Toilet Cabins",
    description: "Fully-plumbed multi-stall washroom with ventilation and water tank.",
    size: "3×6 m",
    capacity: "4 stalls",
    price: "From AED 14,500",
    image: "/images/toilet-cabins.png",
  },
  {
    id: 10,
    title: "Ablution & Shower Unit",
    category: "Toilet Cabins",
    description: "Combined ablution, shower and washroom block for labour camps.",
    size: "4×8 m",
    capacity: "8 stalls",
    price: "From AED 22,000",
    image: "/images/toilet-cabins.png",
  },

  // Container Offices
  {
    id: 11,
    title: "20ft Container Office",
    category: "Container Offices",
    description: "Converted shipping container — rugged, secure and rapid to deploy.",
    size: "6x2.4 m",
    capacity: "3–4 person",
    price: "From AED 21,000",
    image: "/images/container-offices.png",
  },
  {
    id: 12,
    title: "40ft Container Office",
    category: "Container Offices",
    description: "Spacious container workspace with partitions, glazing and HVAC.",
    size: "12x2.4 m",
    capacity: "5-8 person",
    price: "From AED 38,000",
    image: "/images/container-offices.png",
  },

  // Container Buildings
  {
    id: 13,
    title: "Double-Stack Building",
    category: "Container Buildings",
    description: "Two-storey stacked container complex with external stair access.",
    size: "2 storey",
    capacity: "20+ person",
    price: "From AED 96,000",
    image: "/images/container-buildings.png",
  },
  {
    id: 14,
    title: "Container Building Block",
    category: "Container Buildings",
    description: "Modular container cluster for large-scale worker camps and sites.",
    size: "Multi-unit",
    capacity: "50+ person",
    price: "On request",
    image: "/images/container-buildings.png",
  },

  // Custom Buildings
  {
    id: 15,
    title: "Custom Modular Villa",
    category: "Custom Buildings",
    description: "Architect-designed two-storey modular home with full glazing.",
    size: "Custom",
    capacity: "Bespoke",
    price: "On request",
    badge: "Bespoke",
    image: "/images/custom-buildings.png",
  },
  {
    id: 16,
    title: "Custom Showroom",
    category: "Custom Buildings",
    description: "Premium retail or showroom space engineered to your brand spec.",
    size: "Custom",
    capacity: "Bespoke",
    price: "On request",
    image: "/images/custom-buildings.png",
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Products");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") return products;

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const getCategoryCount = (category: Category) => {
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
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm font-semibold transition ${
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
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex h-48 items-center justify-center bg-[#eef0f4]">
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#111217] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">
                    {product.badge}
                  </span>
                )}

                <Image
                  src={product.image}
                  alt={product.title}
                  width={260}
                  height={170}
                  className="h-36 w-auto object-contain"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-extrabold leading-tight text-[#111217]">
                  {product.title}
                </h2>

                <p className="mt-3 min-h-13.5 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="text-[#e71f32]">⌗</span>
                  <span>{product.size}</span>

                  <span className="text-[#e71f32]">♙</span>
                  <span>{product.capacity}</span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <button className="text-left text-sm font-extrabold text-[#e71f32]">
                    Request Quote <span className="ml-1">→</span>
                  </button>

                  <p className="whitespace-nowrap text-sm font-extrabold text-[#111217]">
                    <span className="text-[#e71f32]">→</span> {product.price}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
