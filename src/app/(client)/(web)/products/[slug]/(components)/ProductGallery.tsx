"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-run animation when activeIndex changes
  useGSAP(
    () => {
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  // Stagger animate thumbnails on initial mount
  useGSAP(
    () => {
      const thumbnails = gsap.utils.toArray(".thumbnail-item");
      gsap.fromTo(
        thumbnails,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power1.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-4 w-full">
      {/* Main Image View */}
      <div className="relative overflow-hidden rounded-[24px] border border-gray-200 bg-[#eef0f4] aspect-[4/3] flex items-center justify-center shadow-sm">
        <div ref={mainImageRef} className="relative w-full h-full p-6 flex items-center justify-center">
          <Image
            src={images[activeIndex] || "/images/products-hero.jpg"}
            alt={`${title} - View ${activeIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={activeIndex === 0}
            className="object-contain p-4"
          />
        </div>
      </div>

      {/* Thumbnails list */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {images.slice(0, 5).map((img, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`thumbnail-item shrink-0 relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-[#eef0f4] ${
                isActive ? "border-[#E71F32] shadow-md" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
