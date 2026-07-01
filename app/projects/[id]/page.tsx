import { projectArchive } from "@/data/projectArchive";
import ProjectCaseFile from "@/components/archive/ProjectCaseFile";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projectArchive.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectArchive.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Mila Abadinas`,
    description: project.description,
  };
}

export default async function ProjectCaseFilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectArchive.find((p) => p.id === id);
  if (!project) return notFound();

  return <ProjectCaseFile project={project} />;
}
