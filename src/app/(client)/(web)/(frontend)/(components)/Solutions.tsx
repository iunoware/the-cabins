"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight } from "@/src/components/Icons";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Vector Cabin Illustrations
const SecurityCabinSVG = () => (
  <svg
    viewBox="0 0 240 180"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="148" rx="65" ry="9" fill="#E2E8F0" />

    {/* Main Body */}
    <rect
      x="75"
      y="45"
      width="90"
      height="95"
      rx="2"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />

    {/* Roof */}
    <rect x="70" y="38" width="100" height="10" rx="1" fill="#1E293B" />
    {/* Red accent on roof */}
    <path d="M70 38H80L75 48H70V38Z" fill="#D81E2C" />

    {/* Door */}
    <rect
      x="125"
      y="65"
      width="30"
      height="75"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    {/* Door handle */}
    <circle cx="132" cy="102" r="2.5" fill="#1E293B" />

    {/* Window */}
    <rect
      x="87"
      y="65"
      width="28"
      height="38"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    {/* Window pane line */}
    <line x1="101" y1="65" x2="101" y2="103" stroke="#1E293B" strokeWidth="3" />
  </svg>
);

const PortableCabinSVG = () => (
  <svg
    viewBox="0 0 240 180"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="148" rx="80" ry="9" fill="#E2E8F0" />

    {/* Main Body */}
    <rect
      x="55"
      y="45"
      width="130"
      height="95"
      rx="2"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />

    {/* Roof */}
    <rect x="50" y="38" width="140" height="10" rx="1" fill="#1E293B" />
    <path d="M50 38H60L55 48H50V38Z" fill="#D81E2C" />

    {/* Door */}
    <rect
      x="145"
      y="65"
      width="30"
      height="75"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="152" cy="102" r="2.5" fill="#1E293B" />

    {/* Window 1 */}
    <rect
      x="67"
      y="65"
      width="28"
      height="30"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="81" y1="65" x2="81" y2="95" stroke="#1E293B" strokeWidth="3" />

    {/* Window 2 */}
    <rect
      x="105"
      y="65"
      width="28"
      height="30"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="119" y1="65" x2="119" y2="95" stroke="#1E293B" strokeWidth="3" />
  </svg>
);

const OfficeCabinSVG = () => (
  <svg
    viewBox="0 0 240 180"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="148" rx="90" ry="9" fill="#E2E8F0" />

    {/* Main Body */}
    <rect
      x="40"
      y="45"
      width="160"
      height="95"
      rx="2"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />

    {/* Roof */}
    <rect x="35" y="38" width="170" height="10" rx="1" fill="#1E293B" />
    <path d="M35 38H45L40 48H35V38Z" fill="#D81E2C" />

    {/* Door */}
    <rect
      x="160"
      y="65"
      width="30"
      height="75"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="167" cy="102" r="2.5" fill="#1E293B" />

    {/* Window 1 */}
    <rect
      x="52"
      y="65"
      width="26"
      height="26"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="65" y1="65" x2="65" y2="91" stroke="#1E293B" strokeWidth="3" />

    {/* Window 2 */}
    <rect
      x="88"
      y="65"
      width="26"
      height="26"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="101" y1="65" x2="101" y2="91" stroke="#1E293B" strokeWidth="3" />

    {/* Window 3 */}
    <rect
      x="124"
      y="65"
      width="26"
      height="26"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="137" y1="65" x2="137" y2="91" stroke="#1E293B" strokeWidth="3" />
  </svg>
);

