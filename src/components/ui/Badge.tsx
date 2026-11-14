import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--card)] border border-[var(--border)] text-[var(--text-secondary)]",
  accent:
    "bg-[var(--accent-dim)] border border-[var(--accent)]/30 text-[var(--accent-bright)]",
  success:
    "bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)]",
  outline:
    "border border-[var(--border)] text-[var(--text-muted)]",
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
