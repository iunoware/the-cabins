"use client";

import { useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    value: "+971 52 685 6240",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@thecabins.ae",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Industrial Area, Dubai, United Arab Emirates",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sun – Fri : 8:00 AM – 8:00 PM",
  },
];

export default function ContactInfo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-label", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".contact-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".contact-item", {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".contact-list",
          start: "top 85%",
        },
      });

      gsap.from(".contact-map", {
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-map",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-xl">
      {/* Label */}

      <div className="contact-label flex items-center gap-3 mb-6">
        <div className="w-10 h-0.5 bg-red-600" />
        <span className="uppercase tracking-[0.3em] text-xs font-semibold text-red-600">
          Get In Touch
        </span>
      </div>

      {/* Heading */}

      <h2 className="contact-heading text-5xl font-black leading-tight text-zinc-900">
        Let's Talk About <span className="text-red-600">Your Project</span>
      </h2>

      <p className="mt-6 text-lg leading-8 text-zinc-500">
        We're here to help with your modular building needs. Reach out and our
        team will respond within 24 hours.
      </p>

      {/* Contact List */}

      <div className="contact-list mt-10 space-y-6">
        {contactItems.map((item) => (
          <div key={item.title} className="contact-item flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <item.icon className="h-5 w-5 text-red-600" strokeWidth={2} />
            </div>

            <div>
              <h4 className="font-bold text-zinc-900">{item.title}</h4>

              <p className="mt-1 text-zinc-500 leading-7">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Google Map */}

      <div className="contact-map mt-10 overflow-hidden rounded-3xl border border-zinc-200 shadow-lg">
        <iframe
          title="Dubai Industrial Area"
          src="https://www.google.com/maps?q=Dubai%20Industrial%20Area&output=embed"
          loading="lazy"
          className="h-75 w-full border-0"
        />
      </div>
    </section>
  );
}
