"use client";

import { motion } from "motion/react";
import { GraduationCap, MapPin, Calendar, Briefcase } from "lucide-react";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, StaggerContainer, staggerItem } from "@/components/ui/AnimatedSection";

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    label: "Real-time & AI",
    desc: "WebSockets · WebRTC · Google Speech APIs",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    label: "Component Architecture",
    desc: "Reusable · Scalable · Type-safe",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    label: "Cross-platform",
    desc: "React.js · Next.js · React Native",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    label: "Performance",
    desc: "Core Web Vitals · Load optimisation",
  },
];

const metaItems = [
  { icon: MapPin,       text: personal.location },
  { icon: Calendar,     text: `${personal.experienceLabel} of experience` },
  { icon: Briefcase,    text: "Frontend / Product Engineer" },
  { icon: GraduationCap, text: `${personal.education.degree}, ${personal.education.year}` },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — meta info cards */}
          <AnimatedSection direction="left" className="lg:col-span-2 flex flex-col gap-3">
            {/* Accent top bar */}
            <div
              aria-hidden
              className="w-16 h-1.5 rounded-full mb-4"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-bright))" }}
            />

            {metaItems.map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3.5 cursor-default"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[var(--accent-bright)]" aria-hidden />
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{text}</span>
              </motion.div>
            ))}

            {/* Quick stat strip */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { n: "5.6+", label: "Years exp." },
                { n: "3", label: "Companies" },
                { n: "250K+", label: "Users reached" },
                { n: "2019", label: "Graduated" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
                  <p className="text-xl font-black gradient-text">{s.n}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — text + highlight cards */}
          <div className="lg:col-span-3">
            <AnimatedSection delay={0.1}>
              <p className="mb-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-bright)]">About me</p>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
                Building interfaces that feel{" "}
                <span className="gradient-text">effortless.</span>
              </h2>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed mb-10">
                {personal.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </AnimatedSection>

            {/* Focus cards */}
            <StaggerContainer className="grid grid-cols-2 gap-3" stagger={0.08} delay={0.2}>
              {highlights.map((h) => (
                <motion.div
                  key={h.label}
                  variants={staggerItem}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`rounded-xl border p-4 cursor-default transition-all ${h.color}`}
                >
                  <span className="mb-3 block">{h.icon}</span>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{h.label}</p>
                  <p className="text-xs mt-1 opacity-80">{h.desc}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
