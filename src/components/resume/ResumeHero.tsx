"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { EASE } from "@/components/ui/AnimatedSection";
import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { useResumeViewer } from "@/components/resume/ResumeViewer";
import { ResumeDocument3D } from "@/components/resume/ResumeDocument3D";
import { ResumeActions, ResumeContactList } from "@/components/resume/ResumeContactRow";

const stats = [
  { value: "5.6", suffix: "+", label: "Years of experience" },
  { value: String(experiences.length), suffix: "", label: "Companies" },
  { value: String(projects.length), suffix: "", label: "Products shipped" },
  { value: "250", suffix: "K+", label: "Users reached" },
];

export function ResumeHero() {
  const reduce = useReducedMotion();
  const { open } = useResumeViewer();

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: EASE },
  });

  return (
    <section aria-labelledby="resume-heading" className="relative pt-32 pb-20 md:pt-40 md:pb-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <motion.div {...rise(0)} className="mb-8 flex flex-wrap items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[var(--border-light)]">
                <Image src={personal.image} alt={personal.name} fill sizes="56px" className="object-cover" priority />
              </div>
              {personal.openToOpportunities && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden />
                  Open to opportunities
                </span>
              )}
            </motion.div>

            <motion.p {...rise(0.05)} className="eyebrow mb-3">
              Résumé
            </motion.p>
            <motion.h1
              {...rise(0.1)}
              id="resume-heading"
              className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl"
            >
              {personal.name}
            </motion.h1>
            <motion.p {...rise(0.15)} className="mt-3 text-lg font-medium text-[var(--text-secondary)]">
              {personal.title}
            </motion.p>
            <motion.p {...rise(0.2)} className="mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)]">
              {personal.bio[0]}
            </motion.p>

            <motion.div {...rise(0.25)} className="mt-6">
              <ResumeContactList />
            </motion.div>
            <motion.div {...rise(0.3)} className="mt-8">
              <ResumeActions />
            </motion.div>
          </div>

          <ResumeDocument3D onOpen={open} />
        </div>

        <motion.dl
          {...rise(0.35)}
          className="mt-20 grid grid-cols-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4"
          style={{ gap: 1 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-[var(--card)] p-6">
              <dt className="mt-1 text-sm text-[var(--text-muted)]">{s.label}</dt>
              <dd className="text-3xl font-bold tabular-nums tracking-tight text-[var(--text-primary)]">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
