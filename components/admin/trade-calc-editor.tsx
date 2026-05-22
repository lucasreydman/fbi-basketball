"use client";
import { useState, useTransition } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";
import {
  saveTradeValue, saveCurve, publishTradeCalcDraft, discardTradeCalcDraft,
} from "@/app/admin/actions/trade-calc";
import type { PremiumCurve } from "@/lib/data/types";

export interface ValueRow { player_id: number; full_name: string; team: string | null; value: number }

export function TradeCalcEditor({
  calcId, draftVersion, publishedVersion, initialValues, initialPremium,
}: {
  calcId: string; draftVersion: number; publishedVersion: number | null;
  initialValues: ValueRow[]; initialPremium: PremiumCurve;
}) {
  const [values, setValues] = useState<ValueRow[]>(initialValues);
  const [premium, setPremium] = useState<PremiumCurve>(initialPremium);
  const [notes, setNotes] = useState("");
  const [pending, startTransition] = useTransition();

  function updateValue(playerId: number, value: number) {
    setValues((prev) => prev.map((r) => (r.player_id === playerId ? { ...r, value } : r)));
    startTransition(() => saveTradeValue(calcId, playerId, value));
  }
  function updatePremium(key: keyof PremiumCurve, value: number) {
    const next = { ...premium, [key]: value };
    setPremium(next);
    startTransition(() => saveCurve(calcId, next));
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="overflow-hidden rounded-xl border border-accent/30 bg-accent-soft"
      >
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-2 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft-bg)]" />
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Working draft</div>
              <div className="font-display text-lg font-normal tracking-tight text-ink">
                v{draftVersion}
                {publishedVersion != null && <span className="ml-2 text-sm text-ink-mute">· live v{publishedVersion}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              type="button" whileTap={{ scale: 0.96 }} disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  try { await discardTradeCalcDraft(); toast("Draft discarded"); }
                  catch (e) { toast.error("Discard failed", { description: String(e) }); }
                })
              }
              className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-canvas px-3 py-1.5 text-xs uppercase tracking-wider text-ink-soft transition hover:border-ink-mute hover:text-ink disabled:opacity-50"
            >
              <Trash2 className="size-3.5" strokeWidth={2} />
              Discard
            </motion.button>
            <motion.button
              type="button" whileTap={{ scale: 0.96 }} disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  try {
                    await publishTradeCalcDraft(notes || null);
                    toast.success(`Published trade calc v${draftVersion}`, { description: notes || "Subscribers' calculator now reflects the new values." });
                    setNotes("");
                  } catch (e) { toast.error("Publish failed", { description: String(e) }); }
                })
              }
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium text-accent-ink transition hover:bg-accent-bright disabled:opacity-50"
            >
              <Check className="size-3.5" strokeWidth={2.5} />
              Publish update
            </motion.button>
          </div>
        </div>
        <div className="border-t border-accent/20 px-5 py-3">
          <input
            type="text" value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="What changed in this update? (Optional)"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
        </div>
      </motion.div>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          Player values
        </h2>
        <div className="overflow-hidden rounded-xl border border-rule bg-canvas-soft">
          {values.map((r, i) => (
            <div key={r.player_id} className={`flex items-center gap-3 border-b border-rule-soft px-4 py-2 transition-colors hover:bg-surface/60 last:border-b-0 ${i % 2 === 1 ? "bg-canvas-soft/40" : ""}`}>
              <span className="flex-1 font-display text-base font-normal tracking-tight text-ink">
                {r.full_name}
                {r.team && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-ink-dim">{r.team}</span>
                )}
              </span>
              <input
                type="number" defaultValue={r.value}
                onBlur={(e) => updateValue(r.player_id, Number(e.target.value))}
                className="w-24 rounded-md border border-rule bg-canvas px-2 py-1 text-right font-mono text-sm tabular-nums text-ink transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          Premium curve
        </h2>
        <div className="rounded-xl border border-rule bg-canvas-soft p-5">
          <CurveControls
            curve={premium}
            fields={[
              { key: "coef_a",    label: "Linear coef",    min: 0,    max: 0.3,   step: 0.01 },
              { key: "coef_b",    label: "Power-8 coef",   min: 0,    max: 0.2,   step: 0.01 },
              { key: "exponent",  label: "Exponent",       min: 1,    max: 12,    step: 1 },
              { key: "max_list",  label: "Max list",       min: 50,   max: 300,   step: 5 },
              { key: "max_trade", label: "Max trade",      min: 100,  max: 600,   step: 10 },
            ]}
            onChange={(k, v) => updatePremium(k as keyof PremiumCurve, v)}
          />
        </div>
      </section>
    </div>
  );
}

function CurveControls<T>({ curve, fields, onChange }: {
  curve: T;
  fields: Array<{ key: keyof T; label: string; min: number; max: number; step: number }>;
  onChange: (key: keyof T, value: number) => void;
}) {
  return (
    <div className="space-y-3">
      {fields.map((f) => (
        <div key={String(f.key)} className="grid grid-cols-[140px_1fr_72px] items-center gap-3">
          <label className="font-mono text-[11px] uppercase tracking-wider text-ink-mute">
            {f.label}
          </label>
          <input
            type="range" min={f.min} max={f.max} step={f.step}
            value={curve[f.key] as unknown as number}
            onChange={(e) => onChange(f.key, Number(e.target.value))}
            className="accent-accent"
          />
          <span className="text-right font-mono text-xs tabular-nums text-ink">
            {String(curve[f.key])}
          </span>
        </div>
      ))}
    </div>
  );
}
