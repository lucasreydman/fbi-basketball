import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { stack: "gap-2", main: "text-[14px]", sub: "text-[8px]", dot: "h-2 w-2" },
    md: { stack: "gap-2.5", main: "text-[18px]", sub: "text-[9px]", dot: "h-2.5 w-2.5" },
    lg: { stack: "gap-4", main: "text-[28px]", sub: "text-[11px]", dot: "h-4 w-4" },
  }[size];

  return (
    <div className={cn("flex items-center", sizes.stack, className)}>
      <div
        className={cn(
          "shrink-0 rounded-full bg-orange",
          sizes.dot,
        )}
        aria-hidden
      />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-medium uppercase tracking-[0.18em] text-bone",
            sizes.main,
          )}
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          FBI
        </span>
        <span
          className={cn(
            "mt-1 font-mono uppercase tracking-[0.32em] text-ash",
            sizes.sub,
          )}
        >
          Fantasy Basketball Intl.
        </span>
      </div>
    </div>
  );
}
