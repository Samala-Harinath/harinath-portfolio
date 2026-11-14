"use client";

import { motion } from "motion/react";
import {
  Clapperboard,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Mic,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { Industry, IndustryIcon } from "@/data/industries";
import { staggerItem } from "@/components/ui/AnimatedSection";

const ICONS: Record<IndustryIcon, LucideIcon> = {
  voice: Mic,
  fintech: Landmark,
  health: HeartPulse,
  enterprise: LayoutDashboard,
  commerce: ShoppingCart,
  edtech: GraduationCap,
  logistics: Truck,
  media: Clapperboard,
};

export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = ICONS[industry.icon];
  const proven = industry.status === "proven";

  return (
    <motion.div
      variants={staggerItem}
      className="flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--border-light)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--accent-bright)]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-muted)]">
          <span
            className={proven ? "h-1.5 w-1.5 rounded-full bg-[var(--success)]" : "h-1.5 w-1.5 rounded-full border border-[var(--text-muted)]"}
            aria-hidden
          />
          {proven ? "Shipped" : "Transferable"}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">{industry.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{industry.description}</p>
      <ul className="mt-4 space-y-1 border-t border-[var(--border)] pt-4">
        {industry.points.map((p) => (
          <li key={p} className="text-xs text-[var(--text-muted)]">
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
