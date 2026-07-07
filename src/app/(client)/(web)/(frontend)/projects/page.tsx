import CTA2 from "@/src/components/CTA2";
import Hero from "./(components)/Hero";
import ProjectsSection from "./(components)/ProjectsSection";

export default function ProjectsPage() {
  return (
    <>
      <Hero title="Our Projects" currentPage="Projects" />;
      <ProjectsSection />
      <CTA2 />
    </>
  );
}
