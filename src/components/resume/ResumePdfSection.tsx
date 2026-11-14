"use client";

import Link from "next/link";
import { Download, ExternalLink, Maximize2, Mail } from "lucide-react";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RESUME_FILE_NAME, RESUME_PATH, useResumeViewer } from "@/components/resume/ResumeViewer";
import { MiniResumePaper } from "@/components/resume/MiniResumePaper";

const smallBtn =
  "btn-secondary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]";

export function ResumePdfSection() {
  const { open } = useResumeViewer();

  return (
    <section id="resume-pdf" aria-labelledby="resume-pdf-heading" className="section no-print">
      <Container>
        <AnimatedSection className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Document</p>
          <h2 id="resume-pdf-heading" className="text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
            Résumé PDF
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            An ATS-friendly copy to share with your hiring team. You can preview it here or download it.
          </p>
        </AnimatedSection>

        <AnimatedSection className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
            <span className="font-mono text-xs text-[var(--text-muted)]">{RESUME_FILE_NAME}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={open} aria-haspopup="dialog" className={smallBtn}>
                <Maximize2 className="h-3.5 w-3.5" aria-hidden /> Full screen
              </button>
              <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className={`${smallBtn} hidden sm:inline-flex`}>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden /> New tab
              </a>
              <a href={RESUME_PATH} download={RESUME_FILE_NAME} className="btn-primary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold">
                <Download className="h-3.5 w-3.5" aria-hidden /> Download
              </a>
            </div>
          </div>

          <div className="hidden h-[80vh] max-h-[960px] bg-[var(--surface)] p-4 md:block">
            <iframe
              src={`${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH`}
              title={`${personal.name} résumé PDF`}
              loading="lazy"
              className="h-full w-full rounded-md border border-[var(--border)] bg-white"
            />
          </div>

          <div className="flex flex-col items-center gap-6 p-10 md:hidden">
            <MiniResumePaper />
            <button type="button" onClick={open} className="btn-primary w-full max-w-xs rounded-lg px-5 py-3 text-sm font-semibold">
              Preview résumé
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">Hiring for your team?</p>
            <p className="text-sm text-[var(--text-secondary)]">I usually reply within 24 hours.</p>
          </div>
          <Link
            href="/#contact"
            className="btn-primary inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-semibold"
          >
            <Mail className="h-4 w-4" aria-hidden /> Get in touch
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
