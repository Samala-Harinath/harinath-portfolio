"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
  Printer,
  ArrowRight,
  X,
} from "lucide-react";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { MiniResumePaper } from "@/components/resume/MiniResumePaper";

/** Public path of the resume PDF (file lives in /public). */
export const RESUME_PATH = "/Resume.pdf";
/** Friendly filename used when the visitor downloads the PDF. */
export const RESUME_FILE_NAME = "Harinath-Samala-Resume.pdf";

interface ResumeViewerContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ResumeViewerContext = createContext<ResumeViewerContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useResumeViewer() {
  return useContext(ResumeViewerContext);
}

/**
 * Global "view resume" modal. Any component can call
 * `useResumeViewer().open()` to preview the PDF with download / print actions.
 */
export function ResumeViewerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ResumeViewerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>{isOpen && <ResumeModal key="resume-modal" onClose={close} />}</AnimatePresence>
    </ResumeViewerContext.Provider>
  );
}

/** Drop-in button that opens the resume viewer. */
export function ResumeButton({
  className,
  children,
  "aria-label": ariaLabel = "View resume",
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  onClick?: () => void;
}) {
  const { open } = useResumeViewer();
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

const iconBtn =
  "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-light)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-bright)] hover:text-[var(--text-primary)]";

/* ══════════════════════════════════════════════════════════════
   Modal
══════════════════════════════════════════════════════════════ */

function ResumeModal({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Lock page scroll + close on Escape while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handlePrint = () => {
    try {
      const win = frameRef.current?.contentWindow;
      if (!win) throw new Error("no frame");
      win.focus();
      win.print();
    } catch {
      window.open(RESUME_PATH, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      style={{ perspective: 1600 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-viewer-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close resume viewer"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
      />

      {/* Panel — subtle 3D lift-in */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 10, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.7 }}
        style={{ transformOrigin: "50% 100%" }}
        className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[var(--border-light)] bg-[var(--surface)] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)]"
      >
        <ModalHeader onClose={onClose} onPrint={handlePrint} />

        {/* Body */}
        <div className="relative flex-1 bg-[var(--bg)]">
          {/* Tablet / desktop: inline PDF */}
          <div className="absolute inset-0 hidden p-3 sm:p-5 md:block">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--card)] text-[var(--text-muted)]">
                  <LoaderCircle className="h-7 w-7 animate-spin text-[var(--accent-bright)]" aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-widest">Loading resume…</span>
                </div>
              )}
              <iframe
                ref={frameRef}
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&view=FitH`}
                title={`${personal.name} resume PDF`}
                onLoad={() => setLoaded(true)}
                className={cn("h-full w-full transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
              />
            </div>
          </div>

          {/* Mobile: most mobile browsers can't render PDFs inline */}
          <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center md:hidden">
            <MiniResumePaper className="float-y" />
            <p className="max-w-xs text-sm text-[var(--text-secondary)]">
              Open the PDF in your browser&apos;s viewer, or download a copy.
            </p>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
              >
                <ExternalLink className="h-4 w-4" aria-hidden /> Open PDF
              </a>
              <a
                href={RESUME_PATH}
                download={RESUME_FILE_NAME}
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
              >
                <Download className="h-4 w-4" aria-hidden /> Download PDF
              </a>
            </div>
          </div>
        </div>

        <ModalFooter onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}


function ModalHeader({ onClose, onPrint }: { onClose: () => void; onPrint: () => void }) {
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--accent-bright)]">
          <FileText className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 id="resume-viewer-title" className="truncate text-base font-bold text-[var(--text-primary)]">
            {personal.name} — Resume
          </h2>
          <p className="truncate font-mono text-[11px] text-[var(--text-muted)]">
            {personal.title} · {personal.experienceLabel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={onPrint} aria-label="Print resume" title="Print" className={cn(iconBtn, "hidden md:inline-flex")}>
          <Printer className="h-4 w-4" aria-hidden />
        </button>
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open PDF in new tab"
          title="Open in new tab"
          className={cn(iconBtn, "hidden sm:inline-flex")}
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={RESUME_PATH}
          download={RESUME_FILE_NAME}
          className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download
        </a>
        <button type="button" onClick={onClose} autoFocus aria-label="Close resume viewer" className={cn(iconBtn, "ml-1")}>
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-xs text-[var(--text-muted)] sm:px-5">
      <span className="hidden sm:inline">
        Press <kbd className="rounded border border-[var(--border-light)] px-1.5 py-0.5 font-mono">Esc</kbd> to close
      </span>
      <Link
        href="/resume"
        onClick={onClose}
        className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-bright)] hover:underline"
      >
        View full résumé page
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}