const AccommodationCabinSVG = () => (
  <svg
    viewBox="0 0 240 180"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="148" rx="95" ry="9" fill="#E2E8F0" />

    {/* Main Body */}
    <rect
      x="30"
      y="45"
      width="180"
      height="95"
      rx="2"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />

    {/* Roof */}
    <rect x="25" y="38" width="190" height="10" rx="1" fill="#1E293B" />
    <path d="M25 38H35L30 48H25V38Z" fill="#D81E2C" />

    {/* Door 1 (Red, left-of-center) */}
    <rect
      x="95"
      y="65"
      width="24"
      height="75"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="101" cy="102" r="2" fill="#1E293B" />

    {/* Door 2 (Dark Charcoal, right) */}
    <rect
      x="172"
      y="65"
      width="24"
      height="75"
      fill="#475569"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="178" cy="102" r="2" fill="#1E293B" />

    {/* Window 1 */}
    <rect
      x="42"
      y="65"
      width="20"
      height="24"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="52" y1="65" x2="52" y2="89" stroke="#1E293B" strokeWidth="2.5" />

    {/* Window 2 */}
    <rect
      x="68"
      y="65"
      width="20"
      height="24"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="78" y1="65" x2="78" y2="89" stroke="#1E293B" strokeWidth="2.5" />

    {/* Window 3 */}
    <rect
      x="124"
      y="65"
      width="20"
      height="24"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="134" y1="65" x2="134" y2="89" stroke="#1E293B" strokeWidth="2.5" />

    {/* Window 4 */}
    <rect
      x="148"
      y="65"
      width="20"
      height="24"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="158" y1="65" x2="158" y2="89" stroke="#1E293B" strokeWidth="2.5" />
  </svg>
);

const ContainerOfficeSVG = () => (
  <svg
    viewBox="0 0 240 180"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="148" rx="85" ry="9" fill="#E2E8F0" />

    {/* Container Body */}
    <rect
      x="45"
      y="50"
      width="150"
      height="85"
      fill="#475569"
      stroke="#1E293B"
      strokeWidth="4"
    />

    {/* Corrugation lines */}
    {[55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185].map((x) => (
      <line key={x} x1={x} y1="52" x2={x} y2="133" stroke="#334155" strokeWidth="2" />
    ))}

    {/* Office cutout pane */}
    <rect
      x="65"
      y="62"
      width="110"
      height="63"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />

    {/* Door */}
    <rect
      x="135"
      y="62"
      width="30"
      height="63"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="142" cy="94" r="2.5" fill="#1E293B" />

    {/* Large Window */}
    <rect
      x="75"
      y="68"
      width="50"
      height="42"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="100" y1="68" x2="100" y2="110" stroke="#1E293B" strokeWidth="3" />
  </svg>
);

const ContainerBuildingSVG = () => (
  <svg
    viewBox="0 0 240 180"
    className="w-full h-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow */}
    <ellipse cx="120" cy="155" rx="80" ry="9" fill="#E2E8F0" />

    {/* Bottom Container */}
    <rect
      x="65"
      y="90"
      width="110"
      height="55"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />
    {/* Bottom Door */}
    <rect
      x="135"
      y="100"
      width="22"
      height="45"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="140" cy="122" r="2" fill="#1E293B" />
    {/* Bottom Window */}
    <rect
      x="80"
      y="102"
      width="40"
      height="28"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="100" y1="102" x2="100" y2="130" stroke="#1E293B" strokeWidth="3" />

    {/* Top Container */}
    <rect
      x="55"
      y="40"
      width="110"
      height="52"
      fill="white"
      stroke="#1E293B"
      strokeWidth="4"
    />
    {/* Top Door */}
    <rect
      x="65"
      y="50"
      width="22"
      height="42"
      fill="#D81E2C"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <circle cx="70" cy="72" r="2" fill="#1E293B" />
    {/* Top Window */}
    <rect
      x="100"
      y="52"
      width="50"
      height="28"
      fill="#F8FAFC"
      stroke="#1E293B"
      strokeWidth="4"
    />
    <line x1="125" y1="52" x2="125" y2="80" stroke="#1E293B" strokeWidth="3" />

    {/* Small stairs/landing separator */}
    <line x1="55" y1="90" x2="175" y2="90" stroke="#1E293B" strokeWidth="4" />
  </svg>
);

