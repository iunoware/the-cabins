"use client";

import { useRef } from "react";
import { Maximize2, Users, HardHat, Award, Download } from "lucide-react";
import { WhatsApp } from "@/src/components/Icons";
import { Product } from "@/src/data/products";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger animate quick-spec cards and buttons on mount
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".info-fade",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      )
        .fromTo(
          ".spec-card",
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.2)",
          },
          "-=0.2",
        )
        .fromTo(
          ".action-btn",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in getting a quote/info for the product: ${product.title}.`,
  );
  // Standard UAE contact link or placeholder
  // href="https://wa.me/971526856240"
  const whatsappUrl = `https://wa.me/971526856240?text=${whatsappMessage}`;

  return (
    <div ref={containerRef} className="flex flex-col h-full justify-between">
      <div>
        {/* Category Badge */}
        <div className="info-fade mb-3">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h1 className="info-fade text-3xl sm:text-4xl font-extrabold text-[#111217] leading-tight tracking-tight">
          {product.title}
        </h1>

        {/* Price Tag */}
        <div className="info-fade mt-3 flex items-center gap-2.5">
          <span className="text-[#E71F32] font-black text-lg">→</span>
          {product.originalPrice && product.discountedPrice ? (
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-2xl font-black text-[#E71F32] tracking-tight">
                AED {Number(product.discountedPrice).toLocaleString()}
              </span>
              <span className="text-sm font-bold text-gray-400 line-through">
                AED {Number(product.originalPrice).toLocaleString()}
              </span>
              <span className="bg-red-50 text-[#E71F32] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                Sale
              </span>
            </div>
          ) : product.originalPrice ? (
            <span className="text-xl font-black text-[#111217] tracking-tight">
              AED {Number(product.originalPrice).toLocaleString()}
            </span>
          ) : product.price && product.price !== "Price on Enquiry" ? (
            <span className="text-xl font-black text-[#111217] tracking-tight">
              {product.price}
            </span>
          ) : (
            <span className="text-xl font-black text-[#111217] tracking-tight text-gray-400">
              Price on Enquiry
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="info-fade mt-4 text-base text-gray-500 leading-relaxed">
          {product.shortDescription}
        </p>

        <hr className="info-fade my-6 border-gray-200" />

        {/* Quick Specification Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Card 1: Size */}
          <div className="spec-card p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2 transition hover:border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <Maximize2 className="w-4 h-4 text-[#E71F32]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Size
              </span>
            </div>
            <span className="text-sm font-extrabold text-[#111217]">
              {product.size}
            </span>
          </div>

          {/* Card 2: Capacity */}
          <div className="spec-card p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2 transition hover:border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-4 h-4 text-[#E71F32]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Capacity
              </span>
            </div>
            <span className="text-sm font-extrabold text-[#111217]">
              {product.capacity}
            </span>
          </div>

          {/* Card 3: Material */}
          <div className="spec-card p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2 transition hover:border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <HardHat className="w-4 h-4 text-[#E71F32]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Material
              </span>
            </div>
            <span className="text-sm font-extrabold text-[#111217] line-clamp-1">
              {product.material}
            </span>
          </div>

          {/* Card 4: Warranty */}
          <div className="spec-card p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2 transition hover:border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-4 h-4 text-[#E71F32]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Warranty
              </span>
            </div>
            <span className="text-sm font-extrabold text-[#111217]">
              {product.warranty}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="action-btn flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E71F32] hover:bg-[#ff2d35] text-white font-extrabold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 text-center cursor-pointer"
        >
          <WhatsApp className="w-5 h-5 fill-white" />
          <span>WhatsApp Enquiry</span>
        </a>

        {/* Brochure Download Button */}
        <a
          href={product.brochure}
          download
          className="action-btn flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-gray-800 font-extrabold text-sm border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 text-center cursor-pointer"
        >
          <Download className="w-4 h-4 text-gray-600" />
          <span>Download Brochure</span>
        </a>
      </div>
    </div>
  );
}
