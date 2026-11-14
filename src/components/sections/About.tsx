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
    tone: "#059669",
    label: "Real-time & AI",
    desc: "WebSockets · WebRTC · Google Speech APIs",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    tone: "#7c3aed",
    label: "Component Architecture",
    desc: "Reusable · Scalable · Type-safe",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    tone: "#0891b2",
    label: "Cross-platform",
    desc: "React.js · Next.js · React Native",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    tone: "#e11d48",
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
        className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[var(--border-light)]"
        initial={{ opacity: 0, x: reduce ? 0 : -12, y: reduce ? 0 : -12 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
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

        </div>
        {/* Caption */}
        <div className="border-t border-[var(--border)] bg-[var(--card)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{personal.name}</p>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            {personal.title} · {personal.location.split(",")[0]}
          </p>
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
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">

          <div className="lg:col-span-5">
            <Portrait />
          </div>

          {/* Copy sits beside the portrait so the column doesn't end early. */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <p className="eyebrow mb-3">About me</p>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
                Building interfaces that feel effortless.
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
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow-card)]"
                >
                  <motion.span
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ color: h.tone, background: `${h.tone}18` }}
                    whileHover={reduce ? undefined : { rotate: -6, scale: 1.12 }}
                    transition={SPRING}
                  >
                    {h.icon}
                  </motion.span>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{h.label}</p>
                  <p className="text-xs mt-1 text-[var(--text-muted)]">{h.desc}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Facts span the full width — they used to stack under the portrait and leave the right side empty. */}
        <StaggerContainer className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {metaItems.map(({ icon: Icon, text }, index) => {
            const tone = ["#2563eb", "#0891b2", "#7c3aed", "#059669"][index];
            return (
              <motion.div
                key={text}
                variants={staggerItem}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={SPRING}
                className="flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3.5 shadow-[var(--shadow-card)]"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ color: tone, background: `${tone}18` }}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{text}</span>
              </motion.div>
            );
          })}
        </StaggerContainer>

        <StaggerContainer className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4" stagger={0.05} delay={0.08}>
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
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center shadow-[var(--shadow-card)]"
            >
              <p className="text-xl font-bold text-[var(--text-primary)]">{s.n}</p>
              <p className="mt-1 text-[10px] text-[var(--text-muted)]">{s.label}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
