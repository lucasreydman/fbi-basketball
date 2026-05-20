import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Seal } from "@/components/ui/seal";

export function PageHeader({
  marker,
  number,
  title,
  lede,
}: {
  marker: string;
  number: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-rule">
      <div className="spotlight absolute inset-0" aria-hidden />
      <Container size="2xl" className="relative py-16 md:py-24">
        <div className="flex items-center justify-between border-b border-rule pb-5">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] tabular text-accent">{number}</span>
            <span className="label label-accent">{marker}</span>
          </div>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            FBI · Vol. 8
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <h1 className="display-6 max-w-3xl text-ink">{title}</h1>
            </Reveal>
            {lede && (
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.65] text-ink-soft">
                  {lede}
                </p>
              </Reveal>
            )}
          </div>
          <div className="hidden lg:flex items-center gap-4 self-end">
            <Seal size={56} className="opacity-90" />
          </div>
        </div>
      </Container>
    </header>
  );
}
