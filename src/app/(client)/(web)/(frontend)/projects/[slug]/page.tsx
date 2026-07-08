// import { notFound } from "next/navigation";
// import { projects } from "@/src/data/projects";
// import ProjectDetailsClient from "./ProjectDetailsClient";

// type ProjectPageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export function generateStaticParams() {
//   return projects.map((project) => ({
//     slug: project.slug,
//   }));
// }

// export default async function ProjectPage({ params }: ProjectPageProps) {
//   const { slug } = await params;

//   const project = projects.find((project) => project.slug === slug);

//   if (!project) {
//     notFound();
//   }

//   return <ProjectDetailsClient project={project} />;
// }

import { notFound } from "next/navigation";
import prisma from "@/src/db/prisma";
import ProjectDetailsClient from "./ProjectDetailsClient";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = await prisma.project.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: "asc" },
      },
      testimonials: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
