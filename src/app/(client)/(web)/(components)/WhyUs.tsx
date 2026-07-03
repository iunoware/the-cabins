"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Pencil, Truck, Headphones } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhyItem {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
}

const whyData: WhyItem[] = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Premium Quality",
    description:
      "Every unit is manufactured to international standards and rigorously inspected before delivery.",
  },
  {
    icon: Pencil,
    number: "02",
    title: "Custom Design",
    description:
      "Tailored layouts and finishes engineered precisely around your operational requirements.",
  },
  {
    icon: Truck,
    number: "03",
    title: "Fast Delivery",
    description:
      "Streamlined in-house production means your units are built and on-site in record time.",
  },
  {
    icon: Headphones,
    number: "04",
    title: "After-Sales Support",
    description:
      "Dedicated support for maintenance, relocation and upgrades long after handover.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [labelRef.current, headingRef.current, gridRef.current?.children],
          {
            opacity: 1,
            y: 0,
          },
        );
        return;
      }

      gsap.set(
        [labelRef.current, headingRef.current, gridRef.current?.children],
        {
          opacity: 0,
          y: 24,
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          gridRef.current?.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-175 mx-auto mb-16">
          {/* Accent Label */}
          <div
            ref={labelRef}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-8 h-0.5 bg-[#EF4444] rounded-full shrink-0" />
            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#EF4444]">
              Why The Cabins
            </span>
            <span className="w-8 h-0.5 bg-[#EF4444] rounded-full shrink-0" />
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-[32px] sm:text-[40px] md:text-[46px] font-black text-black leading-[1.2] tracking-tight"
          >
            A Standard of Build{" "}
            <span className="text-[#EF4444]">You Can Trust</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {whyData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative bg-white rounded-2xl border border-gray-200 border-l-4 border-l-transparent p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-l-[#DC2626] hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
              >
                {/* Number watermark */}
                <span className="absolute top-6 right-7 text-[15px] font-extrabold text-gray-200 select-none">
                  {item.number}
                </span>

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-[#FCE8E8] transition-colors duration-300 group-hover:bg-[#DC2626]">
                  <Icon
                    className="w-6 h-6 text-[#DC2626] transition-colors duration-300 group-hover:text-white"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3 className="text-black font-bold text-[17px] mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
