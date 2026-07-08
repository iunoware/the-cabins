// import CTA2 from "@/src/components/CTA2";
// import Hero from "./(components)/Hero";
// import ProjectsSection from "./(components)/ProjectsSection";

// export default function ProjectsPage() {
//   return (
//     <>
//       <Hero title="Our Projects" currentPage="Projects" />;
//       <ProjectsSection />
//       <CTA2 />
//     </>
//   );
// }

import CTA2 from "@/src/components/CTA2";
import prisma from "@/src/db/prisma";
import Hero from "./(components)/Hero";
import ProjectsSection from "./(components)/ProjectsSection";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: {
      isActive: true,
      category: {
        isActive: true,
      },
    },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <Hero title="Our Projects" currentPage="Projects" />
      <ProjectsSection projects={projects} />
      <CTA2 />
    </>
  );
}
