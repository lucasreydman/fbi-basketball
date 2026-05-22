"use client";

import Link from "next/link";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { POINTS_PREVIEW, TRADE_PRESET } from "@/lib/data/rankings-preview";
import { TOOL_POINTS, TOOL_TRADE_CALC } from "@/lib/nav";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EditorialHeader, EditorialSection } from "./editorial-section";

const TIER_STYLES: Record<number, string> = {
  1: "text-accent border-accent/40",
  2: "text-hardwood border-hardwood/40",
  3: "text-ink-mute border-rule",
  4: "text-ink-dim border-rule-soft",
};

export function ToolsPreview() {
  return (
    <EditorialSection>
      <EditorialHeader
        number="§ 03"
        marker="Tools · Free"
        title={
          <>
            Built by people who <span className="italic text-accent">win their own leagues.</span>
          </>
        }
        lede="ROS Points + 9-cat rankings and a live-linked trade calculator. The premium-curve math is anchored to the FBI board and re-snaps to every publish."
        cta={{ href: "/tools", label: "Open the toolkit" }}
      />

      <div className="mt-16 grid gap-px overflow-hidden border border-rule bg-rule lg:grid-cols-12">
        {/* Rankings — top 12 preview */}
        <Reveal as="div" className="lg:col-span-7 bg-canvas-soft p-7 md:p-9">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="label label-accent">ROS Rankings · Points</div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                Published 2026-05-21 · v1 · 60 players · ROS values
              </div>
            </div>
            <Link
              href={TOOL_POINTS}
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-accent"
            >
              Full board <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="mt-7 overflow-hidden border border-rule">
            <div className="grid grid-cols-[28px_1fr_56px_56px_64px] gap-3 border-b border-rule bg-canvas px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim">
              <span>T</span>
              <span>Player · #</span>
              <span className="text-right">Age</span>
              <span className="text-right">Δ</span>
              <span className="text-right">Value</span>
            </div>
            <Stagger as="ul" gap={0.03} start={0.02}>
              {POINTS_PREVIEW.map((row) => {
                const up = row.change > 0;
                const down = row.change < 0;
                return (
                  <StaggerItem
                    key={row.rank}
                    as="li"
                    y={6}
                    className="grid grid-cols-[28px_1fr_56px_56px_64px] items-center gap-3 border-b border-rule px-4 py-2.5 text-[13.5px] last:border-b-0 hover:bg-canvas transition-colors"
                  >
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center border ${TIER_STYLES[row.tier]} font-mono text-[9px] font-semibold`}
                    >
                      {row.tier}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-ink">
                        <span className="mr-2 font-mono text-[11px] tabular text-ink-dim">
                          {String(row.rank).padStart(2, "0")}
                        </span>
                        {row.name}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                        {row.team} · {row.pos}
                      </span>
                    </span>
                    <span className="text-right tabular font-mono text-[12px] text-ink-mute">
                      {row.age.toFixed(1)}
                    </span>
                    <span
                      className={`text-right tabular font-mono text-[11px] inline-flex items-center justify-end gap-1 ${
                        up ? "text-positive" : down ? "text-negative" : "text-ink-dim"
                      }`}
                    >
                      {up && <TrendingUp size={11} />}
                      {down && <TrendingDown size={11} />}
                      {row.change === 0 ? "—" : Math.abs(row.change)}
                    </span>
                    <span
                      className="text-right tabular font-display text-[16px] text-accent"
                      style={{ fontVariationSettings: '"opsz" 36' }}
                    >
                      {row.value}
                    </span>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>

        {/* Trade calc preset */}
        <Reveal delay={0.1} as="div" className="lg:col-span-5 bg-canvas-soft p-7 md:p-9">
          <div className="label label-accent">Trade Calculator</div>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Premium-curve math · Anchored to v37
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
            <Side label="You give" items={TRADE_PRESET.give} total={TRADE_PRESET.giveValue} />
            <div className="flex items-center justify-center font-display text-[36px] text-ink-dim italic">
              ⇄
            </div>
            <Side label="You get" items={TRADE_PRESET.get} total={TRADE_PRESET.getValue} />
          </div>

          <div className="mt-7 border border-accent/30 bg-[var(--accent-soft-bg)] p-6">
            <div className="label label-accent">Verdict</div>
            <p className="mt-3 text-[15.5px] leading-[1.55] text-ink">
              <span className="font-display italic text-accent-bright">Slight edge to the receiving side</span>{" "}
              — you&apos;re selling a premium ceiling for a flat younger anchor and protecting your asset base.
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-accent/30 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              <span>Gap</span>
              <span className="tabular">+{(TRADE_PRESET.giveValue - TRADE_PRESET.getValue).toFixed(0)} you give</span>
            </div>
          </div>

          <Link
            href={TOOL_TRADE_CALC}
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 bg-accent py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
          >
            Run your own trade
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
        Free for the community · ROS-anchored · Snaps on every publish
      </p>
    </EditorialSection>
  );
}

function Side({
  label,
  items,
  total,
}: {
  label: string;
  items: string[];
  total: number;
}) {
  return (
    <div className="flex flex-col border border-rule bg-canvas p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">{label}</div>
      <ul className="mt-3 flex-1 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-[13.5px] text-ink leading-snug">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
        <span>Total</span>
        <span className="tabular font-display text-[17px] text-accent" style={{ fontVariationSettings: '"opsz" 36' }}>
          {total.toFixed(0)}
        </span>
      </div>
    </div>
  );
}
