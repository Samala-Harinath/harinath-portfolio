import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)]",
  accent:
    "bg-[var(--color-accent-dim)] border border-[var(--color-accent)]/30 text-[var(--color-accent)]",
  success:
    "bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 text-[var(--color-success)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-text-muted)]",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium font-mono tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
