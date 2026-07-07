"use client";

import Image from "next/image";
import { Eye, MessageSquare, Award } from "lucide-react";

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  views: number;
  clicks: number;
  imageUrl: string;
}

interface TopProductsSectionProps {
  products?: ProductPerformance[];
}

export default function TopProductsSection({ products }: TopProductsSectionProps) {
  // Default mock data aligned with "The Cabins" products
  const defaultProducts: ProductPerformance[] = [
    {
      id: "prod-1",
      name: "Executive Office Cabin",
      category: "Office Cabins",
      views: 1240,
      clicks: 342,
      imageUrl: "/images/logo.jpeg", // fallback image using current logo
    },
    {
      id: "prod-2",
      name: "Luxury Living Cabin",
      category: "Portable Cabins",
      views: 980,
      clicks: 215,
      imageUrl: "/images/logo.jpeg",
    },
    {
      id: "prod-3",
      name: "Double Container Office",
      category: "Container Offices",
      views: 890,
      clicks: 184,
      imageUrl: "/images/logo.jpeg",
    },
    {
      id: "prod-4",
      name: "Portable Security Room",
      category: "Custom Buildings",
      views: 720,
      clicks: 148,
      imageUrl: "/images/logo.jpeg",
    },
    {
      id: "prod-5",
      name: "Custom Event Kiosk",
      category: "Custom Buildings",
      views: 540,
      clicks: 98,
      imageUrl: "/images/logo.jpeg",
    },
  ];

  const displayProducts = products || defaultProducts;

  return (
    <div className="bg-white dark:bg-zinc-900/60 border border-gray-100/60 dark:border-zinc-800/30 rounded-2xl p-6 shadow-xs h-full flex flex-col justify-between">
      {/* Title */}
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Award className="text-[#e31b23]" size={18} />
          Top Performing Products
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Based on visitor views and instant enquiries.
        </p>
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100/60 dark:border-zinc-850/60 pb-3">
              <th className="pb-3 text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                Product
              </th>
              <th className="pb-3 text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider text-right">
                Views
              </th>
              <th className="pb-3 text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider text-right">
                WhatsApp Clicks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800/20">
            {displayProducts.map((prod) => (
              <tr
                key={prod.id}
                className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="py-3.5 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-100/80 dark:border-zinc-850 overflow-hidden shrink-0 flex items-center justify-center">
                    <Image
                      fill
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-850 dark:text-gray-200">
                      {prod.name}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold leading-none mt-0.5">
                      {prod.category}
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-300 text-right">
                  {prod.views.toLocaleString()}
                </td>
                <td className="py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-300 text-right">
                  {prod.clicks.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stacked Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {displayProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-850 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg bg-gray-50 dark:bg-zinc-800 border border-gray-100/80 dark:border-zinc-850 overflow-hidden shrink-0 flex items-center justify-center">
                <Image
                  fill
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-850 dark:text-gray-200 leading-tight">
                  {prod.name}
                </div>
                <div className="text-[9px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
                  {prod.category}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-[9px] text-gray-400 uppercase font-semibold leading-none mb-0.5">
                  Views
                </div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-300">
                  {prod.views}
                </div>
              </div>
              <div>
                <div className="text-[9px] text-gray-400 uppercase font-semibold leading-none mb-0.5">
                  Clicks
                </div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-300">
                  {prod.clicks}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
