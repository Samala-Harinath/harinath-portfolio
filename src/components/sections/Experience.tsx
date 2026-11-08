"use client";

import { motion } from "motion/react";
import { experiences } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const companyConfig: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  Llamaworx: { color: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/30", dot: "bg-violet-400" },
  Docintosh: { color: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400" },
  Techiebears: { color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
};

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <Container>
        <AnimatedSection>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-bright)]">Career</p>
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-12">
            Work Experience
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline spine with gradient */}
          <div
            aria-hidden
            className="absolute left-5 top-6 bottom-6 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, #7c3aed, rgba(124,58,237,0.2), transparent)" }}
          />

          <ol className="flex flex-col gap-6">
            {experiences.map((exp, idx) => {
              const cfg = companyConfig[exp.company] ?? companyConfig.Techiebears;
              return (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden
                    className={`hidden md:flex absolute left-0 top-6 w-10 h-10 items-center justify-center rounded-full border-2 ${idx === 0 ? "border-[var(--accent)] bg-[var(--accent-dim)]" : "border-[var(--border-light)] bg-[var(--surface)]"}`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 hover:border-[var(--border-light)] transition-all hover:shadow-2xl hover:shadow-black/30"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <h3 className="text-lg font-bold text-[var(--text-primary)]">{exp.role}</h3>
                          {exp.current && <Badge variant="success">Current</Badge>}
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} aria-hidden />
                          {exp.company}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 sm:items-end flex-shrink-0">
                        <span className="font-mono text-sm text-[var(--text-muted)]">
                          {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                        </span>
                        {exp.location && (
                          <span className="text-xs text-[var(--text-muted)]">{exp.location}</span>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mb-5 pl-4 border-l-2 border-[var(--accent)]/30">
                      <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                        {exp.summary}
                      </p>
                    </div>

                    {/* Bullets */}
                    <ul className="mb-5 space-y-2.5">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                          <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${cfg.dot}`} aria-hidden />
                          {r}
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
