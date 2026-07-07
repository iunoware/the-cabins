"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 1500, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "+", label: "Expert Team" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // One ref per number <span>, used as the animation target
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const gridChildren = gridRef.current ? gsap.utils.toArray(gridRef.current.children) : [];

      if (prefersReducedMotion) {
        if (gridChildren.length > 0) {
          gsap.set(gridChildren, { opacity: 1, y: 0 });
        }
        numberRefs.current.forEach((el, i) => {
          if (el) el.textContent = statsData[i].value.toLocaleString();
        });
        return;
      }

      if (gridChildren.length > 0) {
        gsap.set(gridChildren, { opacity: 0, y: 24 });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          // Fade/rise the stat blocks in
          if (gridChildren.length > 0) {
            gsap.to(gridChildren, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
            });
          }

          // Count each number up from 0 to its target value
          statsData.forEach((stat, i) => {
            const el = numberRefs.current[i];
            if (!el) return;

            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value,
              duration: 2,
              ease: "power1.out",
              delay: i * 0.12,
              onUpdate: () => {
                el.textContent = Math.floor(counter.val).toLocaleString();
              },
              onComplete: () => {
                el.textContent = stat.value.toLocaleString();
              },
            });
          });
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 text-center"
        >
          {statsData.map((stat, i) => (
            <div key={stat.label}>
              <p className="text-white text-[36px] sm:text-[42px] md:text-[48px] font-black leading-none mb-2">
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                <span className="text-[#EF4444]">{stat.suffix}</span>
              </p>
              <p className="text-gray-400 text-[14px] md:text-[15px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
