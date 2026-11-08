"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
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
            className="block gradient-text"
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

function Portrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function tilt(event: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card || reduce) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 12}deg)`;
  }

  function reset() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateY(-10deg) rotateX(6deg)";
  }

  return (
    <div
      className="absolute bottom-6 left-2 z-20 w-[148px] sm:bottom-10 sm:left-4 sm:w-[168px] md:w-[186px]"
      style={{ perspective: "900px" }}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <div
        ref={cardRef}
        className="relative will-change-transform transition-transform duration-200 ease-out"
        style={{ transform: "rotateY(-10deg) rotateX(6deg)", transformStyle: "preserve-3d" }}
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[var(--card)] shadow-2xl shadow-black/50">
          <div className="relative aspect-[4/5]">
            <Image
              src={personal.image}
              alt={personal.name}
              fill
              priority
              className="object-cover object-top"
              sizes="186px"
            />
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--border)] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden />
            <span className="truncate text-[10px] font-medium tracking-wide text-[var(--text-secondary)]">
              {personal.location.split(",")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 78% 42%, rgba(124,58,237,0.22) 0%, transparent 58%)," +
            "radial-gradient(ellipse 40% 35% at 8% 88%, rgba(34,211,238,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.045) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(139,92,246,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 70% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />

      <Container className="relative z-10 w-full py-28 md:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
          <div className="max-w-xl">
            {personal.openToOpportunities && (
              <motion.div {...rise(0)} className="mb-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--success)]/25 bg-[var(--success)]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--success)]">
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
              className="text-[clamp(2rem,4.6vw,3.55rem)] font-black leading-[1.04] tracking-tight text-[var(--text-primary)]"
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
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                View selected work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </motion.button>
              <motion.a
                href="/Resume.pdf"
                download
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-bright)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                <Download className="h-4 w-4" aria-hidden />
                Resume
              </motion.a>
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
                  <dd className="mt-1 text-2xl font-black tabular-nums tracking-tight text-[var(--text-primary)]">
                    <AnimatedCounter value={stat.raw} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[480px] lg:h-[560px] lg:max-w-none"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(34,211,238,0.08) 42%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <HeroScene />
            <Portrait />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
