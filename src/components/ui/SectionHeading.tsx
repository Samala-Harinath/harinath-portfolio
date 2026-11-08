import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-xs tracking-widest uppercase text-(--color-accent)">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-(--color-text-primary) md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-(--color-text-secondary) leading-relaxed text-base md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
