"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product } from "@/src/data/products";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductHeaderShowcaseProps {
  product: Product;
}

export default function ProductHeaderShowcase({ product }: ProductHeaderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".breadcrumb-anim, .gallery-anim, .info-anim", {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline();

      tl.fromTo(
        ".breadcrumb-anim",
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
      )
        .fromTo(
          ".gallery-anim",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.25"
        )
        .fromTo(
          ".info-anim",
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* 1. Breadcrumb */}
      <nav className="breadcrumb-anim mb-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400">
        <Link href="/" className="hover:text-[#E71F32] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <Link href="/products" className="hover:text-[#E71F32] transition">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-gray-400 font-bold uppercase text-[11px] tracking-wider">
          {product.category}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-[#111217] font-bold">
          {product.title}
        </span>
      </nav>

      {/* 2. Product Showcase Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Gallery */}
        <div className="gallery-anim lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Right Column: Info */}
        <div className="info-anim lg:col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
