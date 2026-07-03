"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, ShieldCheck, Building2, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const valuesData: ValueItem[] = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Deliver innovative modular building solutions with uncompromising quality and speed.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the region's most trusted name in sustainable, future-ready modular construction.",
  },
  {
    icon: ShieldCheck,
    title: "Our Values",
    description:
      "Integrity, excellence, innovation and a relentless focus on customer success.",
  },
];

export default function AboutIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            imageWrapRef.current,
            badgeRef.current,
            labelRef.current,
            headingRef.current,
            descRef.current,
            valuesRef.current?.children,
            buttonRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1 },
        );
        return;
      }

      gsap.set(
        [
          labelRef.current,
          headingRef.current,
          descRef.current,
          valuesRef.current?.children,
          buttonRef.current,
        ],
        { opacity: 0, y: 24 },
      );
      gsap.set(imageWrapRef.current, { opacity: 0, x: -40 });
      gsap.set(badgeRef.current, { opacity: 0, y: 20, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(imageWrapRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .to(
          badgeRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4",
        )
        .to(
          labelRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.6",
        )
        .to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35",
        )
        .to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          valuesRef.current?.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.35",
        )
        .to(
          buttonRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Image */}
          <div ref={imageWrapRef} className="relative">
            {/* Dotted accent pattern, peeking out top-right of the image */}
            <div
              className="absolute -top-6 -right-6 w-28 h-28 z-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#EF4444 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
                opacity: 0.5,
              }}
            />

            <div className="relative rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.12)] z-10">
              {/* Replace src with your actual image */}
              <Image
                src="/images/interior-1.jpg"
                alt="Modular cabin interior living space"
                width={900}
                height={780}
                className="w-full h-full object-cover aspect-[4/3.4]"
                priority
              />

              {/* Folded corner ribbon accent */}
              <div
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  background:
                    "repeating-linear-gradient(-45deg, #0F172A 0px, #0F172A 4px, #1E293B 4px, #1E293B 8px)",
                  opacity: 0.9,
                }}
              />
            </div>

            {/* Stat badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 left-6 sm:left-8 z-20 flex items-center gap-4 bg-[#1E2229] rounded-2xl px-6 py-5 shadow-[0_16px_32px_rgba(0,0,0,0.25)] max-w-70"
            >
              <Building2
                className="w-8 h-8 text-[#EF4444] shrink-0"
                strokeWidth={2}
              />
              <div>
                <p className="text-white text-2xl font-black leading-none mb-1">
                  2,500+
                </p>
                <p className="text-gray-300 text-[13px] leading-snug">
                  Modular units delivered across the UAE
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            {/* Accent Label */}
            <div ref={labelRef} className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#EF4444] rounded-full shrink-0" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#EF4444]">
                About The Cabins
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[32px] sm:text-[38px] md:text-[44px] font-black text-black leading-[1.15] tracking-tight mb-6"
            >
              Transforming the{" "}
              <span className="text-[#EF4444]">Modular Industry</span>
            </h2>

            {/* Description */}
            <div ref={descRef} className="flex flex-col gap-4 mb-10 max-w-135">
              <p className="text-gray-500 text-[15px] md:text-[16px] leading-[1.75]">
                The Cabins is a leading modular building manufacturer in the UAE
                — delivering premium-quality, innovative and cost-effective
                solutions for diverse industries and infrastructure projects.
                From a single site office to an entire worker camp, we engineer
                spaces that are fast to deploy and built to endure the regional
                climate.
              </p>
              <p className="text-gray-500 text-[15px] md:text-[16px] leading-[1.75]">
                Backed by a decade of hands-on expertise and an in-house
                production facility, we control every stage — design,
                fabrication, finishing and installation — so quality is never
                left to chance.
              </p>
            </div>

            {/* Values list */}
            <div ref={valuesRef} className="flex flex-col gap-6 mb-10">
              {valuesData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black shrink-0">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-black font-bold text-[16px] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-[14px] leading-relaxed max-w-105">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div ref={buttonRef}>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#DC2626] text-white font-bold text-[15px] transition-all duration-300 hover:bg-black hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626] cursor-pointer"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.25" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
