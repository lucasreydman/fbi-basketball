import { getPublicSupabase } from "@/lib/supabase";
import { SubscribeToPublishes } from "@/components/realtime/subscribe-to-publishes";
import { VersionChip } from "@/components/shell/version-chip";
import { ToolPageHeader } from "@/components/shell/tool-page-header";
import { TierChip, PlayerCell } from "@/components/subscriber/ranking-row";

export const metadata = {
  title: "ROS 9-cat Rankings",
};

export const revalidate = 60;

const CATS = [
  { key: "fg_pct", label: "FG%" },
  { key: "ft_pct", label: "FT%" },
  { key: "fg3m",   label: "3PM" },
  { key: "pts",    label: "PTS" },
  { key: "reb",    label: "REB" },
  { key: "ast",    label: "AST" },
  { key: "stl",    label: "STL" },
  { key: "blk",    label: "BLK" },
  { key: "to",     label: "TO" },
] as const;

export default async function CatsRankingsPage() {
  const supabase = getPublicSupabase();
  const { data: list } = await supabase
    .from("ranked_lists").select("id, version, published_at, notes")
    .eq("surface", "cats").eq("status", "published").maybeSingle();
  const { data: entries } = await supabase
    .from("ranking_entries")
    .select("rank, tier, value, extras, player_id, players(full_name, team, position)")
    .eq("list_id", list?.id ?? "00000000-0000-0000-0000-000000000000")
    .order("rank", { ascending: true });

  const rows = ((entries ?? []) as unknown as Array<{
    rank: number; tier: number | null; value: number | null; player_id: number;
    extras: Record<string, number | null> | null;
    players: { full_name: string; team: string | null } | { full_name: string; team: string | null }[] | null;
  }>);

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-12">
      <ToolPageHeader
        eyebrow="Rankings"
        title="9-cat"
        subtitle={list?.notes ?? undefined}
        rightSlot={
          list && (
            <VersionChip version={list.version} publishedAt={list.published_at ? new Date(list.published_at) : undefined} />
          )
        }
      />
      <SubscribeToPublishes surface="cats" />

      <div className="overflow-x-auto rounded-xl border border-rule bg-canvas-soft">
        <table className="w-full text-sm">
          <thead className="border-b border-rule bg-surface/40 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            <tr>
              <th className="px-4 py-3 text-right font-medium">#</th>
              <th className="py-3 font-medium">Player</th>
              <th className="py-3 text-center font-medium">T</th>
              {CATS.map((c) => (
                <th key={c.key} className="px-2 py-3 text-right font-medium">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((e, i) => {
              const p = Array.isArray(e.players) ? e.players[0] : e.players;
              return (
                <tr
                  key={e.rank}
                  className={`border-b border-rule-soft transition-colors hover:bg-surface/60 last:border-b-0 ${i % 2 === 1 ? "bg-canvas-soft/40" : ""}`}
                >
                  <td className="px-4 py-2.5 text-right font-mono text-xs tabular-nums text-ink-mute">
                    {e.rank}
                  </td>
                  <td className="py-2.5">
                    <PlayerCell id={e.player_id} name={p?.full_name ?? ""} team={p?.team ?? null} />
                  </td>
                  <td className="py-2.5 text-center">
                    <TierChip tier={e.tier} />
                  </td>
                  {CATS.map((c) => (
                    <td key={c.key} className="px-2 py-2.5 text-right font-mono text-xs tabular-nums text-ink-soft">
                      {e.extras?.[c.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
