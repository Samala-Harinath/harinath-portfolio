"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, MapPin, Calendar, Briefcase } from "lucide-react";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
  staggerChip,
  SPRING,
  EASE,
} from "@/components/ui/AnimatedSection";

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

/**
 * Framed portrait with a pointer-driven parallax tilt.
 * The image and the frame move at slightly different depths.
 */
function Portrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function tilt(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(${x * -14}px, ${y * -14}px, 0) scale(1.08)`;
    }
  }

  function reset() {
    if (frameRef.current) frameRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    if (imageRef.current) imageRef.current.style.transform = "translate3d(0,0,0) scale(1)";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 28, filter: reduce ? "none" : "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative mb-6"
      style={{ perspective: "1100px" }}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      {/* Offset accent frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[var(--accent)]/35"
        initial={{ opacity: 0, x: reduce ? 0 : -12, y: reduce ? 0 : -12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      />

      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 60% 35%, var(--accent-glow) 0%, transparent 65%)",
        }}
      />

      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[var(--card)] shadow-[var(--shadow-card)] will-change-transform transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform transition-transform duration-300 ease-out"
          >
            <Image
              src={personal.image}
              alt={`${personal.name} — ${personal.title}`}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 90vw"
            />
          </div>

          {/* Bottom scrim + caption */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
            style={{ background: "linear-gradient(to top, rgba(7,7,10,0.9), transparent)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-base font-bold tracking-tight text-white">{personal.name}</p>
            <p className="mt-0.5 text-xs text-white/70">{personal.title}</p>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/30 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-[var(--success)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden />
              {personal.location.split(",")[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — portrait + meta info cards */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <Portrait />

            {/* Accent bar — draws in */}
            <motion.div
              aria-hidden
              className="w-16 h-1.5 rounded-full mb-1 origin-left"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-bright))" }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: EASE }}
            />

            <StaggerContainer className="flex flex-col gap-3" stagger={0.07}>
              {metaItems.map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={staggerItem}
                  whileHover={reduce ? undefined : { x: 6 }}
                  transition={SPRING}
                  className="flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3.5 cursor-default hover:border-[var(--border-light)] transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[var(--accent-bright)]" aria-hidden />
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">{text}</span>
                </motion.div>
              ))}
            </StaggerContainer>

            {/* Quick stat strip */}
            <StaggerContainer className="mt-4 grid grid-cols-2 gap-3" stagger={0.06} delay={0.15}>
              {[
                { n: "5.6+", label: "Years exp." },
                { n: "3", label: "Companies" },
                { n: "250K+", label: "Users reached" },
                { n: "2019", label: "Graduated" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerChip}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={SPRING}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center hover:border-[var(--border-light)] transition-colors"
                >
                  <p className="text-xl font-black gradient-text">{s.n}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1">{s.label}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>

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
                  whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  transition={SPRING}
                  className={`rounded-xl border p-4 cursor-default transition-colors ${h.color}`}
                >
                  <motion.span
                    className="mb-3 block"
                    whileHover={reduce ? undefined : { rotate: -6, scale: 1.12 }}
                    transition={SPRING}
                  >
                    {h.icon}
                  </motion.span>
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
