export type Category =
  | "All Projects"
  | "Accommodation"
  | "Office"
  | "Security"
  | "Sanitation"
  | "Custom Builds"
  | "Container";

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: Exclude<Category, "All Projects">;
  location: string;
  country: string;
  image: string;
  description: string;
  details: {
    label: string;
    value: string;
  }[];
  gallery: string[];
};

export const categories: Category[] = [
  "All Projects",
  "Accommodation",
  "Office",
  "Security",
  "Sanitation",
  "Custom Builds",
  "Container",
];

export const locations = [
  "All Locations",
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Jebel Ali",
  "Ajman",
  "Al Ain",
  "Fujairah",
  "Dubai South",
  "Ras Al Khaimah",
];

export const projects: Project[] = [
  {
    id: 1,
    slug: "labour-accommodation-dubai",
    category: "Accommodation",
    title: "Labour Accommodation",
    location: "Dubai",
    country: "UAE",
    image: "/images/project-card.jpg",
    description:
      "A modular labour accommodation project designed with durable cabin units, practical layouts, and efficient space planning for on-site workforce needs.",
    details: [
      { label: "Project Type", value: "Accommodation Cabin" },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Category", value: "Accommodation" },
      { label: "Status", value: "Completed" },
    ],
    gallery: [
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
    ],
  },
  {
    id: 2,
    slug: "office-complex-abu-dhabi",
    category: "Office",
    title: "Office Complex",
    location: "Abu Dhabi",
    country: "UAE",
    image: "/images/project-card.jpg",
    description:
      "A modern portable office complex built for flexible workspace usage with clean interiors and strong structural finishing.",
    details: [
      { label: "Project Type", value: "Portable Office" },
      { label: "Location", value: "Abu Dhabi, UAE" },
      { label: "Category", value: "Office" },
      { label: "Status", value: "Completed" },
    ],
    gallery: [
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
    ],
  },
  {
    id: 3,
    slug: "site-office-sharjah",
    category: "Office",
    title: "Site Office",
    location: "Sharjah",
    country: "UAE",
    image: "/images/project-card.jpg",
    description:
      "A compact site office cabin solution created for construction and industrial project sites.",
    details: [
      { label: "Project Type", value: "Site Office" },
      { label: "Location", value: "Sharjah, UAE" },
      { label: "Category", value: "Office" },
      { label: "Status", value: "Completed" },
    ],
    gallery: [
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
      "/images/project-card.jpg",
    ],
  },
];
