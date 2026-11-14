"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ResumeButton } from "@/components/resume/ResumeViewer";

const anchorLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const pageLinks = [
  { label: "Blog", href: "/blog" },
];

function NavLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/fevicon.png"
        alt=""
        width={32}
        height={32}
        className="rounded-lg"
        priority
      />
      <span className="hidden text-[15px] font-semibold tracking-tight text-[var(--text-primary)] lg:inline">
        Harinath Samala
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  // Scroll shadow — tracked on every page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking — home page only.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      const sections = ["about", "experience", "projects", "contact"];
      let found = false;
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          found = true;
          break;
        }
      }
      if (!found) setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Reset active section when leaving home — derive from pathname, no effect needed
  const displayActiveSection = isHome ? activeSection : "";

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll to section — works on homepage; if on another page, navigate home first then scroll
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const id = href.slice(1);

      if (isHome) {
        const el = document.getElementById(id);
        if (el) {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
        }
      } else {
        // Navigate to home with hash — Next.js router
        router.push(`/${href}`);
      }
    },
    [isHome, router]
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_var(--border),0_8px_24px_-16px_rgba(0,0,0,0.5)]"
        )}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
          <nav className="flex items-center justify-between h-16" aria-label="Main navigation">

            {/* Logo */}
            <Link href="/" aria-label="Harinath Samala home">
              <NavLogo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {anchorLinks.map((link) => {
                const isActive = displayActiveSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className={cn(
                      "relative px-2.5 lg:px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive
                        ? "text-[var(--accent-bright)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-bright)]"
                      />
                    )}
                  </a>
                );
              })}

              {pageLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-2.5 lg:px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive
                        ? "text-[var(--accent-bright)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-bright)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: theme toggle + resume */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <ResumeButton
                aria-label="View resume"
                className="btn-primary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden />
                Resume
              </ResumeButton>
            </div>

            {/* Mobile: theme + burger */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)] transition-colors"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-72 z-50 md:hidden bg-[var(--surface)] border-l border-[var(--border)] p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <NavLogo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {anchorLinks.map((link) => {
                  const isActive = displayActiveSection === link.href.slice(1);
                  return (
                    <a
                      key={link.href}
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className={cn(
                        "px-4 py-3.5 text-base font-medium rounded-xl transition-colors",
                        isActive
                          ? "text-[var(--accent-bright)] bg-[var(--accent-dim)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}

                {pageLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "px-4 py-3.5 text-base font-medium rounded-xl transition-colors",
                        isActive
                          ? "text-[var(--accent-bright)] bg-[var(--accent-dim)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <ResumeButton
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
              >
                <FileText className="w-4 h-4" aria-hidden /> View Resume
              </ResumeButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
