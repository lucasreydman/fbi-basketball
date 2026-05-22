"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { sumRaw, sumAdjusted, verdict } from "@/lib/data/trade-math";
import type { PremiumCurve } from "@/lib/data/types";

export interface Asset {
  id: number;
  label: string;
  sub: string;
  value: number;
}

export function TradeCalculator({
  assets,
  premium,
  calcVersion,
  pointsVersion,
  publishedAt,
}: {
  assets: Asset[];
  premium: PremiumCurve;
  calcVersion: number;
  pointsVersion: number;
  publishedAt: string | null;
}) {
  const [give, setGive] = useState<Asset[]>([]);
  const [get, setGet] = useState<Asset[]>([]);

  const rawGive = useMemo(() => sumRaw(give.map((a) => a.value)), [give]);
  const rawGet  = useMemo(() => sumRaw(get.map((a) => a.value)), [get]);
  const adjGive = useMemo(() => sumAdjusted(give.map((a) => a.value), premium), [give, premium]);
  const adjGet  = useMemo(() => sumAdjusted(get.map((a) => a.value), premium), [get, premium]);
  const v = useMemo(() => verdict(adjGive, adjGet), [adjGive, adjGet]);

  return (
    <div>
      <div className="grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-[1fr_auto_1fr]">
        <Side title="You give" assets={give} setAssets={setGive} pool={assets} raw={rawGive} adj={adjGive} />
        <div className="hidden items-center justify-center bg-canvas-soft px-4 md:flex">
          <div className="font-display text-[36px] italic text-ink-dim">⇄</div>
        </div>
        <Side title="You get" assets={get} setAssets={setGet} pool={assets} raw={rawGet} adj={adjGet} />
      </div>

      <Verdict adjGive={adjGive} adjGet={adjGet} v={v} />

      <footer className="mt-6 flex flex-col gap-3 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          <span className="text-ink-dim">Anchored to</span>
          <span className="inline-flex items-center gap-1.5 border border-rule px-1.5 py-0.5 text-ink-soft">
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            Points v{pointsVersion}
          </span>
          <span className="inline-flex items-center gap-1.5 border border-rule px-1.5 py-0.5 text-ink-soft">
            <span aria-hidden className="size-1 rounded-full bg-accent" />
            Trade v{calcVersion}
          </span>
          {publishedAt && (
            <span className="text-ink-dim normal-case tracking-[0.06em]">
              · last published {new Date(publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
          <motion.span
            className="size-1.5 rounded-full bg-positive"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Snaps on every publish
        </span>
      </footer>
    </div>
  );
}

function Verdict({
  adjGive,
  adjGet,
  v,
}: {
  adjGive: number;
  adjGet: number;
  v: { status: "fair" | "underpaying" | "overpaying"; variance: number; message: string };
}) {
  const diff = Math.round(Math.abs(adjGet - adjGive));
  const palette =
    v.status === "fair"
      ? "border-positive/40"
      : v.status === "underpaying"
        ? "border-accent/40 bg-[var(--accent-soft-bg)]"
        : "border-negative/40";
  const tone =
    v.status === "fair" ? "text-positive" : v.status === "underpaying" ? "text-accent" : "text-negative";
  const label =
    v.status === "fair"
      ? "Even trade"
      : v.status === "underpaying"
        ? "You come out ahead"
        : "You overpay";

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`mt-6 border p-6 ${palette}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone}`}>Verdict</div>
          <div className="mt-2 display-3 text-ink">
            <span className={tone}>{label}</span>
          </div>
        </div>
        {v.status !== "fair" && (adjGive > 0 || adjGet > 0) && (
          <div className="text-right">
            <div
              className="font-display text-[28px] tabular text-ink"
              style={{ fontVariationSettings: '"opsz" 48' }}
            >
              {diff.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
              {Math.round(v.variance * 100)}% gap
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-soft">{v.message}</p>
    </motion.div>
  );
}

function Side({
  title,
  assets,
  setAssets,
  pool,
  raw,
  adj,
}: {
  title: string;
  assets: Asset[];
  setAssets: (a: Asset[]) => void;
  pool: Asset[];
  raw: number;
  adj: number;
}) {
  const [query, setQuery] = useState("");
  const matches =
    query.length === 0
      ? []
      : pool
          .filter((a) => !assets.find((x) => x.id === a.id))
          .filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 6);

  return (
    <div className="bg-canvas-soft p-6 md:p-8">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="label label-accent">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
          {assets.length} {assets.length === 1 ? "asset" : "assets"}
        </span>
      </div>

      <div className="mb-3 flex min-h-[80px] flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {assets.map((a, i) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="group flex items-center justify-between border border-rule bg-canvas px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-[15px] text-ink">{a.label}</div>
                {a.sub && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                    {a.sub}
                  </div>
                )}
              </div>
              <div className="ml-3 flex items-center gap-2">
                <span
                  className="font-display text-[16px] tabular text-accent"
                  style={{ fontVariationSettings: '"opsz" 36' }}
                >
                  {a.value}
                </span>
                <button
                  type="button"
                  onClick={() => setAssets(assets.filter((_, j) => j !== i))}
                  aria-label={`Remove ${a.label}`}
                  className="flex size-6 items-center justify-center text-ink-dim transition hover:bg-surface hover:text-ink"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {assets.length === 0 && (
          <div className="border border-dashed border-rule-soft px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            Empty — add a player below
          </div>
        )}
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Add a player..."
          className="w-full border border-rule bg-canvas px-3 py-2.5 font-sans text-[14px] text-ink placeholder:text-ink-dim transition focus:border-accent focus:outline-none"
        />
        <AnimatePresence>
          {matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden border border-rule bg-surface-2 shadow-[var(--shadow-lift)]"
            >
              {matches.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setAssets([...assets, m]);
                    setQuery("");
                  }}
                  className="flex w-full items-center justify-between border-b border-rule-soft px-3 py-2 text-left transition hover:bg-canvas-soft last:border-b-0"
                >
                  <span className="flex flex-col">
                    <span className="font-display text-[15px] text-ink">{m.label}</span>
                    {m.sub && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                        {m.sub}
                      </span>
                    )}
                  </span>
                  <span
                    className="font-display text-[15px] tabular text-accent"
                    style={{ fontVariationSettings: '"opsz" 36' }}
                  >
                    {m.value}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <dl className="space-y-1.5 border-t border-rule pt-3">
        <div className="flex items-baseline justify-between">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Raw</dt>
          <dd className="font-mono text-[12px] tabular text-ink-soft">{Math.round(raw).toLocaleString()}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">Premium-adj</dt>
          <dd className="font-display text-[20px] tabular text-ink" style={{ fontVariationSettings: '"opsz" 36' }}>
            {Math.round(adj).toLocaleString()}
          </dd>
        </div>
      </dl>
    </div>
  );
}
