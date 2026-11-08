"use client";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 rounded-xl border border-[var(--border-light)] bg-[var(--card)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-bright)] hover:border-[var(--accent-bright)] transition-colors overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            <Sun className="w-4 h-4" aria-hidden />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            <Moon className="w-4 h-4" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
