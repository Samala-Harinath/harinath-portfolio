import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

/** Small decorative "sheet of paper" thumbnail of the résumé. */
export function MiniResumePaper({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative w-44 rounded-lg border border-zinc-200 bg-white p-4 text-left shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <p className="text-[11px] font-bold leading-tight text-zinc-900">{personal.name}</p>
      <p className="mb-3 text-[8px] font-medium text-zinc-500">{personal.title}</p>
      <div className="mb-3 h-px w-full bg-zinc-200" />
      {[90, 75, 82, 60, 88, 70, 50].map((w, i) => (
        <div key={i} className="mb-1.5 h-1 rounded-full bg-zinc-200" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}
