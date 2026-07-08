"use client";

import { useRef } from "react";
import ProductCard from "../../(components)/ProductCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RelatedFamiliesProps {
  relatedFamilies: any[];
}

export default function RelatedFamilies({ relatedFamilies = [] }: RelatedFamiliesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const related = relatedFamilies;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".related-card");
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-16 border-t border-gray-150">
      <div className="max-w-3xl mb-10">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
          Explore
        </h2>
        <p className="text-3xl font-black text-[#111217] tracking-tight">
          Related Product Families
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((fam) => (
          <div key={fam.id} className="related-card">
            <ProductCard product={fam} />
          </div>
        ))}
      </div>
    </section>
  );
}
