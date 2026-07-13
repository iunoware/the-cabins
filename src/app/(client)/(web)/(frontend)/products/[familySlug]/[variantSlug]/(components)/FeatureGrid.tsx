"use client";

import React, { useRef } from "react";
import { 
  Shield, 
  Thermometer, 
  Flame, 
  Zap, 
  Hammer, 
  Maximize, 
  Settings,
  HelpCircle
} from "lucide-react";
import { Feature } from "@/src/data/products";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureGridProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    title: "Weatherproof Insulation",
    description: "Constructed with high-density insulated sandwich panels offering optimal thermal resistance against regional humidity and heat.",
    icon: "Thermometer"
  },
  {
    title: "Heavy-Duty Steel Structure",
    description: "Built on a rigid, engineered structural steel chassis, epoxy coated to resist corrosion and allow safe crane relocation.",
    icon: "Shield"
  },
  {
    title: "Fire Retardant Materials",
    description: "Uses fire-rated wall panels and electrical conduits complying with local civil defense and structural safety standards.",
    icon: "Flame"
  },
  {
    title: "Plug-and-Play Utilities",
    description: "Comes with pre-installed electrical DB boards, premium switches, lighting sockets, and plumbing points for quick connection.",
    icon: "Zap"
  },
  {
    title: "Zero Site-Assembly",
    description: "Fully fabricated, wired, and finished in-house at our factory and delivered complete, eliminating on-site disruption.",
    icon: "Hammer"
  },
  {
    title: "Optimized Space Layout",
    description: "Smart interior planning featuring maximized room clearances, robust window structures, and optimized airflow layouts.",
    icon: "Maximize"
  }
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Thermometer,
  Flame,
  Zap,
  Hammer,
  Maximize,
  Settings,
};

export default function FeatureGrid({ features = [] }: FeatureGridProps) {
  const displayFeatures = features.length > 0 ? features : defaultFeatures;
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".feature-card");
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
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
    <section ref={sectionRef} className="py-16 bg-[#fafafa] rounded-[32px] px-8 sm:px-12 border border-gray-100">
      <div className="max-w-3xl mb-12">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
          Key Features
        </h2>
        <p className="text-3xl font-black text-[#111217] tracking-tight">
          Engineered for Durability, Composed for Comfort
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayFeatures.map((feature, index) => {
          const IconComponent = iconMap[feature.icon] || HelpCircle;

          return (
            <div
              key={index}
              className="feature-card group p-6 rounded-2xl border border-gray-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#E71F32]/5 shrink-0">
                <IconComponent className="w-6 h-6 text-gray-700 transition-colors duration-300 group-hover:text-[#E71F32]" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#111217] mb-2 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
