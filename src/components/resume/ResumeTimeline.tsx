"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, EASE } from "@/components/ui/AnimatedSection";

export function ResumeTimeline() {
  const reduce = useReducedMotion();

  return (
    <section id="resume-experience" aria-labelledby="resume-exp-heading" className="section">
      <Container>
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-3">Career</p>
          <h2 id="resume-exp-heading" className="text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
            Experience
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-2 left-4 top-2 w-px md:left-1/2 md:-translate-x-1/2"
            style={{ background: "linear-gradient(180deg, var(--accent-bright), var(--accent-2))" }}
          />

          <ol className="flex flex-col gap-8 md:gap-12">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li key={exp.company} className="relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-16">
                  <span
                    aria-hidden
                    className="absolute top-8 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[var(--accent-bright)] bg-[var(--bg)] shadow-[0_0_14px_var(--accent-glow)] md:left-1/2"
                  />

                  <div className={`perspective-1200 pl-10 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-6" : "md:col-start-2 md:pl-6"}`}>
                    <motion.article
                      initial={reduce ? false : { opacity: 0, rotateY: isLeft ? 28 : -28, y: 16 }}
                      whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                      viewport={{ once: true, margin: "-12%" }}
                      transition={{ duration: 0.75, ease: EASE }}
                      whileHover={reduce ? undefined : { y: -6, rotateY: isLeft ? -6 : 6 }}
                      className="preserve-3d w-full rounded-2xl border border-[var(--border-light)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] md:p-8"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{exp.role}</h3>
                          <p className="text-sm font-medium text-[var(--accent-bright)]">{exp.company}</p>
                        </div>
                        <div className="flex flex-col gap-1 sm:items-end">
                          <span className="font-mono text-xs text-[var(--text-secondary)]">
                            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                          </span>
                          {exp.location && (
                            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                              <MapPin className="h-3 w-3" aria-hidden /> {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{exp.summary}</p>
                      <ul className="mt-4 space-y-2">
                        {exp.responsibilities.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-bright)]" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">
                            {tech}
                          </span>
                        ))}
                      </div>
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
