import Link from "next/link";
import { POINTS_PREVIEW, TRADE_PRESET } from "@/lib/data/rankings-preview";
import { ALL_ACCESS_DEMO_URL } from "@/lib/nav";
import { SectionHeading } from "./section-heading";

const TIER_BG: Record<number, string> = {
  1: "bg-orange/20 text-orange",
  2: "bg-hardwood/15 text-hardwood",
  3: "bg-graphite-light text-ash",
  4: "bg-graphite text-ash-dim",
};

export function ToolsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Free tools"
        title={
          <>
            Built by people who <span className="italic text-orange">win their own leagues.</span>
          </>
        }
        description="Dynasty rankings (points, cats, rookies) and a live-linked trade calculator powered by Matt's published values. The premium-curve math is fit to his own numbers (R² 96–99%) and re-snaps to every publish."
        cta={{ href: "/tools", label: "Open the toolkit" }}
      />

      <div className="grid gap-px overflow-hidden border border-rule lg:grid-cols-12" style={{ borderRadius: 3 }}>
        {/* Rankings — top 12 preview */}
        <div className="bg-canvas-soft p-7 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="label-mono text-orange">Dynasty Rankings · Points</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim">
                Published 2026-05-18 · v37 · 538 players matched
              </div>
            </div>
            <Link
              href={`${ALL_ACCESS_DEMO_URL}/rankings/points`}
              target="_blank"
              rel="noreferrer"
              className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-orange sm:inline"
            >
              Full board →
            </Link>
          </div>

          <div className="mt-6 overflow-hidden border border-rule" style={{ borderRadius: 2 }}>
            <div className="grid grid-cols-[40px_minmax(0,1fr)_60px_60px_60px] gap-3 border-b border-rule bg-surface px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ash-dim">
              <span>#</span>
              <span>Player</span>
              <span className="text-right">Age</span>
              <span className="text-right">Δ</span>
              <span className="text-right">Value</span>
            </div>
            <ul>
              {POINTS_PREVIEW.map((row) => (
                <li
                  key={row.rank}
                  className="grid grid-cols-[40px_minmax(0,1fr)_60px_60px_60px] items-center gap-3 border-b border-rule px-3 py-2.5 text-[13px] last:border-b-0"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center font-mono text-[9px] font-bold ${TIER_BG[row.tier]}`}
                      style={{ borderRadius: 2 }}
                    >
                      {row.tier}
                    </span>
                    <span className="tabular font-mono text-[12px] text-ash">{row.rank}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-bone">{row.name}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ash-dim">
                      {row.team} · {row.pos}
                    </span>
                  </span>
                  <span className="text-right tabular font-mono text-[12px] text-ash">{row.age.toFixed(1)}</span>
                  <span className={`text-right tabular font-mono text-[12px] ${row.change > 0 ? "text-positive" : row.change < 0 ? "text-negative" : "text-ash-dim"}`}>
                    {row.change > 0 ? `▲ ${row.change}` : row.change < 0 ? `▼ ${-row.change}` : "◆"}
                  </span>
                  <span className="text-right tabular font-display text-[15px] text-orange">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trade calc preset */}
        <div className="bg-canvas-soft p-7 lg:col-span-5">
          <div className="label-mono text-orange">Trade Calculator</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim">
            Premium-curve math · Anchored to v37
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
            <Side label="You give" items={TRADE_PRESET.give} total={TRADE_PRESET.giveValue} />
            <div className="flex items-center justify-center font-display text-[28px] text-ash-dim">⇄</div>
            <Side label="You get" items={TRADE_PRESET.get} total={TRADE_PRESET.getValue} />
          </div>

          <div className="mt-6 border border-orange/40 bg-orange/8 p-5" style={{ borderRadius: 2 }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">Verdict</div>
            <p className="mt-2 text-[15px] leading-relaxed text-bone">
              <span className="font-display italic">Slight edge to the receiving side</span> —
              you&apos;re selling a premium ceiling for a flat younger anchor and protecting
              your asset base.
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-orange/30 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
              <span>Gap</span>
              <span className="tabular">+{(TRADE_PRESET.giveValue - TRADE_PRESET.getValue).toFixed(0)} you give</span>
            </div>
          </div>

          <Link
            href={`${ALL_ACCESS_DEMO_URL}/trade-calculator`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block bg-orange py-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
            style={{ borderRadius: 2 }}
          >
            Run your own trade →
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
        Powered by Matt&apos;s published rankings — fbi-basketball.com hosts the front, NBA Dynasty hosts the data
      </p>
    </section>
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
    <div className="flex flex-col border border-rule p-4" style={{ borderRadius: 2 }}>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">{label}</div>
      <ul className="mt-3 flex-1 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-[13.5px] text-bone">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim">
        <span>Total</span>
        <span className="tabular font-display text-[16px] text-orange">{total.toFixed(0)}</span>
      </div>
    </div>
  );
}
