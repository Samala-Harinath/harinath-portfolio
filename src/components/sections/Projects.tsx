import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <Container>
        <AnimatedSection>
          <p className="eyebrow mb-3">Selected work</p>
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Projects
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mb-12">
            Production work from enterprise AI platforms to SaaS products — built and shipped for real users.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={featured.length + i} />
            ))}
          </div>
        )}

        <AnimatedSection delay={0.1}>
          <p className="mt-8 text-xs text-[var(--text-muted)] max-w-2xl leading-relaxed">
            <span className="text-[var(--text-secondary)] font-medium">Note:</span> Some project details are sanitised to respect confidentiality. Architecture patterns and implementation approaches are described accurately; client-specific data and proprietary details are omitted.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
