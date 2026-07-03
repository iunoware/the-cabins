"use client";

import { useRef } from "react";
import {
  MapPin,
  Mail,
  Clock,
  Facebook,
  Instagram,
  LinkedIn,
  WhatsApp,
} from "./Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function TopBar() {
  const topBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        topBarRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { scope: topBarRef },
  );

  const contactItems = [
    {
      icon: MapPin,
      text: "Dubai, United Arab Emirates",
      href: "https://maps.google.com/?q=Dubai",
    },
    {
      icon: Mail,
      text: "info@thecabins.ae",
      href: "mailto:info@thecabins.ae",
    },
    {
      icon: Clock,
      text: "Sun–Fri: 8AM – 8PM",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: LinkedIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: WhatsApp, href: "https://wa.me/971526856240", label: "WhatsApp" },
  ];

  return (
    <div
      ref={topBarRef}
      className="w-full bg-[#0E0E11] h-auto min-h-10 md:h-10 border-b border-white/5 opacity-0 select-none z-50 relative flex items-center justify-center"
      aria-label="Top Information Bar"
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between py-2 md:py-0 h-full gap-2 md:gap-0">
        {/* Left Side: Contact Info */}
        <div className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 md:gap-x-6 lg:gap-x-8 w-full md:w-auto">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const displayClass = index === 0 ? "flex" : "hidden md:flex";
            const content = (
              <>
                <Icon className="w-3.5 h-3.5 sm:w-4 text-[#EF4444] shrink-0" />
                <span className="font-sans text-[12px] sm:text-[14px] font-normal text-white/80">
                  {item.text}
                </span>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${displayClass} items-center gap-1.5 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-[#EF4444] px-1 py-0.5 rounded`}
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={index}
                className={`${displayClass} items-center gap-1.5 px-1 py-0.5`}
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* Right Side: Social Media Links */}
        <div className="flex items-center gap-2 justify-center">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1F1F1F] text-[#bcbcbc] hover:bg-[#EF4444] hover:text-white hover:-translate-y-0.5 transition-all duration-250 ease-out focus:outline-none focus:ring-1 focus:ring-[#EF4444]"
              >
                <IconComponent className="w-3.5 h-3.5 sm:w-4 text-white shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
