import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ExternalLink, Lock } from "lucide-react";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";

interface Props {
  project: Project;
  prev?: Pick<Project, "slug" | "title">;
  next?: Pick<Project, "slug" | "title">;
}

export function CaseStudyLayout({ project, prev, next }: Props) {
  return (
    <main className="pt-16 pb-24">
      {/* Hero band */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] mb-12">
        <Container className="max-w-[900px] py-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            All projects
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant="accent">{project.category}</Badge>
            <Badge variant="default">{project.projectType}</Badge>
            {project.confidentialityNote && (
              <Badge variant="outline">
                <Lock className="w-3 h-3 mr-1" aria-hidden />
                Confidential details omitted
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5 leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
            {project.summary}
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap gap-8 text-sm border-t border-[var(--border)] pt-6">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-1">Role</span>
              <span className="text-[var(--text-secondary)]">{project.role}</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-1">Type</span>
              <span className="text-[var(--text-secondary)]">{project.projectType}</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* External links */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-4 mt-6">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--accent)]/50 text-[var(--accent-bright)] hover:bg-[var(--accent-dim)] transition-all">
                  <ExternalLink className="w-4 h-4" aria-hidden />
                  Live site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-light)] hover:text-[var(--text-primary)] transition-all">
                  Source
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
              )}
            </div>
          )}
        </Container>
      </div>

      {/* Body */}
      <Container className="max-w-[900px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="md:col-span-2 space-y-10">
            <CsSection title="Problem / User need">
              <p className="text-[var(--text-secondary)] leading-relaxed">{project.caseStudy.problem}</p>
            </CsSection>

            <CsSection title="Solution & design decisions">
              <p className="text-[var(--text-secondary)] leading-relaxed">{project.caseStudy.solution}</p>
            </CsSection>

            <CsSection title="Technical implementation">
              <ul className="space-y-3">
                {project.caseStudy.implementation.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent-bright)] flex-shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </CsSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Constraints</h3>
              <ul className="space-y-3">
                {project.caseStudy.constraints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent-bright)] flex-shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5 p-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--success)] mb-4">Outcomes</h3>
              <ul className="space-y-3">
                {project.caseStudy.outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--success)] flex-shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {project.confidentialityNote && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 flex gap-3">
                <Lock className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" aria-hidden />
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{project.confidentialityNote}</p>
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav aria-label="Project navigation" className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between gap-4">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors max-w-[45%]" aria-label={`Previous: ${prev.title}`}>
                <ArrowLeft className="w-4 h-4 flex-shrink-0" aria-hidden />
                <span className="truncate">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors max-w-[45%] ml-auto" aria-label={`Next: ${next.title}`}>
                <span className="truncate">{next.title}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden />
              </Link>
            ) : <span />}
          </nav>
        )}
      </Container>
    </main>
  );
}

function CsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 pb-3 border-b border-[var(--border)] flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-[var(--accent)]" aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}
