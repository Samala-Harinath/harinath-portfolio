import { skillCategories } from "@/data/skills";

const items = Array.from(new Set(skillCategories.flatMap((c) => c.skills)));

/** Infinite, hover-pausable strip of technologies. Pure CSS animation. */
export function TechMarquee() {
  return (
    <div className="border-y border-[var(--border)] bg-[var(--surface)] py-4">
      <div className="marquee-mask overflow-hidden">
        <ul className="marquee-track" aria-label="Technologies">
          {[...items, ...items].map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= items.length}
              className="flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 text-sm font-medium text-[var(--text-muted)]"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-[var(--border-light)]" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
