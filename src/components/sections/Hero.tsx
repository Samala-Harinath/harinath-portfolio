"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { useResumeViewer } from "@/components/resume/ResumeViewer";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HeroScene } from "@/components/ui/HeroScene";

const ROLES = [
  "Frontend engineer",
  "Product engineer",
  "Real-time systems",
  "React & Next.js",
];

const stats = [
  { raw: "5.6", suffix: "+", label: "Years" },
  { raw: "3", suffix: "", label: "Companies" },
  { raw: "250", suffix: "K+", label: "Users reached" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 76,
    behavior: "smooth",
  });
}

function RoleLine() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <span className="inline-grid align-bottom">
      {ROLES.map((role) => (
        <span key={role} aria-hidden className="invisible col-start-1 row-start-1 select-none whitespace-nowrap">
          {role}
        </span>
      ))}
      <span className="col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROLES[index]}
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[var(--accent-bright)]"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { open: openResume } = useResumeViewer();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxRaw = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const parallax = useSpring(parallaxRaw, { stiffness: 120, damping: 28, mass: 0.4 });
  const visualY = reduce ? 0 : parallax;
  const visualOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.25]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18, filter: reduce ? "none" : "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <Container className="relative z-10 w-full pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <motion.div className="max-w-xl" style={{ y: copyY }}>
            {personal.openToOpportunities && (
              <motion.div {...rise(0)} className="mb-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-60"
                      style={{ animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite" }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                  </span>
                  Open to opportunities
                </span>
              </motion.div>
            )}

            <motion.p
              {...rise(0.06)}
              className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--text-muted)]"
            >
              {personal.name}
            </motion.p>

            <motion.h1
              {...rise(0.12)}
              className="text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-[var(--text-primary)]"
            >
              <RoleLine />
              <span className="mt-1 block">for products that</span>
              <span className="mt-1 block">have to ship.</span>
            </motion.h1>

            <motion.p
              {...rise(0.2)}
              className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-[var(--text-secondary)] md:text-base"
            >
              {personal.experienceLabel} building production React, Next.js, and TypeScript —
              real-time WebSockets, WebRTC, and voice AI across fintech, healthcare, and AI products.
            </motion.p>

            <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={() => scrollTo("projects")}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="btn-primary inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                View selected work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </motion.button>
              <motion.button
                type="button"
                onClick={openResume}
                aria-haspopup="dialog"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="btn-secondary inline-flex h-11 items-center gap-2 rounded-lg px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                <FileText className="h-4 w-4" aria-hidden />
                View resume
              </motion.button>
            </motion.div>

            <motion.div {...rise(0.34)} className="mt-7 flex items-center gap-1">
              {[
                { href: personal.github, label: "GitHub", Icon: GithubIcon },
                { href: personal.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: `mailto:${personal.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="rounded-lg p-2.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-dim)] hover:text-[var(--accent-bright)]"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </a>
              ))}
              <span className="ml-2 hidden font-mono text-xs text-[var(--text-muted)] sm:inline">
                {personal.email}
              </span>
            </motion.div>

            <motion.dl
              {...rise(0.42)}
              className="mt-10 grid max-w-md grid-cols-3 border-t border-[var(--border)] pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-[var(--text-primary)]">
                    <AnimatedCounter value={stat.raw} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: visualY, opacity: visualOpacity }}
            className="relative mx-auto aspect-square w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[600px]"
          >
            <HeroScene />
          </motion.div>
        </div>
      </Container>

      <ScrollCue reduce={!!reduce} />
    </section>
  );
}

function ScrollCue({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="pointer-events-none absolute inset-x-0 bottom-7 z-10 hidden justify-center md:flex"
    >
      <div className="flex h-9 w-5 items-start justify-center rounded-full border border-[var(--border-light)] p-1">
        <motion.span
          className="h-1.5 w-1 rounded-full bg-[var(--accent-bright)]"
          animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
