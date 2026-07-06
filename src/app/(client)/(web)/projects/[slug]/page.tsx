import { notFound } from "next/navigation";
import { projects } from "../../../../../data/projects";
import ProjectDetailsClient from "./ProjectDetailsClient";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
