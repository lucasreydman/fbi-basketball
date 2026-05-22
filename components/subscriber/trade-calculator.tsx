"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeftRight } from "lucide-react";
import { sumRaw, sumAdjusted, verdict } from "@/lib/data/trade-math";
import type { PremiumCurve } from "@/lib/data/types";

export interface Asset {
  kind: "player" | "pick";
  id: number;
  label: string;
  sub: string;
  value: number;
}

export function TradeCalculator({
  assets, premium, calcVersion, pointsVersion, publishedAt,
}: {
  assets: Asset[]; premium: PremiumCurve; calcVersion: number; pointsVersion: number; publishedAt: string | null;
}) {
  const [send, setSend] = useState<Asset[]>([]);
  const [get, setGet] = useState<Asset[]>([]);

  const rawSend = useMemo(() => sumRaw(send.map((a) => a.value)), [send]);
  const rawGet  = useMemo(() => sumRaw(get.map((a) => a.value)), [get]);
  const adjSend = useMemo(() => sumAdjusted(send.map((a) => a.value), premium), [send, premium]);
  const adjGet  = useMemo(() => sumAdjusted(get.map((a) => a.value), premium), [get, premium]);
  const v = useMemo(() => verdict(adjSend, adjGet), [adjSend, adjGet]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-[1fr_auto_1fr]">
        <Side title="You send" assets={send} setAssets={setSend} pool={assets} raw={rawSend} adj={adjSend} />
        <div className="flex items-center justify-center bg-canvas-soft px-3 py-4 sm:py-0 sm:px-1">
          <div className="flex size-9 items-center justify-center rounded-full border border-rule bg-canvas text-ink-mute">
            <ArrowLeftRight className="size-4" strokeWidth={2} />
          </div>
        </div>
        <Side title="You get" assets={get} setAssets={setGet} pool={assets} raw={rawGet} adj={adjGet} />
      </div>

      <Verdict adjSend={adjSend} adjGet={adjGet} v={v} />

      <footer className="flex flex-col gap-2 rounded-xl border border-rule-soft bg-canvas-soft/40 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-mute">
          <span className="font-mono uppercase tracking-[0.2em] text-ink-dim">Anchored to</span>
          <span className="inline-flex items-center gap-1 rounded-md border border-rule bg-canvas px-1.5 py-0.5 font-mono text-[11px] text-ink-soft">
            <span className="size-1 rounded-full bg-accent" />
            Points v{pointsVersion}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-rule bg-canvas px-1.5 py-0.5 font-mono text-[11px] text-ink-soft">
            <span className="size-1 rounded-full bg-accent" />
            Trade values v{calcVersion}
          </span>
          {publishedAt && (
            <span className="text-ink-dim">
              · last published {new Date(publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-ink-dim">
          <motion.span
            className="size-1.5 rounded-full bg-positive"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Auto-refreshes on publish
        </span>
      </footer>
    </div>
  );
}

function Verdict({ adjSend, adjGet, v }: { adjSend: number; adjGet: number; v: { status: "fair" | "underpaying" | "overpaying"; variance: number; message: string } }) {
  const diff = Math.round(Math.abs(adjGet - adjSend));
  const palette =
    v.status === "fair"
      ? "border-positive/40 bg-positive/[0.08] text-positive"
      : v.status === "underpaying"
        ? "border-tier-1/40 bg-tier-1/[0.08] text-tier-1"
        : "border-accent/40 bg-accent-soft text-accent";
  const label =
    v.status === "fair" ? "Fair value"
      : v.status === "underpaying" ? "You're underpaying"
        : "You're overpaying";

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className={`rounded-2xl border p-5 ${palette}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
            Verdict
          </div>
          <div className="mt-1 font-display text-2xl font-normal tracking-tight">
            {label}
          </div>
        </div>
        {v.status !== "fair" && (adjSend > 0 || adjGet > 0) && (
          <div className="text-right">
            <div className="font-mono text-2xl font-medium tabular-nums">{diff.toLocaleString()}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">
              {Math.round(v.variance * 100)}% variance
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-ink-soft">{v.message}</p>
    </motion.div>
  );
}

function Side({ title, assets, setAssets, pool, raw, adj }: {
  title: string; assets: Asset[]; setAssets: (a: Asset[]) => void; pool: Asset[]; raw: number; adj: number;
}) {
  const [query, setQuery] = useState("");
  const matches = query.length === 0 ? [] :
    pool.filter((a) => !assets.find((x) => x.kind === a.kind && x.id === a.id))
        .filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6);

  return (
    <div className="bg-canvas-soft p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">{title}</h3>
        <div className="font-mono text-[11px] text-ink-dim">{assets.length} {assets.length === 1 ? "asset" : "assets"}</div>
      </div>

      <div className="mb-3 flex min-h-[80px] flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {assets.map((a, i) => (
            <motion.div
              key={`${a.kind}-${a.id}`}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="group flex items-center justify-between rounded-md border border-rule bg-canvas px-3 py-2 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-base font-normal tracking-tight text-ink">
                  {a.label}
                </div>
                {a.sub && (
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                    {a.sub}
                  </div>
                )}
              </div>
              <div className="ml-3 flex items-center gap-2">
                <span className="font-mono text-sm tabular-nums text-ink">{a.value}</span>
                <button
                  type="button"
                  onClick={() => setAssets(assets.filter((_, j) => j !== i))}
                  aria-label={`Remove ${a.label}`}
                  className="flex size-6 items-center justify-center rounded text-ink-dim transition hover:bg-surface hover:text-ink"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {assets.length === 0 && (
          <div className="rounded-md border border-dashed border-rule-soft px-3 py-2 text-xs text-ink-dim">
            Empty
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Add player or pick…"
          className="w-full rounded-md border border-rule bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-dim transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
        />
        <AnimatePresence>
          {matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-rule bg-surface-2 shadow-2xl shadow-black/40"
            >
              {matches.map((m) => (
                <button
                  key={`${m.kind}-${m.id}`}
                  onClick={() => { setAssets([...assets, m]); setQuery(""); }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-canvas-soft"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-base font-normal tracking-tight text-ink">
                      {m.label}
                    </span>
                    {m.sub && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-dim">
                        {m.sub}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-ink-soft">{m.value}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <dl className="space-y-1.5 border-t border-rule-soft pt-3 font-mono text-[11px]">
        <div className="flex items-baseline justify-between">
          <dt className="uppercase tracking-wider text-ink-dim">Raw</dt>
          <dd className="tabular-nums text-ink-soft">{Math.round(raw).toLocaleString()}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="uppercase tracking-wider text-ink-mute">Premium-adjusted</dt>
          <dd className="tabular-nums text-ink">{Math.round(adj).toLocaleString()}</dd>
        </div>
      </dl>
    </div>
  );
}
