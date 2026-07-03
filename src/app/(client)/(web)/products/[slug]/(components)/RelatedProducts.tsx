"use client";

import { useRef } from "react";
import { Product, products } from "@/src/data/products";
import ProductCard from "../../(components)/ProductCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter same category products, exclude current product
  const related = (() => {
    const sameCategory = products.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );
    let list = [...sameCategory];
    
    // Pad with other categories if we have fewer than 3 products in this category
    if (list.length < 3) {
      const remaining = 3 - list.length;
      const otherCats = products.filter(
        (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
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
          Related Products
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((prod) => (
          <div key={prod.id} className="related-card">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  );
}
