import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { personal } from "@/data/personal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${personal.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${personal.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  return (
    <>
      <Navbar />
      <CaseStudyLayout project={project} prev={prev} next={next} />
      <Footer />
    </>
  );
}
