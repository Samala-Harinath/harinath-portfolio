"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface AnimatedCounterProps {
  value: string; // e.g. "5.6", "250K", "3"
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function parseValue(v: string): { num: number; suffix: string } {
  const match = v.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: v };
  return { num: parseFloat(match[1]), suffix: match[2] ?? "" };
}

export function AnimatedCounter({ value, suffix = "", duration = 1800 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  const { num, suffix: valueSuffix } = parseValue(value);
  const finalSuffix = valueSuffix + suffix;

  useEffect(() => {
    if (!inView) return;
    const isDecimal = num % 1 !== 0;
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * num;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, num, duration]);

  return (
    <span ref={ref}>
      {display}{finalSuffix}
    </span>
  );
}
