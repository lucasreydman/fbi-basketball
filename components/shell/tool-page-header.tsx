interface ToolPageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

// Mirrors the all-access PageHeader. The site's main PageHeader (used elsewhere)
// is more elaborate; this one is purpose-built for the deep tool / admin pages.
export function ToolPageHeader({ eyebrow, title, subtitle, rightSlot }: ToolPageHeaderProps) {
  return (
    <header className="mb-10 flex items-end justify-between gap-6 border-b border-rule pb-6">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light leading-[0.95] tracking-[-0.04em]">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-xl text-sm text-ink-mute">{subtitle}</p>}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </header>
  );
}
