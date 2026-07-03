"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  rating: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const testimonialsData: Testimonial[] = [
  {
    rating: 5,
    quote:
      "The Cabins delivered our entire site accommodation block weeks ahead of schedule. The build quality, finish and after-sales support were exceptional — exactly the partner you want on a fast-moving project.",
    name: "Rashid Al Mansoori",
    role: "Project Director, Gulf Contracting Co.",
    initials: "RA",
  },
  {
    rating: 5,
    quote:
      "From design to handover, the whole process was seamless. Our office cabins were finished to a standard we usually only see in permanent buildings — highly recommended for any modular project.",
    name: "Fatima Al Suwaidi",
    role: "Operations Manager, Al Suwaidi Developments",
    initials: "FS",
  },
  {
    rating: 5,
    quote:
      "We needed a custom villa build on a tight timeline and The Cabins made it happen without compromising on quality. Communication was clear from day one and support after handover has been outstanding.",
    name: "Omar Khalid",
    role: "Founder, Khalid Real Estate Group",
    initials: "OK",
  },
];

// How long each testimonial stays on screen, in milliseconds.
const ROTATE_INTERVAL = 3000;

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;

      const content = contentRef.current;
      if (!content) {
        setIndex((prev) => (prev + 1) % testimonialsData.length);
        return;
      }

      // Crossfade: fade out, swap the testimonial, fade back in.
      gsap.to(content, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % testimonialsData.length);
          gsap.fromTo(
            content,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          );
        },
      });
    }, ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  // Entrance animation for the section itself
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  const active = testimonialsData[index];

  return (
    <section ref={sectionRef} className="relative bg-white py-20 md:py-28">
      <div className="max-w-[850px] w-full mx-auto px-4 md:px-6">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 md:p-12 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
        >
          {/* Decorative quote mark */}
          <Quote
            className="absolute top-8 right-8 w-14 h-14 text-[#FCE8E8]"
            fill="#FCE8E8"
            strokeWidth={0}
          />

          <div ref={contentRef}>
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < active.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-[17px] sm:text-[18px] leading-relaxed mb-8 max-w-[620px]">
              {active.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold text-sm shrink-0">
                {active.initials}
              </div>
              <div>
                <p className="text-black font-bold text-[15px] leading-tight">
                  {active.name}
                </p>
                <p className="text-gray-500 text-[13.5px]">{active.role}</p>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-8">
            {testimonialsData.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#DC2626]" : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
