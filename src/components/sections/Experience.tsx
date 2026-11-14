"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import {
  AnimatedSection,
  StaggerContainer,
  staggerChip,
  SPRING,
  EASE,
} from "@/components/ui/AnimatedSection";

export function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <Container>
        <AnimatedSection className="mx-auto mb-16 max-w-2xl text-center">
          <p className="eyebrow mb-3">Career</p>
          <h2 id="experience-heading" className="text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
            Work Experience
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Roles that shaped how I ship real-time products — alternating across the timeline.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-2 left-4 top-2 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            className="absolute bottom-2 left-4 top-2 w-px origin-top md:left-1/2 md:-translate-x-1/2"
            style={{
              background: "linear-gradient(180deg, var(--accent-bright), var(--accent-2))",
            }}
            initial={{ scaleY: reduce ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.15, ease: EASE }}
          />

          <ol className="flex flex-col gap-8 md:gap-14">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li key={exp.company} className="relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-16">
                  <motion.span
                    aria-hidden
                    initial={{ scale: reduce ? 1 : 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-12%" }}
                    transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.12 }}
                    className={`absolute top-8 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--accent-bright)] bg-[var(--bg)] shadow-[0_0_16px_var(--accent-glow)] left-4 -translate-x-1/2 md:left-1/2 ${
                      idx === 0 ? "" : "opacity-90"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-bright)]" />
                  </motion.span>

                  <div className={isLeft ? "hidden pt-7 md:col-start-2 md:block md:pl-8" : "hidden pt-7 md:col-start-1 md:row-start-1 md:block md:pr-8 md:text-right"}>
                    <p className="font-mono text-sm font-medium text-[var(--accent-bright)]">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </p>
                    {exp.location && (
                      <p className={`mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] ${isLeft ? "" : "md:flex-row-reverse"}`}>
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {exp.location}
                      </p>
                    )}
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className={`perspective-1200 pl-10 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-6" : "md:col-start-2 md:row-start-1 md:pl-6"}`}>
                    <motion.article
                      initial={
                        reduce
                          ? false
                          : {
                              opacity: 0,
                              rotateY: isLeft ? 32 : -32,
                              x: isLeft ? -36 : 36,
                              y: 18,
                            }
                      }
                      whileInView={{ opacity: 1, rotateY: 0, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-12%" }}
                      transition={{ duration: 0.85, ease: EASE }}
                      whileHover={
                        reduce
                          ? undefined
                          : { y: -8, rotateY: isLeft ? -7 : 7, rotateX: 3 }
                      }
                      className="preserve-3d w-full rounded-2xl border border-[var(--border-light)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] md:p-8"
                      style={{
                        background:
                          "linear-gradient(165deg, color-mix(in srgb, var(--card) 72%, white) 0%, var(--card) 48%)",
                      }}
                    >
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2.5">
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">{exp.role}</h3>
                            {exp.current && <Badge variant="success">Current</Badge>}
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-light)] bg-[var(--accent-dim)] px-3 py-1 text-sm font-semibold text-[var(--accent-bright)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-bright)]" aria-hidden />
                            {exp.company}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 sm:items-end md:hidden">
                          <span className="font-mono text-sm text-[var(--text-muted)]">
                            {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                          </span>
                          {exp.location && (
                            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                              <MapPin className="h-3 w-3" aria-hidden />
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="mb-5 border-l-2 border-[var(--accent-bright)] pl-4 text-sm italic leading-relaxed text-[var(--text-secondary)]">
                        {exp.summary}
                      </p>

                      <StaggerContainer as="ul" className="mb-5 space-y-2.5" stagger={0.04} delay={0.08}>
                        {exp.responsibilities.map((item) => (
                          <motion.li
                            key={item}
                            variants={staggerChip}
                            className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-bright)]" aria-hidden />
                            {item}
                          </motion.li>
                        ))}
                      </StaggerContainer>

                      <StaggerContainer className="flex flex-wrap gap-1.5" stagger={0.02} delay={0.12}>
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            variants={staggerChip}
                            whileHover={reduce ? undefined : { y: -2, scale: 1.05 }}
                            transition={SPRING}
                            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-bright)] hover:text-[var(--text-primary)]"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </StaggerContainer>
                    </motion.article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
