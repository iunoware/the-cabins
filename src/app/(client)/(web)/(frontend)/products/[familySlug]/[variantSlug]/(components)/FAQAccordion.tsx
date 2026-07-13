"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/src/data/products";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQAccordionProps {
  faq?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "How long does it take to manufacture and deliver a cabin?",
    answer: "Our standard manufacturing timeline ranges from 7 to 14 working days depending on the customization and size. Delivery is arranged using specialized flatbed trucks to your site across the UAE and GCC."
  },
  {
    question: "Do I need site preparation or special foundation before installation?",
    answer: "Minimal site preparation is required. The ground should be level, compacted, and preferably have concrete blocks or a concrete slab at the corners to support the cabin frame. We provide structural drawings to guide your site preparation."
  },
  {
    question: "Are the cabins insulated and weatherproof for extreme weather conditions?",
    answer: "Yes, all our cabins are constructed with high-density polyurethane (PU) or rockwool insulated sandwich panels, offering superior thermal insulation to withstand high temperatures (up to 55°C) and extreme Middle East regional humidity."
  },
  {
    question: "Can the interior layout, electrical outlets, and plumbing be customized?",
    answer: "Absolutely. We provide fully customized solutions. You can choose the placement of doors, windows, AC units, electrical sockets, pantry sinks, and partition walls during the order configuration phase."
  },
  {
    question: "What warranty and post-installation support do you offer?",
    answer: "We offer a 1-year structural warranty on all our modular cabins, covering manufacturing defects, leakage, and insulation. Our maintenance team is available for on-site support and relocation assistance."
  }
];

export default function FAQAccordion({ faq = [] }: FAQAccordionProps) {
  const displayFaq = faq.length > 0 ? faq : defaultFaqs;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
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

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="py-16">
      <div className="max-w-3xl mb-10">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
          FAQ
        </h2>
        <p className="text-3xl font-black text-[#111217] tracking-tight">
          Frequently Asked Questions
        </p>
      </div>

      <div className="max-w-4xl border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-sm divide-y divide-gray-200">
        {displayFaq.map((item, index) => {
          const isOpen = index === activeIndex;

          return (
            <div key={index} className="transition-colors duration-200 hover:bg-gray-50/30">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left font-extrabold text-[#111217] transition-all cursor-pointer"
              >
                <span className="text-base sm:text-lg pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#E71F32]" : ""
                  }`}
                />
              </button>
              
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-sm sm:text-base leading-relaxed text-gray-500 border-t border-gray-100/50 pt-4 bg-gray-50/10">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
