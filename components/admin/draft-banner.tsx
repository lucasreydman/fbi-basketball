"use client";
import { useState, useTransition } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";
import { publishDraft, discardDraft } from "@/app/admin/actions/ranked-lists";
import type { ListSurface } from "@/lib/data/types";

export function DraftBanner({
  surface,
  draftVersion,
  publishedVersion,
}: {
  surface: ListSurface;
  draftVersion: number;
  publishedVersion: number | null;
}) {
  const [notes, setNotes] = useState("");
  const [pending, startTransition] = useTransition();

  function handlePublish() {
    startTransition(async () => {
      try {
        await publishDraft(surface, notes || null);
        toast.success(`Published ${surface} v${draftVersion}`, {
          description: notes || "Subscribers' views are refreshing now.",
        });
        setNotes("");
      } catch (e) {
        toast.error("Publish failed", { description: String(e) });
      }
    });
  }

  function handleDiscard() {
    startTransition(async () => {
      try {
        await discardDraft(surface);
        toast("Draft discarded", { description: `${surface} draft removed.` });
      } catch (e) {
        toast.error("Discard failed", { description: String(e) });
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="mb-6 overflow-hidden rounded-xl border border-accent/30 bg-accent-soft"
    >
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-2 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft-bg)]" />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Working draft
            </div>
            <div className="font-display text-lg font-normal tracking-tight text-ink">
              v{draftVersion}
              {publishedVersion != null && (
                <span className="ml-2 text-sm text-ink-mute">
                  · live v{publishedVersion}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={handleDiscard}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-canvas px-3 py-1.5 text-xs uppercase tracking-wider text-ink-soft transition hover:border-ink-mute hover:text-ink disabled:opacity-50"
          >
            <Trash2 className="size-3.5" strokeWidth={2} />
            Discard
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={handlePublish}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium text-accent-ink transition hover:bg-accent-bright disabled:opacity-50"
          >
            <Check className="size-3.5" strokeWidth={2.5} />
            Publish update
          </motion.button>
        </div>
      </div>
      <div className="border-t border-accent/20 px-5 py-3">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What changed in this update? (Optional — shown in the subscriber updates log.)"
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
        />
      </div>
    </motion.div>
  );
}
