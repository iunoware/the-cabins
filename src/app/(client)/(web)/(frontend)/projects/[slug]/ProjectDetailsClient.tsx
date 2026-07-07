"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeftIcon, MapPinIcon, PhotoIcon } from "@heroicons/react/24/outline";
import type { Project } from "@/src/data/projects";

gsap.registerPlugin(useGSAP);

type ProjectDetailsClientProps = {
  project: Project;
};

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white px-5 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <div className="fade-in mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-red-600"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Header */}
        <div className="fade-in mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-red-600">
              {project.category}
            </span>

            <h1 className="mt-5 text-3xl font-extrabold text-gray-950 md:text-5xl">
              {project.title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <MapPinIcon className="h-5 w-5 text-red-600" />
              <span>
                {project.location}, {project.country}
              </span>
            </div>
          </div>

          <p className="text-sm leading-7 text-gray-600 md:text-base">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="fade-in grid grid-cols-1 gap-5 md:auto-rows-60 md:grid-cols-4">
          {project.gallery.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`group relative h-72 overflow-hidden rounded-3xl bg-gray-100 md:h-auto ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${index === 3 ? "md:col-span-2" : ""}`}
            >
              <Image
                src={image}
                alt={`${project.title} image ${index + 1}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-gray-900 opacity-0 transition group-hover:opacity-100">
                <PhotoIcon className="h-4 w-4 text-red-600" />
                View Image
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="fade-in mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {project.details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-gray-500">{detail.label}</p>
              <p className="mt-2 text-lg font-extrabold text-gray-950">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
