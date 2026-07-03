"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Phone, WhatsApp, FileText } from "@/components/Icons";

export default function FloatingContact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(containerRef.current?.children || [], { opacity: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        containerRef.current?.children || [],
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.8, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed right-4 md:right-6 top-[55%] -translate-y-1/2 z-40 flex flex-col gap-3.5"
    >
      <a
        href="https://wa.me/971526856240"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="w-11 h-11 sm:w-12 sm:h-12 bg-[#24D366] text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-108 hover:shadow-[0_4px_16px_rgba(36,211,102,0.4)] focus:outline-none focus:ring-2 focus:ring-[#24D366] cursor-pointer"
      >
        <WhatsApp className="w-5 h-5" />
      </a>
      <a
        href="tel:+971526856240"
        aria-label="Call us now"
        className="w-11 h-11 sm:w-12 sm:h-12 bg-[#111111]/90 backdrop-blur-sm border border-white/10 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-108 hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
      >
        <Phone className="w-5 h-5 text-white" />
      </a>
      <a
        href="/brochure.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download corporate brochure"
        className="w-11 h-11 sm:w-12 sm:h-12 bg-[#D81E2C] text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-108 hover:shadow-[0_4px_16px_rgba(216,30,44,0.4)] focus:outline-none focus:ring-2 focus:ring-[#D81E2C] cursor-pointer"
      >
        <FileText className="w-5 h-5 text-white" />
      </a>
    </div>
  );
}
