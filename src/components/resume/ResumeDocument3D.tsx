"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Eye } from "lucide-react";
import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";

const TOP_SKILLS = ["React", "Next.js", "TypeScript", "React Native", "WebRTC", "WebSockets"];

/**
 * Résumé preview card with a restrained pointer-driven 3D tilt.
 * Everything stays inside its own box — nothing overflows into the header.
 */
export function ResumeDocument3D({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), spring);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1200 relative mx-auto w-full max-w-[340px]"
    >
      <motion.button
        ref={ref}
        type="button"
        onClick={onOpen}
        onPointerMove={onMove}
        onPointerLeave={reset}
        aria-label="Open résumé PDF"
        aria-haspopup="dialog"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative block aspect-[1/1.3] w-full cursor-pointer text-left"
      >
        {/* single back sheet for depth */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-xl border border-[var(--border-light)] bg-[var(--card)]"
          style={{ transform: "translateZ(-24px) translate(10px, 10px)" }}
        />

        {/* front sheet */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]">
          <p className="text-lg font-bold leading-tight text-zinc-900">{personal.name}</p>
          <p className="text-xs font-medium text-zinc-600">{personal.title}</p>
          <p className="mt-1 truncate text-[10px] text-zinc-400">{personal.location}</p>
          <div className="my-4 h-px bg-zinc-200" />

          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Experience</p>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.company}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[11px] font-semibold text-zinc-800">
                    {exp.role} · <span className="text-blue-700">{exp.company}</span>
                  </p>
                  <p className="shrink-0 font-mono text-[8px] text-zinc-400">
                    {exp.startDate.split(" ")[1]}–{exp.current ? "Now" : exp.endDate?.split(" ")[1]}
                  </p>
                </div>
                <div className="mt-1.5 space-y-1">
                  <div className="h-1 w-[92%] rounded-full bg-zinc-100" />
                  <div className="h-1 w-[70%] rounded-full bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Skills</p>
          <div className="flex flex-wrap gap-1">
            {TOP_SKILLS.map((s) => (
              <span key={s} className="rounded border border-zinc-200 px-1.5 py-0.5 text-[8.5px] font-medium text-zinc-600">
                {s}
              </span>
            ))}
          </div>

          {/* hover overlay */}
          <div className="absolute inset-0 flex items-end justify-center bg-zinc-900/0 pb-6 transition-colors duration-300 group-hover:bg-zinc-900/5 group-focus-visible:bg-zinc-900/5">
            <span className="inline-flex translate-y-2 items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <Eye className="h-3.5 w-3.5" aria-hidden /> Preview PDF
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
