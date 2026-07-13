"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronRight, Rotate3d, Image as ImageIcon } from "lucide-react";
import { Product, productFamilies } from "@/src/data/products";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Breadcrumb from "../../(components)/Breadcrumb";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

const Product3DViewer = dynamic(
  () => import("@/src/components/product/Product3DViewer"),
  { ssr: false },
);

interface ProductHeaderShowcaseProps {
  product: Product;
}

export default function ProductHeaderShowcase({
  product,
}: ProductHeaderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const family = productFamilies.find((f) => f.slug === product.familySlug);
  const [viewMode, setViewMode] = useState<"3d" | "gallery">("3d");

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
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
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
      )
        .fromTo(
          ".gallery-anim",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.25",
        )
        .fromTo(
          ".info-anim",
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55",
        );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* 1. Breadcrumb */}
      <Breadcrumb
        category={product.category}
        family={family ? { title: family.title, slug: family.slug } : undefined}
        variantName={product.title}
      />

      {/* 2. Product Showcase Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Media Showcase */}
        <div className="gallery-anim lg:col-span-7 flex flex-col gap-4">
          {/* Tab Selector Overlay */}
          <div className="flex items-center gap-1 bg-gray-50/50 dark:bg-zinc-900/30 p-1 rounded-full border border-gray-100 dark:border-zinc-800/40 self-start">
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === "3d"
                  ? "bg-black dark:bg-zinc-850 text-white shadow-sm"
                  : "text-gray-500 hover:text-black dark:hover:text-gray-200"
              }`}
            >
              <Rotate3d size={14} />
              <span>3D Interactive</span>
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === "gallery"
                  ? "bg-black dark:bg-zinc-850 text-white shadow-sm"
                  : "text-gray-500 hover:text-black dark:hover:text-gray-200"
              }`}
            >
              <ImageIcon size={14} />
              <span>Gallery Photos</span>
            </button>
          </div>

          {/* Interactive Viewer frame */}
          <div className="w-full">
            {viewMode === "3d" ? (
              /*
                TO SWITCH FROM THE TEMPORARY MODEL TO DATABASE FIELD LATER:
                Simply replace "/3d-models/solar_panel_production1.glb" below with product.model3d:
                modelUrl={product.model3d || "/3d-models/solar_panel_production1.glb"}
              */
              <Product3DViewer
                // modelUrl="/3d-models/solar_panel_production1.glb"
                modelUrl={product.model3d}
                altText={product.title}
              />
            ) : (
              <ProductGallery images={product.images} title={product.title} />
            )}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="info-anim lg:col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
