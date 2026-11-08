import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { personal } from "@/data/personal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Blog",
  description: `Technical writing by ${personal.name} on React, Next.js, real-time systems, and frontend architecture.`,
};

export default function BlogPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Hero band */}
        <div className="relative pt-32 pb-20 border-b border-[var(--border)] overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, var(--accent-dim) 0%, transparent 70%)" }}
          />
          <Container className="relative z-10 text-center">
            <AnimatedSection direction="down" distance={14}>
              <Link href="/" className="group inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8">
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back to portfolio
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <p className="mb-4 font-mono text-xs tracking-[0.25em] uppercase text-[var(--accent)]">Technical Writing</p>
            </AnimatedSection>
            <AnimatedSection delay={0.16} scale>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[var(--text-primary)] mb-5">
                The Blog<span className="text-[var(--accent)]">.</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.26}>
              <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
                Deep dives into React, real-time systems, AI integrations, and frontend architecture — from production experience.
              </p>
            </AnimatedSection>
          </Container>
        </div>

        <Container className="py-24 md:py-32">
          <AnimatedSection scale className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-transform duration-500 hover:scale-105 hover:rotate-3">
              <PenLine className="w-8 h-8 text-[var(--accent)]" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Coming Soon</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Articles are currently being written. I&apos;ll be sharing deep dives on real problems I encounter building production software.
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              Follow me on{" "}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                LinkedIn
              </a>{" "}
              to get notified when articles go live.
            </p>
          </AnimatedSection>
        </Container>
      </main>

      <Footer />
    </>
  );
}
