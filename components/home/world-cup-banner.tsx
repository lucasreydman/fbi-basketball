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
                576 teams. 48 divisions.{" "}
                <span className="italic text-accent">One champion.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">
                The largest 9-cat re-draft tournament in the format. Three phases.
                Two re-drafts. One champion crowned across 48 divisions of 12 teams
                each. $21 to enter. ${WORLD_CUP_FORMAT.prizePool.toLocaleString()}+
                in prizes. Registration opens September.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-rule pt-7">
                <Spec label="Format" value={WORLD_CUP_FORMAT.format} />
                <Spec label="Per division" value={`${WORLD_CUP_FORMAT.teamsPerDivision} teams`} />
                <Spec label="Divisions" value={`${WORLD_CUP_FORMAT.divisions}`} />
                <Spec label="Phases" value={`${WORLD_CUP_FORMAT.phases} · ${WORLD_CUP_FORMAT.reDrafts} re-drafts`} />
                <Spec label="Entry" value={`$${WORLD_CUP_FORMAT.entryFee}`} />
                <Spec label="Prizes" value={`$${WORLD_CUP_FORMAT.prizePool.toLocaleString()}+`} />
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
                  href="/world-cup#format"
                  className="inline-flex h-12 items-center gap-2 border border-rule px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                >
                  How phases work
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — scale plaque */}
          <Reveal delay={0.3} className="lg:col-span-5">
            <aside className="relative h-full border border-accent/30 bg-[var(--accent-soft-bg)] p-8 md:p-10">
              <div className="label label-accent">Scale · 2026</div>

              <div className="mt-6">
                <BigStat value={576} suffix=" teams" />
                <div className="mt-7 grid grid-cols-2 gap-6 border-t border-accent/30 pt-7">
                  <ChampStat label="Divisions" value={48} display="number" />
                  <ChampStat label="Phases" value={3} display="number" />
                  <ChampStat label="Re-drafts" value={2} display="number" />
                  <ChampStat label="Champion" value="1" display="raw" />
                </div>
              </div>

              <div className="mt-9 border-t border-accent/30 pt-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
                  Prize pool
                </div>
                <BigStat value={11_500} prefix="$" suffix="+" />
              </div>

              <div className="absolute -right-4 -top-4 hidden lg:block">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  #FBIWorldCup
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
          <NumberFlow value={value} />
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function BigStat({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div
      className="mt-3 font-display tabular text-ink"
      style={{
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        lineHeight: 0.95,
        fontWeight: 400,
        fontVariationSettings: '"opsz" 96',
      }}
    >
      {prefix && <span className="text-accent">{prefix}</span>}
      <NumberFlow value={value} />
      {suffix && <span className="text-accent">{suffix}</span>}
    </div>
  );
}
