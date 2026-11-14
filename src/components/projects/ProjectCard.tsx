"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { EASE, SPRING } from "@/components/ui/AnimatedSection";

interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  AI: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10 opacity-50">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  SaaS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10 opacity-50">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
    </svg>
  ),
  Dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10 opacity-50">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Subtle CSS 3D tilt via inline style mutation — no React state churn.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || reduce) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: EASE }}
      className={cn("cursor-default", className)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: "transform 0.25s cubic-bezier(0.33,1,0.68,1), border-color 0.25s ease",
          willChange: "transform",
        }}
        className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:border-[var(--border-light)] h-full"
      >
        {/* Visual area */}
        <div
          className="relative h-40 flex items-center justify-center overflow-hidden flex-shrink-0 border-b border-[var(--border)] bg-[var(--surface)]"
        >
          {/* Icon */}
          <div className="relative text-[var(--text-muted)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0">
            {categoryIcons[project.category] ?? categoryIcons.SaaS}
          </div>

          {/* Index */}
          <span className="absolute bottom-3 right-4 font-mono text-2xl font-bold text-[var(--border-light)] select-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Category badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-medium border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]">
            {project.category}
          </div>

          {project.confidentialityNote && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[10px] text-[var(--text-muted)]">
              <Lock className="w-3 h-3" aria-hidden />
              Confidential
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
              {project.projectType}
            </span>
            <span aria-hidden className="text-[var(--border-light)]">·</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
              {project.role}
            </span>
          </div>

          <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 5).map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ delay: index * 0.08 + 0.25 + i * 0.04, duration: 0.35, ease: EASE }}
                className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]"
              >
                {t}
              </motion.span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <motion.div whileHover={reduce ? undefined : { x: 3 }} transition={SPRING}>
              <Link
                href={`/projects/${project.slug}`}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-bright)] hover:text-[var(--accent-bright)] transition-colors"
                aria-label={`Case study: ${project.title}`}
              >
                Case study
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </motion.div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live: ${project.title}`}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                Live site
                <ExternalLink className="w-3 h-3" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
