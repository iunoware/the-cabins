"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product, productFamilies } from "@/src/data/products";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Breadcrumb from "../../(components)/Breadcrumb";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";

interface ProductHeaderShowcaseProps {
  product: Product;
}

export default function ProductHeaderShowcase({ product }: ProductHeaderShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const family = productFamilies.find((f) => f.slug === product.familySlug);

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
      <Breadcrumb
        category={product.category}
        family={family ? { title: family.title, slug: family.slug } : undefined}
        variantName={product.title}
      />


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
