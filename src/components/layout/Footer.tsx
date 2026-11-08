import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";

const YEAR = 2026;

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer aria-label="Site footer" className="border-t border-(--border) bg-(--surface)">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Image
                src="/fevicon.png"
                alt="Harinath Samala"
                width={34}
                height={34}
                className="rounded-lg"
              />
            </div>
            <p className="text-sm text-[var(--text-muted)]">{personal.title}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--card)]"
            >
              <GithubIcon className="w-4 h-4" aria-hidden />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--card)]"
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="p-2 text-(--text-muted) hover:text-foreground transition-colors rounded-lg hover:bg-[var(--card)]"
            >
              <Mail className="w-4 h-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-(--border) flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--text-muted)]">
          <p>&copy; {YEAR} {personal.name}. All rights reserved.</p>
          {/* <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p> */}
        </div>
      </Container>
    </footer>
  );
}
