import { getPublicSupabase } from "@/lib/supabase";
import { SubscribeToPublishes } from "@/components/realtime/subscribe-to-publishes";
import { VersionChip } from "@/components/shell/version-chip";
import { ToolPageHeader } from "@/components/shell/tool-page-header";
import { TierChip, PlayerCell } from "@/components/subscriber/ranking-row";

export const metadata = {
  title: "ROS Points Rankings",
  description: "Rest-of-season points rankings for redraft fantasy basketball — the FBI board.",
};

export const revalidate = 60;

export default async function PointsRankingsPage() {
  const supabase = getPublicSupabase();
  const { data: list } = await supabase
    .from("ranked_lists")
    .select("id, version, published_at, notes")
    .eq("surface", "points").eq("status", "published").maybeSingle();

  const { data: entries } = await supabase
    .from("ranking_entries")
    .select("rank, tier, value, player_id, players(full_name, team, position)")
    .eq("list_id", list?.id ?? "00000000-0000-0000-0000-000000000000")
    .order("rank", { ascending: true });

  const rows = ((entries ?? []) as unknown as Array<{
    rank: number; tier: number | null; value: number | null; player_id: number;
    players: { full_name: string; team: string | null; position: string | null } | { full_name: string; team: string | null; position: string | null }[] | null;
  }>);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <ToolPageHeader
        eyebrow="Rankings"
        title="Points"
        subtitle={list?.notes ?? undefined}
        rightSlot={
          list && (
            <VersionChip
              version={list.version}
              publishedAt={list.published_at ? new Date(list.published_at) : undefined}
            />
          )
        }
      />
      <SubscribeToPublishes surface="points" />

      <div className="overflow-hidden rounded-xl border border-rule bg-canvas-soft">
        <div className="flex items-center gap-4 border-b border-rule bg-surface/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          <span className="w-8 text-right">#</span>
          <span className="flex-1">Player</span>
          <span className="w-12">Pos</span>
          <span className="w-10 text-center">T</span>
          <span className="w-20 text-right">Value</span>
        </div>
        {rows.map((e, i) => {
          const p = Array.isArray(e.players) ? e.players[0] : e.players;
          return (
            <div
              key={e.rank}
              className={`flex items-center gap-4 border-b border-rule-soft px-4 py-2.5 transition-colors hover:bg-surface/60 last:border-b-0 ${i % 2 === 1 ? "bg-canvas-soft/40" : ""}`}
            >
              <span className="w-8 text-right font-mono text-xs tabular-nums text-ink-mute">
                {e.rank}
              </span>
              <span className="flex-1">
                <PlayerCell id={e.player_id} name={p?.full_name ?? ""} team={p?.team ?? null} />
              </span>
              <span className="w-12 text-xs uppercase tracking-wider text-ink-dim">
                {p?.position}
              </span>
              <span className="w-10 text-center">
                <TierChip tier={e.tier} />
              </span>
              <span className="w-20 text-right font-mono text-sm tabular-nums text-ink">
                {e.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
