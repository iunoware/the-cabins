"use client";

import { useRef } from "react";
import { Specification } from "@/src/data/products";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpecificationTableProps {
  specifications: Specification[];
}

export default function SpecificationTable({ specifications }: SpecificationTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(containerRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="py-16">
      <div className="max-w-3xl mb-8">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
          Specifications
        </h2>
        <p className="text-3xl font-black text-[#111217] tracking-tight">
          Technical Specifications & Composition
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/3 min-w-[200px]">
                  Component / Parameter
                </th>
                <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-500 w-2/3 min-w-[300px]">
                  Standard Specification Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {specifications.map((spec, index) => (
                <tr 
                  key={index}
                  className="transition hover:bg-gray-50/30 odd:bg-white even:bg-gray-50/20"
                >
                  <td className="px-6 py-4 text-sm font-extrabold text-gray-700">
                    {spec.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 leading-relaxed">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
