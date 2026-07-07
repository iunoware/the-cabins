"use client";

import { useRef } from "react";
import Image from "next/image";
import { ProductFamily } from "@/src/data/products";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FamilyHeroProps {
  family: ProductFamily;
}

export default function FamilyHero({ family }: FamilyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".gallery-anim, .info-anim", {
          opacity: 1,
          x: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline();

      tl.fromTo(
        ".gallery-anim",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
      ).fromTo(
        ".info-anim",
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        "-=0.45"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="grid gap-8 lg:grid-cols-12 items-start w-full">
      {/* Left Column: Large Family Thumbnail */}
      <div className="gallery-anim lg:col-span-7 w-full">
        <div className="relative overflow-hidden rounded-[24px] border border-gray-200 bg-[#eef0f4] aspect-[4/3] flex items-center justify-center shadow-sm">
          <div className="relative w-full h-full p-6 flex items-center justify-center">
            <Image
              src={family.images[0] || "/images/products-hero.jpg"}
              alt={family.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              priority
              className="object-contain p-4 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Family Name & Description */}
      <div className="info-anim lg:col-span-5 flex flex-col justify-center py-4">
        {/* Category Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
            {family.category}
          </span>
          {family.badge && (
            <span className="inline-block rounded-full bg-[#111217] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
              {family.badge}
            </span>
          )}
        </div>

        {/* Family Name */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111217] leading-tight tracking-tight">
          {family.title}
        </h1>

        {/* Price & Variant Count */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#E71F32] font-black text-lg">→</span>
            <span className="text-xl font-black text-[#111217] tracking-tight">
              {family.startingPrice}
            </span>
          </div>
          <span className="text-sm font-extrabold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            {family.variants.length} {family.variants.length === 1 ? "Variant" : "Variants"} Available
          </span>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Short Description */}
        <p className="text-base text-gray-500 leading-relaxed">
          {family.shortDescription}
        </p>

        {/* Specification quick overview */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50/50 border border-gray-100 p-4 rounded-2xl">
          <div>
            <span className="block text-[10px] text-gray-400 mb-1">Size Range</span>
            <span className="text-sm font-extrabold text-[#111217] normal-case">{family.sizeRange}</span>
          </div>
          <div>
            <span className="block text-[10px] text-gray-400 mb-1">Capacity Range</span>
            <span className="text-sm font-extrabold text-[#111217] normal-case">{family.capacityRange}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
