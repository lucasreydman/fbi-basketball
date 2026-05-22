"use client";
import { useState, useTransition } from "react";
import {
  DndContext, closestCenter, type DragEndEvent, KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "motion/react";
import { GripVertical } from "lucide-react";
import { saveDraftOrder, saveEntryValue, saveEntryExtra } from "@/app/admin/actions/ranked-lists";

export interface ExtraColumn {
  key: string;
  label: string;
  width?: string;
}

export interface EditorEntry {
  player_id: number;
  full_name: string;
  team: string | null;
  rank: number;
  tier: number | null;
  value: number | null;
  extras: Record<string, number | null>;
}

const TIER_RING: Record<number, string> = {
  1: "ring-tier-1/70 text-tier-1",
  2: "ring-tier-2/70 text-tier-2",
  3: "ring-tier-3/70 text-tier-3",
  4: "ring-tier-4/70 text-tier-4",
};

export function RankedListEditor({
  listId,
  initial,
  columns = [],
}: {
  listId: string;
  initial: EditorEntry[];
  columns?: ExtraColumn[];
}) {
  const [entries, setEntries] = useState<EditorEntry[]>(initial);
  const [pending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = entries.findIndex((x) => x.player_id === active.id);
    const newIndex = entries.findIndex((x) => x.player_id === over.id);
    const next = arrayMove(entries, oldIndex, newIndex).map((e, i) => ({ ...e, rank: i + 1 }));
    setEntries(next);
    startTransition(() => {
      saveDraftOrder(listId, next.map((e) => ({
        player_id: e.player_id, rank: e.rank, tier: e.tier, value: e.value, extras: e.extras,
      })));
    });
  }

  function setValue(playerId: number, value: number) {
    setEntries((prev) => prev.map((e) => (e.player_id === playerId ? { ...e, value } : e)));
    startTransition(() => saveEntryValue(listId, playerId, value));
  }

  function setExtra(playerId: number, key: string, value: number) {
    setEntries((prev) => prev.map((e) =>
      e.player_id === playerId ? { ...e, extras: { ...e.extras, [key]: value } } : e,
    ));
    startTransition(() => saveEntryExtra(listId, playerId, key, value));
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-rule bg-canvas-soft">
      <div className="flex items-center gap-3 border-b border-rule bg-surface/60 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
        <span className="w-5" />
        <span className="w-8 text-right">#</span>
        <span className="flex-1 pl-3">Player</span>
        <span className="w-8 text-center">Tier</span>
        <span className="w-20 text-right pr-2">Value</span>
        {columns.map((c) => (
          <span key={c.key} className="text-right pr-1.5" style={{ width: c.width ?? "60px" }}>
            {c.label}
          </span>
        ))}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={entries.map((e) => e.player_id)} strategy={verticalListSortingStrategy}>
          {entries.map((e) => (
            <SortableRow
              key={e.player_id}
              entry={e}
              columns={columns}
              onValueChange={(v) => setValue(e.player_id, v)}
              onExtraChange={(k, v) => setExtra(e.player_id, k, v)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <AnimatePresence>
        {pending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-rule bg-canvas px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-mute"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Saving
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SortableRow({
  entry, columns, onValueChange, onExtraChange,
}: {
  entry: EditorEntry;
  columns: ExtraColumn[];
  onValueChange: (v: number) => void;
  onExtraChange: (key: string, v: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entry.player_id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : "auto",
  };
  const tierClass = entry.tier ? TIER_RING[entry.tier] ?? "" : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 border-b border-rule-soft px-3 py-2.5 transition-colors hover:bg-surface/60 ${isDragging ? "bg-surface shadow-lg shadow-black/40" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="flex size-5 shrink-0 cursor-grab items-center justify-center rounded text-ink-dim transition hover:bg-canvas hover:text-ink-soft active:cursor-grabbing"
        aria-label="Drag to reorder"
        type="button"
      >
        <GripVertical className="size-4" strokeWidth={2} />
      </button>
      <span className="w-8 text-right font-mono text-xs tabular-nums text-ink-mute">{entry.rank}</span>
      <span className="flex-1 pl-3 font-display text-base font-normal tracking-tight text-ink">
        {entry.full_name}
        {entry.team && (
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-ink-dim">
            {entry.team}
          </span>
        )}
      </span>
      <span className="w-8 text-center">
        <span
          className={`inline-flex size-6 items-center justify-center rounded-md font-mono text-[11px] font-medium ring-1 ${tierClass || "ring-rule text-ink-mute"}`}
        >
          {entry.tier ?? "—"}
        </span>
      </span>
      <input
        type="number"
        defaultValue={entry.value ?? 0}
        onBlur={(e) => onValueChange(Number(e.target.value))}
        className="w-20 rounded-md border border-rule bg-canvas px-2 py-1 text-right font-mono text-sm tabular-nums text-ink transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
      />
      {columns.map((c) => (
        <input
          key={c.key}
          type="number"
          step="any"
          defaultValue={(entry.extras?.[c.key] ?? 0) as number}
          onBlur={(e) => onExtraChange(c.key, Number(e.target.value))}
          className="rounded-md border border-rule-soft bg-canvas px-1.5 py-1 text-right font-mono text-[11px] tabular-nums text-ink-soft transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
          style={{ width: c.width ?? "60px" }}
        />
      ))}
    </div>
  );
}
