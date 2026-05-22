export function LastUpdatedChip({ version, publishedAt }: { version: number; publishedAt: string | null }) {
  const rel = publishedAt ? relativeAgo(new Date(publishedAt)) : "unpublished";
  return (
    <span className="inline-flex items-center gap-2 border border-rule px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      v{version}
      <span className="text-ink-dim">·</span>
      <span className="normal-case tracking-[0.05em] text-ink-soft">{rel}</span>
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
