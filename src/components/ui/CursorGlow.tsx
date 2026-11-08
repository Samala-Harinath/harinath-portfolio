"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Very high damping = almost no lag, smooth tracking, no oscillation
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30, mass: 0.3 });

  useEffect(() => {
    // Skip on reduced motion or touch-only devices
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    )
      return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[5] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 440,
        height: 440,
        background:
          "radial-gradient(circle, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 45%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
