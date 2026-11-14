"use client";

import { motion } from "motion/react";
import { GraduationCap, Hand } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, StaggerContainer, staggerItem } from "@/components/ui/AnimatedSection";
import { SkillGlobe } from "@/components/ui/SkillGlobe";

const allSkills = Array.from(new Set(skillCategories.flatMap((c) => c.skills)));

export function ResumeSkills() {
  return (
    <section id="resume-skills" aria-labelledby="resume-skills-heading" className="section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <AnimatedSection>
              <p className="eyebrow mb-3">Toolkit</p>
              <h2 id="resume-skills-heading" className="mb-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
                Skills &amp; education
              </h2>
              <p className="mb-8 max-w-lg text-[var(--text-secondary)]">
                {allSkills.length} technologies used in production, from real-time browser systems to accessible,
                responsive UI.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
              {skillCategories.map((cat) => (
                <motion.div key={cat.name} variants={staggerItem} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <p className="mb-1.5 text-sm font-semibold text-[var(--text-primary)]">{cat.name}</p>
                  <p className="text-xs leading-relaxed text-[var(--text-muted)]">{cat.skills.join(" · ")}</p>
                </motion.div>
              ))}
            </StaggerContainer>

            <AnimatedSection delay={0.1} className="mt-3 flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-[var(--accent-bright)]">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{personal.education.degree}</p>
                <p className="text-xs text-[var(--text-muted)]">Graduated {personal.education.year}</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15} className="relative mx-auto w-full max-w-[500px]">
            <SkillGlobe skills={allSkills} />
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Hand className="h-3.5 w-3.5" aria-hidden /> Drag to rotate
            </p>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