interface SolutionItem {
  title: string;
  description: string;
  href: string;
  badge?: "POPULAR" | "NEW";
  illustration: () => React.JSX.Element;
}

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const solutionsData: SolutionItem[] = [
    {
      title: "Security Cabins",
      description: "Compact, durable guard booths with panoramic visibility.",
      href: "/products",
      badge: "POPULAR",
      illustration: SecurityCabinSVG,
    },
    {
      title: "Portable Cabins",
      description: "Relocatable site offices ready for immediate use.",
      href: "/products",
      illustration: PortableCabinSVG,
    },
    {
      title: "Office Cabins",
      description: "Insulated, climate-ready workspaces with premium finishes.",
      href: "/products",
      illustration: OfficeCabinSVG,
    },
    {
      title: "Accommodation Cabins",
      description: "Comfortable labour & staff housing built for the climate.",
      href: "/products",
      illustration: AccommodationCabinSVG,
    },
    {
      title: "Container Offices",
      description: "Heavy-duty shipping containers repurposed into premium workspaces.",
      href: "/products",
      badge: "NEW",
      illustration: ContainerOfficeSVG,
    },
    {
      title: "Container Buildings",
      description: "Scalable, modular multi-level structures for fast deployment.",
      href: "/products",
      illustration: ContainerBuildingSVG,
    },
  ];

  useGSAP(
    () => {
      // 1. Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            headingRef.current,
            descRef.current,
            gridRef.current?.children,
            buttonRef.current,
          ],
          { opacity: 1, y: 0, x: 0 },
        );
        return;
      }

      // 2. Split heading into lines
      const split = new SplitType(headingRef.current!, { types: "lines" });
      const lines = split.lines;

      if (lines) {
        lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }

      // 3. Setup initial state
      gsap.set(
        [labelRef.current, descRef.current, gridRef.current?.children, buttonRef.current],
        {
          opacity: 0,
        },
      );
      if (lines) {
        gsap.set(lines, { y: "100%", opacity: 0 });
      }

      // 4. Create ScrollTrigger timeline (animates once)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Label fade in from left
      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      );

      // Heading lines slide up
      if (lines && lines.length > 0) {
        tl.fromTo(
          lines,
          { y: "100%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4",
        );
      }

      // Description fade upward
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );

      // Cards stagger fade & rise
      if (gridRef.current) {
        tl.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      // View All button fade & rise
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );

      return () => {
        split.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 overflow-hidden select-none border-b border-gray-100"
      aria-label="Our Modular Solutions"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
        {/* Header container */}
        <div className="text-center max-w-162.5 mx-auto mb-16">
          {/* Accent Label */}
          <div ref={labelRef} className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#EF4444] rounded-full shrink-0" />
            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#EF4444]">
              OUR SOLUTIONS
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-[32px] sm:text-[40px] md:text-[48px] font-black text-black leading-tight tracking-tight uppercase mb-6"
          >
            Modular Solutions for <span className="text-[#EF4444]">Every Need</span>
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className="text-gray-500 text-[16px] md:text-[18px] leading-[1.7] font-medium"
          >
            engineered, manufactured and finished in-house to international standards.
          </p>
        </div>

        {/* Product grid container */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch"
        >
          {solutionsData.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="group relative flex flex-col h-full bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.1)] cursor-pointer"
            >
              {/* Illustration Header Area */}
              <div className="relative aspect-4/3 w-full rounded-xl bg-[#F1F3F6] flex items-center justify-center p-5 mb-5">
                {item.badge && (
                  <span className="absolute -top-2 left-3 z-10 bg-black text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase leading-none shadow-sm">
                    {item.badge}
                  </span>
                )}
                {/* Responsive wrapper for SVG scaling */}
                <div className="w-full h-full max-w-42.5 max-h-30 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-108">
                  <item.illustration />
                </div>
              </div>

              {/* Card Content body */}
              <div className="flex flex-col justify-between grow px-1 pb-1">
                <div className="mb-4">
                  <h3 className="text-[18px] font-bold text-black group-hover:text-[#EF4444] transition-colors duration-300 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[13.5px] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* View Details arrow link */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#EF4444]">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 text-[#EF4444] transition-transform duration-300 group-hover:translate-x-1.25" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Products button */}
        <div ref={buttonRef} className="flex justify-center mt-14">
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-full bg-black text-white font-semibold text-[15px] flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-[#D81E2C] hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4.5 h-4.5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
