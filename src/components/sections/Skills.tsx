"use client";

import { motion } from "motion/react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, StaggerContainer, staggerItem } from "@/components/ui/AnimatedSection";

/* Real SVG icons per category */
const categoryConfig: Record<string, { color: string; borderColor: string; icon: React.ReactNode }> = {
  "Languages & Frameworks": {
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    ),
  },
  "Styling & UI": {
    color: "text-pink-400",
    borderColor: "border-pink-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    ),
  },
  "State & Data": {
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  "Real-time & Voice": {
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  "Backend Familiarity": {
    color: "text-green-400",
    borderColor: "border-green-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  "Tools & Practices": {
    color: "text-yellow-400",
    borderColor: "border-yellow-500/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
};

const featured = [
  { name: "React.js", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "TypeScript", level: 88 },
  { name: "WebRTC", level: 80 },
  { name: "WebSockets", level: 85 },
  { name: "React Native", level: 78 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Redux Toolkit", level: 85 },
];

function SkillBar({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-[var(--text-secondary)]">{skill.name}</span>
        <span className="text-xs font-mono text-[var(--text-muted)]">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <Container>
        <AnimatedSection>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-bright)]">Expertise</p>
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-4">
            Skills & Technologies
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mb-12">
            Technologies I work with across production projects — from browser-native real-time systems to responsive UI.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skill bars */}
          <AnimatedSection delay={0.1}>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest font-mono mb-6">Core proficiency</h3>
            <div className="space-y-5">
              {featured.map((s, i) => (
                <SkillBar key={s.name} skill={s} delay={i * 0.06} />
              ))}
            </div>
          </AnimatedSection>

          {/* Category cards */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest font-mono mb-6">By category</h3>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.07} delay={0.1}>
              {skillCategories.map((cat) => {
                const cfg = categoryConfig[cat.name];
                return (
                  <motion.div
                    key={cat.name}
                    variants={staggerItem}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className={`rounded-xl border bg-[var(--card)] p-4 cursor-default transition-all hover:bg-[var(--card-hover)] ${cfg?.borderColor ?? "border-[var(--border)]"}`}
                  >
                    <div className={`mb-3 ${cfg?.color ?? "text-violet-400"}`}>{cfg?.icon}</div>
                    <p className="text-xs font-bold text-[var(--text-primary)] mb-2">{cat.name}</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.slice(0, 4).map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] font-mono">
                          {s}
                        </span>
                      ))}
                      {cat.skills.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] font-mono">
                          +{cat.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
