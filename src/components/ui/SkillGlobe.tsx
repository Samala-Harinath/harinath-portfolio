"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SkillGlobeProps {
  skills: string[];
  className?: string;
}


/**
 * Interactive 3D tag sphere. Skills sit on a Fibonacci sphere and are
 * perspective-projected each frame. Drag to spin (with momentum); settles
 * back to a slow idle rotation. Text stays real DOM — crisp and accessible.
 * Pauses off-screen and respects reduced motion.
 */
export function SkillGlobe({ skills, className }: SkillGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = skills.length;

    const base = skills.map((_, i) => {
      const y = 1 - (i / Math.max(n - 1, 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    const idle = reduce ? 0 : 0.0035;
    let radius = 160;
    let rotX = 0.35;
    let rotY = 0;
    let velX = 0;
    let velY = idle;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let frame = 0;
    let onScreen = true;

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      radius = Math.min(width, height) * 0.38;
    };

    const render = () => {
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const depth = 2.4;
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const p = base[i];
        const x1 = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const scale = depth / (depth - z2);
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius * scale}px, ${y2 * radius * scale}px, 0) scale(${scale})`;
        el.style.opacity = (0.25 + ((z2 + 1) / 2) * 0.75).toFixed(3);
        el.style.zIndex = String(Math.round((z2 + 1) * 100));
        el.style.filter = z2 < -0.35 ? `blur(${((-z2 - 0.35) * 2).toFixed(2)}px)` : "none";
      }
    };

    const step = () => {
      rotY += velY;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + velX));
      render();
    };

    const tick = () => {
      if (!dragging) {
        velY += (idle - velY) * 0.02;
        velX += (0 - velX) * 0.04;
      }
      step();
      if (onScreen) frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      wrap.setPointerCapture(e.pointerId);
      wrap.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.006;
      velX = (e.clientY - lastY) * 0.006;
      lastX = e.clientX;
      lastY = e.clientY;
      if (reduce) step();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (reduce) {
        velX = 0;
        velY = 0;
      }
      wrap.style.cursor = "grab";
      if (wrap.hasPointerCapture(e.pointerId)) wrap.releasePointerCapture(e.pointerId);
    };

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(wrap);
    resize();
    render();

    const io = new IntersectionObserver((entries) => {
      const visible = entries.some((en) => en.isIntersecting);
      if (visible === onScreen) return;
      onScreen = visible;
      cancelAnimationFrame(frame);
      if (onScreen && !reduce) frame = requestAnimationFrame(tick);
    });
    io.observe(wrap);

    if (!reduce) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
    };
  }, [skills]);

  return <SkillGlobeMarkup skills={skills} className={className} wrapRef={wrapRef} itemRefs={itemRefs} />;
}

function SkillGlobeMarkup({
  skills,
  className,
  wrapRef,
  itemRefs,
}: {
  skills: string[];
  className?: string;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLLIElement | null)[]>;
}) {
  return (
    <div
      ref={wrapRef}
      className={cn("relative aspect-square w-full touch-pan-y select-none", className)}
      style={{ cursor: "grab" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-[12%] rounded-full border border-[var(--border)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[12%] rounded-full border border-[var(--border)]"
        style={{ transform: "rotateX(72deg)" }}
      />

      <ul aria-label="Skills" className="absolute inset-0">
        {skills.map((skill, i) => (
          <li
            key={skill}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-md border border-[var(--border-light)] bg-[var(--card)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)] will-change-transform sm:text-xs"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

