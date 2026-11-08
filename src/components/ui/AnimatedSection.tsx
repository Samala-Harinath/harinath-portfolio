"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";

/* ══════════════════════════════════════════════════════════════
   Shared motion language.
   One easing curve + one timing scale across every section so the
   whole page feels like a single, deliberate system.
══════════════════════════════════════════════════════════════ */

/** Signature curve — a soft "expo out". Confident start, long settle. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Secondary curve for small, snappy UI reactions (hover / tap). */
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.85,
} as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.6,
};

/** Hover preset used by every card on the site. */
export const cardHover = {
  whileHover: { y: -6, scale: 1.015 },
  whileTap: { scale: 0.99 },
  transition: SPRING,
};

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** Travel distance in px. */
  distance?: number;
  /** Adds a depth cue on entrance. */
  scale?: boolean;
  /** Adds a focus-pull blur on entrance. */
  blur?: boolean;
  as?: "div" | "section" | "article" | "li" | "header";
}

/**
 * Scroll-triggered reveal. Fires once, slightly before the element is
 * fully in view so motion reads as anticipation rather than lag.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 26,
  scale = false,
  blur = true,
  as = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -8% 0px" });
  const reduce = useReducedMotion();

  const Tag = motion[as] as typeof motion.div;
  const offset = reduce ? { x: 0, y: 0 } : offsetFor(direction, distance);

  return (
    <Tag
      ref={ref}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: !reduce && scale ? 0.97 : 1,
        filter: !reduce && blur ? "blur(8px)" : "blur(0px)",
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: reduce ? 0.01 : DURATION.slow, delay, ease: EASE }}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </Tag>
  );
}

/**
 * Orchestrates `staggerItem` children. Children animate in sequence
 * once the container enters the viewport.
 */
export function StaggerContainer({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -6% 0px" });
  const reduce = useReducedMotion();

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

const itemTransition: Transition = { duration: DURATION.base, ease: EASE };

/** Default child variant: lift + focus-pull. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: itemTransition },
};

/** Child variant for horizontal lists / timelines. */
export const staggerItemX: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: itemTransition },
};

/** Child variant for chips, tags and badges. */
export const staggerChip: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE },
  },
};

/**
 * Animated hairline divider that draws itself when scrolled into view.
 */
export function RevealLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: DURATION.slow, ease: EASE }}
      className={className}
      style={{ transformOrigin: "left center" }}
    />
  );
}

/**
 * Per-word headline reveal. Each word rises independently.
 */
export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
