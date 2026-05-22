interface VersionChipProps {
  version: number;
  publishedAt?: Date;
  className?: string;
}

export function VersionChip({ version, publishedAt, className = "" }: VersionChipProps) {
  const rel = publishedAt ? relativeAgo(publishedAt) : "unpublished";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border border-rule bg-canvas-soft px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft ${className}`}
    >
      <span className="inline-block size-1.5 rounded-full bg-accent" />
      v{version}
      <span className="text-ink-dim">·</span>
      <span className="text-ink-mute normal-case tracking-normal">{rel}</span>
    </span>
  );
}

function relativeAgo(d: Date): string {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86_400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86_400)}d ago`;
}
