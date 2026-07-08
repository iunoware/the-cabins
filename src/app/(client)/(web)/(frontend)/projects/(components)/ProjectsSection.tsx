// "use client";

// import Image from "next/image";
// import { useMemo, useState } from "react";
// import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import {
//   categories,
//   locations,
//   projects,
//   type Category,
//   type Project,
// } from "../../../../../data/projects";

// type Category =
//   | "All Projects"
//   | "Accommodation"
//   | "Office"
//   | "Security"
//   | "Sanitation"
//   | "Custom Builds"
//   | "Container";

// type Project = {
//   id: number;
//   title: string;
//   category: Exclude<Category, "All Projects">;
//   location: string;
//   image: string;
// };

// const categories: Category[] = [
//   "All Projects",
//   "Accommodation",
//   "Office",
//   "Security",
//   "Sanitation",
//   "Custom Builds",
//   "Container",
// ];

// const locations = [
//   "All Locations",
//   "Dubai",
//   "Abu Dhabi",
//   "Sharjah",
//   "Jebel Ali",
//   "Ajman",
//   "Al Ain",
//   "Fujairah",
//   "Dubai South",
//   "Ras Al Khaimah",
// ];

// const projects: Project[] = [
//   // dubai
//   {
//     id: 1,
//     category: "Accommodation",
//     title: "Labour Accommodation",
//     location: "Dubai",
//     image: "/images/project-card.jpg",
//   },

//   // abu dhabi
//   {
//     id: 2,
//     category: "Office",
//     title: "Office Complex",
//     location: "Abu Dhabi",
//     image: "/images/project-card.jpg",
//   },

//   // sharjah
//   {
//     id: 3,
//     category: "Office",
//     title: "Site Office",
//     location: "Sharjah",
//     image: "/images/project-card.jpg",
//   },

//   // Jebel Ali
//   {
//     id: 4,
//     category: "Security",
//     title: "Security Cabins",
//     location: "Jebel Ali",
//     image: "/images/project-card.jpg",
//   },

//   // Ajman
//   {
//     id: 5,
//     category: "Sanitation",
//     title: "Toilet Block",
//     location: "Ajman",
//     image: "/images/project-card.jpg",
//   },

//   // Al Ain
//   {
//     id: 6,
//     category: "Custom Builds",
//     title: "Villa Project",
//     location: "Al Ain",
//     image: "/images/project-card.jpg",
//   },

//   // Fujairah
//   {
//     id: 7,
//     category: "Accommodation",
//     title: "Staff Accommodation",
//     location: "Fujairah",
//     image: "/images/project-card.jpg",
//   },

//   // Dubai South
//   {
//     id: 8,
//     category: "Container",
//     title: "Warehouse Office",
//     location: "Dubai South",
//     image: "/images/project-card.jpg",
//   },

//   // Ras Al Khaimah
//   {
//     id: 9,
//     category: "Custom Builds",
//     title: "School Facility",
//     location: "Ras Al Khaimah",
//     image: "/images/project-card.jpg",
//   },
// ];

// export default function ProjectsSection() {
//   const [activeCategory, setActiveCategory] = useState<Category>("All Projects");
//   const [activeLocation, setActiveLocation] = useState("All Locations");

//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchCategory =
//         activeCategory === "All Projects" || project.category === activeCategory;

//       const matchLocation =
//         activeLocation === "All Locations" || project.location === activeLocation;

//       return matchCategory && matchLocation;
//     });
//   }, [activeCategory, activeLocation]);

//   return (
//     <section className="bg-white px-5 py-16">
//       <div className="mx-auto max-w-7xl">
//         {/* Filters */}
//         <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//           <div className="flex flex-wrap gap-3">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
//                   activeCategory === category
//                     ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-100"
//                     : "border-gray-200 bg-white text-gray-700 hover:border-red-600 hover:text-red-600"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full sm:w-56">
//             <select
//               value={activeLocation}
//               onChange={(event) => setActiveLocation(event.target.value)}
//               className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-5 py-3 pr-10 text-sm font-semibold text-gray-700 outline-none transition focus:border-red-600"
//             >
//               {locations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>

//             <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Cards */}
//         {filteredProjects.length > 0 ? (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredProjects.map((project) => (
//               <ProjectCard key={project.id} project={project} />
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-3xl border border-gray-200 p-10 text-center">
//             <p className="text-lg font-semibold text-gray-900">No projects found</p>
//             <p className="mt-2 text-sm text-gray-500">
//               Try changing the category or location filter.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// function ProjectCard({ project }: { project: Project }) {
//   return (
//     // <article className="group relative h-72 overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
//     <Link
//       // href="/contact"
//       href={`/projects/${project.slug}`}
//       className="group relative h-72 overflow-hidden rounded-3xl bg-gray-100 shadow-sm"
//     >
//       <Image
//         src={project.image}
//         alt={project.title}
//         fill
//         className="object-cover transition duration-500 group-hover:scale-105"
//       />

//       <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

//       <div className="absolute left-5 top-5 rounded-full bg-red-600 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white">
//         {project.category === "Custom Builds" ? "Custom Build" : project.category}
//       </div>

//       <div className="absolute bottom-6 left-5 right-5 text-white">
//         <h3 className="text-xl font-extrabold">{project.title}</h3>

//         <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white/90">
//           <MapPinIcon className="h-5 w-5 text-red-500" />
//           <span>{project.location}, UAE</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import {
  categories,
  locations,
  projects,
  type Category,
  type Project,
} from "@/src/data/projects";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Projects");
  const [activeLocation, setActiveLocation] = useState("All Locations");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        activeCategory === "All Projects" || project.category === activeCategory;

      const matchLocation =
        activeLocation === "All Locations" || project.location === activeLocation;

      return matchCategory && matchLocation;
    });
  }, [activeCategory, activeLocation]);

  return (
    <section className="bg-white px-5 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Filters */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-red-600 bg-red-600 text-white shadow-lg shadow-red-100"
                    : "border-gray-200 bg-white text-gray-700 hover:border-red-600 hover:text-red-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <select
              value={activeLocation}
              onChange={(event) => setActiveLocation(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-5 py-3 pr-10 text-sm font-semibold text-gray-700 outline-none transition focus:border-red-600"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 p-10 text-center">
            <p className="text-lg font-semibold text-gray-900">No projects found</p>
            <p className="mt-2 text-sm text-gray-500">
              Try changing the category or location filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative h-72 overflow-hidden rounded-3xl bg-gray-100 shadow-sm"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute left-5 top-5 rounded-full bg-red-600 px-5 py-2 text-sm font-bold uppercase tracking-wide text-white">
        {project.category === "Custom Builds" ? "Custom Build" : project.category}
      </div>

      <div className="absolute bottom-6 left-5 right-5 text-white">
        <h3 className="text-xl font-extrabold">{project.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white/90">
          <MapPinIcon className="h-5 w-5 text-red-500" />
          <span>
            {project.location}, {project.country}
          </span>
        </div>
      </div>
    </Link>
  );
}
