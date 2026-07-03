"use client";

import React, { useRef } from "react";
import { 
  HardHat, 
  Shield, 
  Building, 
  Building2, 
  Home, 
  Briefcase, 
  School, 
  Hospital, 
  HelpCircle 
} from "lucide-react";
import { Application } from "@/src/data/products";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ApplicationGridProps {
  applications: Application[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Construction: HardHat,
  Shield: Shield,
  Building: Building,
  Building2: Building2,
  Home: Home,
  Briefcase: Briefcase,
  School: School,
  Hospital: Hospital,
};

export default function ApplicationGrid({ applications }: ApplicationGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".app-card");
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
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
    <section ref={sectionRef} className="py-16">
      <div className="max-w-3xl mb-10">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#E71F32] mb-3">
          Applications
        </h2>
        <p className="text-3xl font-black text-[#111217] tracking-tight">
          Sectors & Ideal Deployments
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {applications.map((app, index) => {
          const IconComponent = iconMap[app.icon] || HelpCircle;

          return (
            <div
              key={index}
              className="app-card group p-6 rounded-2xl border border-gray-200 bg-white text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-[#E71F32] hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#E71F32]/5">
                <IconComponent className="w-7 h-7 text-gray-600 transition-colors duration-300 group-hover:text-[#E71F32]" />
              </div>
              <h3 className="text-sm font-bold text-[#111217] tracking-tight transition-colors duration-300 group-hover:text-[#E71F32]">
                {app.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
