"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/src/data/products";
import { UserIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      <div className="relative flex h-48 items-center justify-center bg-[#eef0f4] shrink-0">
        {product.badge && (
          <span className="absolute z-50 left-4 top-4 rounded-full bg-[#111217] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}

        <Image
          src={product.images[0]}
          alt={product.title}
          width={260}
          height={170}
          className="h-36 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col grow justify-between">
        <div>
          <h2 className="text-xl font-extrabold leading-tight text-[#111217]">
            {product.title}
          </h2>

          <p className="mt-3 min-h-13.5 text-sm leading-6 text-gray-500">
            {product.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="text-[#e71f32] font-bold">⌗</span>
            <span>{product.size}</span>

            {/* <span className="text-[#e71f32] font-bold">♙</span> */}
            <span className="text-[#e71f32] font-bold">
              <UserIcon className="h-4 w-4" />
            </span>
            <span>{product.capacity}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <Link
            href={`/products/${product.slug}`}
            className="text-left text-sm font-extrabold text-[#e71f32] hover:text-[#e71f32]/80 transition flex items-center gap-1 group"
          >
            <span>View Details</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <p className="whitespace-nowrap text-sm font-extrabold text-[#111217]">
            <span className="text-[#e71f32]">→</span> {product.price}
          </p>
        </div>
      </div>
    </article>
  );
}
