import { cn } from "@/lib/utils";

const TIER_STYLES: Record<number, string> = {
  1: "text-accent border-accent/40 bg-[var(--accent-soft-bg)]",
  2: "text-hardwood border-hardwood/40",
  3: "text-ink-soft border-rule",
  4: "text-ink-mute border-rule",
  5: "text-ink-dim border-rule-soft",
  6: "text-ink-dim border-rule-soft",
};

export function TierChip({ tier, className }: { tier: number | null; className?: string }) {
  if (tier == null) return <span className="text-ink-dim">—</span>;
  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center border font-mono text-[10px] font-semibold tabular",
        TIER_STYLES[tier] ?? "text-ink-mute border-rule",
        className,
      )}
    >
      {tier}
    </span>
  );
}

export function ChangeIndicator({ delta }: { delta: number }) {
  if (delta === 0) return <span className="font-mono text-[11px] text-ink-dim">—</span>;
  const up = delta > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1 font-mono text-[11px] tabular",
        up ? "text-positive" : "text-negative",
      )}
    >
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {Math.abs(delta)}
    </span>
  );
}
