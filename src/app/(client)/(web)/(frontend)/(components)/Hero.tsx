"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
// import { Phone, WhatsApp, FileText, ArrowRight, Star } from "@/src/components/Icons";
import { ArrowRight, Star } from "@/src/components/Icons";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

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
            bgImageRef.current,
            overlayRef.current,
            headingRef.current,
            paraRef.current,
            buttonsRef.current?.children,
            trustRef.current,
          ],
          { opacity: 1, scale: 1, x: 0, y: 0 },
        );
        return;
      }

      // 2. Split heading into independent lines using SplitType
      const split = new SplitType(headingRef.current!, { types: "lines" });
      const lines = split.lines;

      // Wrap each line in an overflow-hidden parent to create the mask for "slide-up"
      if (lines) {
        lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "block";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }

      // 3. Set initial opacity/positions to avoid layout flashes
      gsap.set(
        [
          labelRef.current,
          paraRef.current,
          buttonsRef.current?.children,
          trustRef.current,
        ],
        { opacity: 0 },
      );
      if (lines) {
        gsap.set(lines, { y: "100%", opacity: 0 });
      }

      // 4. Sequenced timeline animation
      const tl = gsap.timeline();

      // Bg zoom-out scale
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 2, ease: "power3.out" },
      );

      // Dark overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" },
        "<0.2",
      );

      // Small horizontal line + tag slide & fade
      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=1.2",
      );

      // Split heading lines slide up
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
          "-=0.6",
        );
      }

      // Paragraph fade-up
      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

      // Action buttons stagger fade-up
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }

      // Trust badge fade-in
      tl.fromTo(
        trustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      );

      // 5. ScrollTrigger parallax effects
      gsap.to(bgImageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-text-content", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Cleanup
      return () => {
        split.revert();
      };
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen max-md:h-[90vh] overflow-hidden flex items-center select-none bg-black"
      aria-label="Welcome Hero Section"
    >
      {/* Background Image Container */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full select-none pointer-events-none will-change-transform z-0"
      >
        <Image
          src="/images/hero-cabin.jpg"
          alt="Premium Corporate Modular Cabin Solutions in UAE"
          fill
          priority
          className="object-cover max-h-screen object-center"
        />
      </div>

      {/* Background Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-hero-overlay z-10 pointer-events-none will-change-opacity"
      />

      {/* Main Grid Content */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 md:px-6 flex items-center h-full">
        <div className="hero-text-content w-full lg:w-4/5 flex flex-col items-start text-left will-change-transform">
          {/* Small horizontal horizontal accent bar + tag */}
          <div ref={labelRef} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-[#EF4444] rounded-full shrink-0" />
            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#EF4444]">
              TRANSFORMING THE MODULAR INDUSTRY
            </span>
          </div>

          {/* Heading splits by line */}
          <h1
            ref={headingRef}
            className="max-w-155 text-[46px] sm:text-[62px] md:text-[60px] font-bold leading-[0.95] text-white tracking-tight uppercase mb-8"
          >
            Premium <span className="text-[#EF4444]">Modular</span>
            <br className="hidden md:inline" />
            Solutions in UAE
          </h1>

          {/* Paragraph */}
          <p
            ref={paraRef}
            className="text-white/82 text-[18px] md:text-5 leading-[1.8] max-w-155 mb-10 font-medium"
          >
            We design, manufacture and deliver high-quality modular cabins, portable units
            and container buildings — engineered for speed, built to last, and finished to
            perfection.
          </p>

          {/* Staggered action buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14 w-full sm:w-auto"
          >
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-[#D81E2C] text-white font-semibold text-[15px] flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-[#B81924] hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D81E2C] cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4.5 h-4.5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <a
              href="/contact"
              className="px-8 py-3.5 rounded-full border border-white bg-transparent text-white font-semibold text-[15px] flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            >
              Get a Quote
            </a>
          </div>

          {/* Trust section with stars */}
          <div ref={trustRef} className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[14px] md:text-[15px] text-white/80 font-medium">
              Trusted by <span className="font-bold text-white">2,500+</span> clients
              across all 7 Emirates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
