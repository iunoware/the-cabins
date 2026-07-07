"use client";

import { useRef } from "react";
import { ProductFamily, productFamilies } from "@/src/data/products";
import ProductCard from "../../(components)/ProductCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RelatedFamiliesProps {
  currentFamily: ProductFamily;
}

export default function RelatedFamilies({ currentFamily }: RelatedFamiliesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter same category families, exclude current family
  const related = (() => {
    const sameCategory = productFamilies.filter(
      (f) => f.category === currentFamily.category && f.id !== currentFamily.id
    );
    let list = [...sameCategory];

    // Pad with other categories if we have fewer than 3 families in this category
    if (list.length < 3) {
      const remaining = 3 - list.length;
      const otherCats = productFamilies.filter(
        (f) => f.category !== currentFamily.category && f.id !== currentFamily.id
      );
      list = [...list, ...otherCats.slice(0, remaining)];
    }

    return list.slice(0, 3);
  })();

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
