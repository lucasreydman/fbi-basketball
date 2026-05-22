import { getPublicSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ToolPageHeader } from "@/components/shell/tool-page-header";

export const revalidate = 60;

export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playerId = Number(id);
  if (!Number.isFinite(playerId)) notFound();

  const sb = getPublicSupabase();
  const { data: player } = await sb.from("players")
    .select("id, full_name, team, position, age").eq("id", playerId).maybeSingle();
  if (!player) notFound();

  const surfaces = ["points", "cats"] as const;
  const lists = await Promise.all(surfaces.map(async (s) => {
    const { data: list } = await sb.from("ranked_lists")
      .select("id, version").eq("surface", s).eq("status", "published").maybeSingle();
    if (!list) return { surface: s, rank: null, value: null };
    const { data: entry } = await sb.from("ranking_entries")
      .select("rank, value").eq("list_id", list.id).eq("player_id", playerId).maybeSingle();
    return { surface: s, rank: entry?.rank ?? null, value: entry?.value ?? null };
  }));

  const { data: calc } = await sb.from("trade_calc_versions").select("id").eq("status", "published").maybeSingle();
  const tradeVal = calc
    ? (await sb.from("trade_values").select("value").eq("calc_id", calc.id).eq("player_id", playerId).maybeSingle()).data
    : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <ToolPageHeader
        eyebrow={[player.team, player.position].filter(Boolean).join(" · ") + (player.age ? ` · age ${player.age}` : "")}
        title={player.full_name}
      />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {lists.map((l) => (
          <div key={l.surface} className="rounded-xl border border-rule bg-canvas-soft p-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              {l.surface}
            </div>
            <div className="mt-1 font-display text-3xl font-light tabular-nums text-ink">
              {l.rank == null ? "—" : `#${l.rank}`}
            </div>
            {l.value != null && (
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-dim">
                value <span className="tabular-nums text-ink-soft">{l.value}</span>
              </div>
            )}
          </div>
        ))}
        <div className="rounded-xl border border-accent/40 bg-accent-soft p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Trade value
          </div>
          <div className="mt-1 font-display text-3xl font-light tabular-nums text-ink">
            {tradeVal?.value ?? "—"}
          </div>
        </div>
      </section>
    </div>
  );
}
