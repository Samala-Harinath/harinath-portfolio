"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
  staggerChip,
  SPRING,
} from "@/components/ui/AnimatedSection";

const approaches = [
  {
    num: "01",
    color: "text-violet-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    title: "Reusable component architecture",
    description: "I build UI from composable, well-typed components. This keeps codebases navigable, reduces duplication, and makes future changes predictable rather than risky.",
    tags: ["React", "TypeScript", "Design Systems"],
  },
  {
    num: "02",
    color: "text-cyan-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Real-time & streaming interfaces",
    description: "Hands-on with WebSockets, WebRTC, and streaming response UIs. Real-time features require careful state design to avoid flicker and inconsistency.",
    tags: ["WebSockets", "WebRTC", "API Streaming"],
  },
  {
    num: "03",
    color: "text-pink-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "AI & voice API integration",
    description: "Built production integrations with Google STT/TTS and AI streaming APIs. Voice and AI UIs need a clear feedback loop — loading, speaking, thinking states matter.",
    tags: ["Google STT/TTS", "AI Streaming", "Voice UX"],
  },
  {
    num: "04",
    color: "text-amber-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: "Performance-conscious development",
    description: "I keep an eye on bundle size, rendering cost, and Core Web Vitals throughout. Performance improvements made early are cheaper than fixes post-launch.",
    tags: ["Core Web Vitals", "Bundle analysis", "Memoization"],
  },
  {
    num: "05",
    color: "text-emerald-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Cross-platform development",
    description: "Shipping on React Native alongside web. Shared state logic and design tokens reduce duplication while each surface gets appropriate UX treatment.",
    tags: ["React Native", "Cross-browser", "Responsive"],
  },
  {
    num: "06",
    color: "text-orange-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Maintainable code at scale",
    description: "I write code with the next engineer in mind: consistent naming, clear boundaries, and debugging practices that make production issues faster to trace.",
    tags: ["Agile/Scrum", "Git", "Code review"],
  },
];

export function EngineeringApproach() {
  const reduce = useReducedMotion();

  return (
    <section id="approach" aria-labelledby="approach-heading" className="section">
      <Container>
        <AnimatedSection>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-bright)]">How I work</p>
          <h2 id="approach-heading" className="text-3xl md:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-4">
            Engineering approach
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mb-12">
            Principles I apply consistently across every product I build.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {approaches.map((item) => (
            <motion.div
              key={item.num}
              variants={staggerItem}
              whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              transition={SPRING}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--border-light)] transition-colors hover:shadow-xl hover:shadow-black/30 cursor-default"
            >
              {/* Number */}
              <div className="flex items-start justify-between mb-5">
                <motion.span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} bg-current/10`}
                  whileHover={reduce ? undefined : { rotate: -8, scale: 1.1 }}
                  transition={SPRING}
                >
                  <span className={item.color}>{item.icon}</span>
                </motion.span>
                <span className="font-mono text-3xl font-black text-[var(--border-light)] transition-colors duration-300 group-hover:text-[var(--accent)]/30">
                  {item.num}
                </span>
              </div>

              <h3 className="text-base font-bold text-[var(--text-primary)] mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {item.description}
              </p>
              <StaggerContainer className="flex flex-wrap gap-1.5" stagger={0.03} delay={0.12}>
                {item.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={staggerChip}
                    className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[10px] font-mono text-[var(--text-muted)]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </StaggerContainer>
            </motion.div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
