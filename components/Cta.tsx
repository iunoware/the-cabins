"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function CTASection({
  title = "Have a Project in Mind?",
  description = "Let us help you build it with our modular excellence. Get a free, no-obligation quote today.",
  buttonLabel = "Get in Touch",
  buttonHref = "/contact",
  onButtonClick,
  className = "",
}: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const textChildren = textRef.current ? gsap.utils.toArray(textRef.current.children) : [];

      if (prefersReducedMotion) {
        gsap.set(cardRef.current, { opacity: 1, scale: 1, y: 0 });
        if (textChildren.length > 0) {
          gsap.set(textChildren, { opacity: 1, y: 0 });
        }
        gsap.set(buttonRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cardRef.current, { opacity: 0, scale: 0.97 });
      if (textChildren.length > 0) {
        gsap.set(textChildren, { opacity: 0, y: 20 });
      }
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          textChildren,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          buttonRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white py-16 md:py-10 ${className}`}
    >
      <div className="max-w-275 w-full mx-auto px-4 md:px-6">
        <div
          ref={cardRef}
          className="relative rounded-[28px] overflow-hidden px-8 py-12 sm:px-12 sm:py-14 md:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{
            background:
              "linear-gradient(90deg, #C41E2A 0%, #7A1218 45%, #0A0A0A 100%)",
          }}
        >
          {/* Text content */}
          <div ref={textRef} className="max-w-130">
            <h2 className="text-white text-[28px] sm:text-[34px] md:text-[38px] font-black leading-tight mb-3">
              {title}
            </h2>
            <p className="text-gray-200 text-[15px] sm:text-[16px] leading-relaxed">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <div ref={buttonRef} className="shrink-0">
            {onButtonClick ? (
              <button
                type="button"
                onClick={onButtonClick}
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[5px]" />
              </button>
            ) : (
              <a
                href={buttonHref}
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[5px]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
