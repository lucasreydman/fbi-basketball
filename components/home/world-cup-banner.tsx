"use client";

import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { ArrowUpRight } from "lucide-react";
import { WORLD_CUP_FORMAT } from "@/lib/data/world-cup";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function WorldCupBanner() {
  return (
    <section className="relative overflow-hidden border-y border-rule">
      <div className="hardwood absolute inset-0 opacity-40" aria-hidden />

      <Container size="2xl" className="relative py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left — editorial header + format */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-4 border-b border-rule pb-5">
              <span className="font-mono text-[11px] tabular text-accent">§ 01</span>
              <span className="label label-accent">FBI World Cup · 2026 · the centerpiece</span>
            </div>
            <Reveal>
              <h2 className="display-6 mt-8 max-w-3xl text-ink">
                Twelve teams. Five seasons of receipts.{" "}
                <span className="italic text-accent">One bracket.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
                The only competitive dynasty bracket that runs invite-only.
                Registration opens September — the waitlist is already 80 deep.
                If you placed top-4 in any FBI league last year, you have
                priority. This is the room.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-rule pt-7">
                <Spec label="Format" value={WORLD_CUP_FORMAT.format} />
                <Spec label="Teams" value={`${WORLD_CUP_FORMAT.teams}`} />
                <Spec label="Draft" value={WORLD_CUP_FORMAT.draftType} />
                <Spec label="Playoffs" value={WORLD_CUP_FORMAT.playoffs} />
                <Spec label="Season" value={WORLD_CUP_FORMAT.regularSeason} />
                <Spec label="Fees" value={WORLD_CUP_FORMAT.fees} />
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/world-cup"
                  className="group inline-flex h-12 items-center gap-2 bg-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
                >
                  World Cup HQ
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/world-cup#history"
                  className="inline-flex h-12 items-center gap-2 border border-rule px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                >
                  Past champions
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — defending champion plaque */}
          <Reveal delay={0.3} className="lg:col-span-5">
            <aside className="relative h-full border border-accent/30 bg-[var(--accent-soft-bg)] p-8 md:p-10">
              <div className="label label-accent">Defending Champion</div>

              <h3 className="display-5 mt-6 text-ink">Phoenix Pythons</h3>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                Mortimer Reeves · 2025
              </div>

              <p className="mt-7 text-[14.5px] leading-[1.65] text-ink-soft">
                Reeves rode an SGA / Wembanyama core to a four-round bracket
                sweep. The 1,247.2 in the final is the third-highest finals
                total in tournament history.
              </p>

              <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-accent/30 pt-7">
                <ChampStat label="Final score" value={1247.2} display="number" />
                <ChampStat label="Margin" value="+48.6" display="raw" />
                <ChampStat label="MVP" value="SGA" display="raw" />
              </dl>

              <div className="absolute -right-4 -top-4 hidden lg:block">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Inducted ’25
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim">
        {label}
      </dt>
      <dd className="mt-1.5 text-[14px] text-ink">{value}</dd>
    </div>
  );
}

function ChampStat({
  label,
  value,
  display,
}: {
  label: string;
  value: string | number;
  display: "number" | "raw";
}) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent/80">
        {label}
      </div>
      <div
        className="mt-2 font-display tabular text-ink"
        style={{
          fontSize: "1.5rem",
          lineHeight: 1,
          fontWeight: 400,
          fontVariationSettings: '"opsz" 48',
        }}
      >
        {display === "number" && typeof value === "number" ? (
          <NumberFlow value={value} format={{ minimumFractionDigits: 1 }} />
        ) : (
          value
        )}
      </div>
    </div>
  );
}
