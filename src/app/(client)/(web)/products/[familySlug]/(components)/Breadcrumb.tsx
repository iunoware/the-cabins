"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  category: string;
  family?: {
    title: string;
    slug: string;
  };
  variantName?: string;
}

export default function Breadcrumb({ category, family, variantName }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb-anim mb-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400">
      <Link href="/" className="hover:text-[#E71F32] transition">
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
      <Link href="/products" className="hover:text-[#E71F32] transition">
        Products
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
      
      {family ? (
        <>
          <span className="text-gray-400 font-bold uppercase text-[11px] tracking-wider">
            {category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          {variantName ? (
            <>
              <Link href={`/products/${family.slug}`} className="hover:text-[#E71F32] transition">
                {family.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-[#111217] font-bold">
                {variantName}
              </span>
            </>
          ) : (
            <span className="text-[#111217] font-bold">
              {family.title}
            </span>
          )}
        </>
      ) : (
        <span className="text-[#111217] font-bold">
          {category}
        </span>
      )}
    </nav>
  );
}
