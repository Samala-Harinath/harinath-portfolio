import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, StaggerContainer } from "@/components/ui/AnimatedSection";
import { IndustryCard } from "@/components/sections/IndustryCard";

export function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-heading" className="section">
      <Container>
        <AnimatedSection className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Industries</p>
            <h2 id="industries-heading" className="mb-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Experience across domains
            </h2>
            <p className="text-[var(--text-secondary)]">
              Real-time, AI and data-heavy interfaces shipped in regulated, high-traffic products. The same engineering
              applies to most product teams.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-1.5 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden /> Shipped: production work
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full border border-[var(--text-muted)]" aria-hidden /> Transferable: same skill set
            </span>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {industries.map((ind) => (
            <IndustryCard key={ind.name} industry={ind} />
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
