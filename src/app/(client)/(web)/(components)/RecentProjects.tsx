"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectItem {
  badge: string;
  title: string;
  location: string;
  image: string;
}

const projectsData: ProjectItem[] = [
  {
    badge: "ACCOMMODATION",
    title: "Labour Accommodation",
    location: "Dubai, UAE",
    image: "/images/proj-2.jpg",
  },
  {
    badge: "OFFICE",
    title: "Office Complex",
    location: "Abu Dhabi, UAE",
    image: "/images/proj-7.jpg",
  },
  {
    badge: "CUSTOM BUILD",
    title: "Villa Project",
    location: "Al Ain, UAE",
    image: "/images/proj-9.jpg",
  },
];

export default function RecentProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            headingRef.current,
            buttonRef.current,
            gridRef.current?.children,
          ],
          { opacity: 1, y: 0, x: 0 },
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
      gsap.set(buttonRef.current, { opacity: 0, x: 20 });

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
          buttonRef.current,
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4",
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
          "-=0.3",
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
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            {/* Accent Label */}
            <div ref={labelRef} className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-[#EF4444] rounded-full shrink-0" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#EF4444]">
                Recent Projects
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[32px] sm:text-[40px] md:text-[46px] font-black text-black leading-[1.2] tracking-tight max-w-150"
            >
              Building Success,{" "}
              <span className="text-[#EF4444]">One Project at a Time</span>
            </h2>
          </div>

          {/* View All button */}
          <div ref={buttonRef} className="shrink-0">
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gray-300 text-black font-semibold text-[15px] transition-all duration-300 hover:bg-black hover:text-white hover:border-black cursor-pointer"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.25" />
            </a>
          </div>
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <a
              key={project.title}
              href="#"
              className="group relative block rounded-2xl overflow-hidden aspect-[4/3.2] cursor-pointer"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

              {/* Badge */}
              <span className="absolute top-5 left-5 bg-[#DC2626] text-white text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-full uppercase leading-none">
                {project.badge}
              </span>

              {/* Text content */}
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-white font-bold text-[19px] mb-1.5">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-200 text-[13px]">
                  <MapPin
                    className="w-3.5 h-3.5 text-[#EF4444]"
                    strokeWidth={2}
                  />
                  <span>{project.location}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
