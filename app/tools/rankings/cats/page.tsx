import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { getPublicSupabase } from "@/lib/supabase";
import { TierChip } from "@/components/tool/tier-chip";
import { LastUpdatedChip } from "@/components/tool/last-updated";

export const metadata = {
  title: "ROS 9-Cat Rankings",
  description: "Rest-of-season 9-category rankings with per-stat projections.",
};

export const revalidate = 60;

const CATS = [
  { key: "fg_pct", label: "FG%", format: (v: number) => v.toFixed(3).replace(/^0/, "") },
  { key: "ft_pct", label: "FT%", format: (v: number) => v.toFixed(3).replace(/^0/, "") },
  { key: "fg3m",   label: "3PM", format: (v: number) => v.toFixed(1) },
  { key: "pts",    label: "PTS", format: (v: number) => v.toFixed(1) },
  { key: "reb",    label: "REB", format: (v: number) => v.toFixed(1) },
  { key: "ast",    label: "AST", format: (v: number) => v.toFixed(1) },
  { key: "stl",    label: "STL", format: (v: number) => v.toFixed(1) },
  { key: "blk",    label: "BLK", format: (v: number) => v.toFixed(1) },
  { key: "to",     label: "TO",  format: (v: number) => v.toFixed(1) },
] as const;

type Row = {
  rank: number;
  tier: number | null;
  value: number | null;
  extras: Record<string, number | null> | null;
  players:
    | { full_name: string; team: string | null; position: string | null }
    | { full_name: string; team: string | null; position: string | null }[]
    | null;
};

export default async function CatsRankingsPage() {
  const sb = getPublicSupabase();
  const { data: list } = await sb
    .from("ranked_lists")
    .select("id, version, published_at, notes")
    .eq("surface", "cats")
    .eq("status", "published")
    .maybeSingle();

  const { data: entries } = await sb
    .from("ranking_entries")
    .select("rank, tier, value, extras, players(full_name, team, position)")
    .eq("list_id", list?.id ?? "00000000-0000-0000-0000-000000000000")
    .order("rank", { ascending: true });

  const rows = (entries ?? []) as unknown as Row[];

  return (
    <>
      <PageHeader
        number="§ 03·2"
        marker="Tool · 9-cat"
        title={
          <>
            ROS <span className="italic text-accent">9-cat</span> Rankings
          </>
        }
        lede={list?.notes ?? "Full 9-category board with per-stat ROS projections. Jokic country."}
      />

      <Container size="2xl" className="py-16 md:py-20">
        <div className="mb-8 flex items-center justify-between border-b border-rule pb-5">
          <div className="flex items-baseline gap-4">
            <span className="label">Published</span>
            {list && <LastUpdatedChip version={list.version} publishedAt={list.published_at} />}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            {rows.length} players · 9 categories
          </span>
        </div>

        <div className="overflow-x-auto border border-rule">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule bg-canvas">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">#</th>
                <th className="px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">T</th>
                <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Player</th>
                <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Tm</th>
                {CATS.map((c) => (
                  <th
                    key={c.key}
                    className="px-2 py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim"
                  >
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => {
                const p = Array.isArray(e.players) ? e.players[0] : e.players;
                return (
                  <tr key={e.rank} className="almanac-row">
                    <td className="px-4 py-3 font-mono text-[12px] tabular text-ink-mute">
                      {String(e.rank).padStart(2, "0")}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <TierChip tier={e.tier} />
                    </td>
                    <td className="px-3 py-3 font-display text-[15px] text-ink">{p?.full_name}</td>
                    <td className="px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                      {p?.team}
                    </td>
                    {CATS.map((c) => {
                      const v = e.extras?.[c.key];
                      return (
                        <td
                          key={c.key}
                          className="px-2 py-3 text-right font-mono text-[12px] tabular text-ink-soft"
                        >
                          {v == null ? "—" : c.format(Number(v))}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-right">
                      <span
                        className="font-display text-[16px] text-accent tabular"
                        style={{ fontVariationSettings: '"opsz" 36' }}
                      >
                        {e.value}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
          Punts-friendly · Stat-rate weighted · Updated weekly
        </p>
      </Container>
    </>
  );
}
