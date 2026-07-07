"use client";

import Link from "next/link";
import { Product } from "@/src/data/products";

interface VariantComparisonProps {
  variants: Product[];
  familySlug: string;
}

export default function VariantComparison({ variants, familySlug }: VariantComparisonProps) {
  return (
    <section className="py-12 border-t border-gray-150">
      <div className="max-w-3xl mb-8">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
          Compare
        </h2>
        <p className="text-3xl font-black text-[#111217] tracking-tight">
          Variant Comparison
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-[20px] border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#111217] text-white">
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider">
                  Variant
                </th>
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider">
                  Dimensions
                </th>
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider">
                  Warranty
                </th>
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4.5 text-xs font-extrabold uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {variants.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-gray-50/50 transition-colors duration-150 font-medium"
                >
                  {/* Variant Name */}
                  <td className="px-6 py-4.5 text-sm font-black text-[#111217]">
                    {v.title}
                  </td>
                  {/* Size / Dimensions */}
                  <td className="px-6 py-4.5 text-sm text-gray-500">
                    {v.size}
                  </td>
                  {/* Capacity */}
                  <td className="px-6 py-4.5 text-sm text-gray-500">
                    {v.capacity}
                  </td>
                  {/* Material */}
                  <td className="px-6 py-4.5 text-sm text-gray-500 max-w-[200px] truncate" title={v.material}>
                    {v.material}
                  </td>
                  {/* Warranty */}
                  <td className="px-6 py-4.5 text-sm text-gray-500">
                    {v.warranty}
                  </td>
                  {/* Price */}
                  <td className="px-6 py-4.5 text-sm font-black text-[#E71F32]">
                    {v.price}
                  </td>
                  {/* CTA */}
                  <td className="px-6 py-4.5 text-sm text-right">
                    <Link
                      href={`/products/${familySlug}/${v.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wide text-[#E71F32] hover:text-[#ff2d35] transition duration-150"
                    >
                      <span>View</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
