import Link from "next/link";

const TIER_CHIP: Record<number, string> = {
  1: "ring-tier-1/70 text-tier-1 bg-tier-1/10",
  2: "ring-tier-2/70 text-tier-2 bg-tier-2/10",
  3: "ring-tier-3/70 text-tier-3 bg-tier-3/10",
  4: "ring-tier-4/70 text-tier-4 bg-tier-4/10",
};

export function TierChip({ tier }: { tier: number | null }) {
  if (!tier) return <span className="text-ink-dim">—</span>;
  return (
    <span
      className={`inline-flex size-6 items-center justify-center rounded-md font-mono text-[11px] font-medium ring-1 ${TIER_CHIP[tier] ?? "ring-rule text-ink-mute"}`}
    >
      {tier}
    </span>
  );
}

export function PlayerCell({ id, name, team }: { id: number; name: string; team: string | null }) {
  return (
    <Link
      href={`/player/${id}`}
      className="group inline-flex items-baseline gap-2 transition-colors hover:text-accent"
    >
      <span className="font-display text-[15px] font-normal tracking-tight text-ink group-hover:text-accent">
        {name}
      </span>
      {team && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
          {team}
        </span>
      )}
    </Link>
  );
}
