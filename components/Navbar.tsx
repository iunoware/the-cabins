"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "./Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const phoneCircleRef = useRef<HTMLDivElement>(null);
  const callButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      // 1. Navbar slide down animation on load
      gsap.fromTo(
        ".navbar-container",
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: "power3.out" },
      );

      // 2. Navigation links stagger animation
      gsap.fromTo(
        ".nav-link-item",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.35,
          stagger: 0.08,
          ease: "power2.out",
        },
      );

      // 3. Call button load animation
      gsap.fromTo(
        callButtonRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "back.out(1.5)",
        },
      );

      // 4. Phone circle looping animation (Scale 1 -> 1.08 -> 1, Opacity 1 -> 0.85 -> 1)
      // Run for 1.4s, repeating infinitely every 3 seconds (1.4s animation + 1.6s delay = 3.0s cycle)
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.6,
      });
      tl.to(phoneCircleRef.current, {
        scale: 1.08,
        opacity: 0.85,
        duration: 0.7,
        ease: "power2.inOut",
      }).to(phoneCircleRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power2.inOut",
      });
    },
    { scope: navbarRef },
  );

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      ref={navbarRef}
      className={`w-full bg-white border-b transition-all duration-300 ease-in-out z-45 sticky top-0 select-none ${
        isScrolled
          ? "h-16 bg-white/95 backdrop-blur-md border-gray-150 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          : "h-18 border-gray-100 shadow-none"
      }`}
      aria-label="Main Navigation Bar"
    >
      <div className="navbar-container max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between opacity-0">
        {/* LEFT: Company Logo */}
        <Link
          href="/"
          className="flex items-center h-full focus:outline-none rounded-lg py-1"
          aria-label="The Cabins Home"
        >
          <Image
            src="/images/logo.svg"
            alt="The Cabins Logo"
            width={180}
            height={34}
            priority
            className="w-auto h-7 sm:h-8 md:h-10 object-contain transition-all duration-300"
          />
        </Link>

        {/* CENTER: Navigation Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8 h-full">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link-item relative font-sans text-sm lg:text-[15px] font-medium tracking-tight py-1.5 transition-colors duration-200 focus:outline-none group ${
                  isActive
                    ? "text-[#EF4444]"
                    : "text-brand-gray hover:text-[#EF4444]"
                }`}
              >
                {item.name}
                {/* Center-outward animated underline (visible always for active, hover grows from center) */}
                <span
                  className={`absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#EF4444] transition-transform duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] origin-center ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Call Us button & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4 h-full">
          {/* Call Us Button */}
          <a
            ref={callButtonRef}
            href="tel:+971526856240"
            className="flex items-center gap-3.5 bg-white p-1 sm:pl-2 sm:pr-6 sm:py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.03)] group transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#EF4444] cursor-pointer select-none"
            aria-label="Call Us Now at +971 52 685 6240"
          >
            {/* Circular red background with phone icon (loops animations independently) */}
            <div
              ref={phoneCircleRef}
              className="relative flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-[#D81E2C] text-white shrink-0 transition-transform duration-300"
            >
              <span className="absolute w-8 h-8 rounded-full bg-[#D81E2C]/60 animate-ping pointer-events-none z-0" />
              <Phone className="relative z-10 w-4.5 h-4.5 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
            </div>
            {/* Texts stacked on the right (hidden on very small screens) */}
            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-[11px] uppercase font-bold tracking-[2px] text-gray-500 leading-none mb-1">
                CALL US NOW
              </span>
              <span className="text-[16px] font-bold pt-1 text-black leading-none">
                +971 52 685 6240
              </span>
            </div>
          </a>

          {/* Animated Hamburger Menu (Visible on Mobile Only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-gray-100 transition-all md:hidden focus:outline-none border border-transparent focus:border-gray-200"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-brand-dark rounded-full transition-all duration-300 transform ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-brand-dark rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-brand-dark rounded-full transition-all duration-300 transform ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN NAVIGATION PANEL */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden transition-all duration-300 ease-in-out z-30 ${
          isOpen
            ? "max-h-87.5 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col px-6 py-5 gap-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-sans text-sm font-semibold py-2.5 px-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#EF4444]/5 text-[#EF4444]"
                    : "text-brand-dark font-medium hover:bg-gray-50 hover:text-[#EF4444]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
