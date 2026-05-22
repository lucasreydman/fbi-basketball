import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { getPublicSupabase } from "@/lib/supabase";
import { TierChip, ChangeIndicator } from "@/components/tool/tier-chip";
import { LastUpdatedChip } from "@/components/tool/last-updated";

export const metadata = {
  title: "ROS Points Rankings",
  description: "Rest-of-season points rankings for redraft fantasy basketball — anchored to the FBI board.",
};

export const revalidate = 60;

type Row = {
  rank: number;
  tier: number | null;
  value: number | null;
  change_n: number | null;
  players: { full_name: string; team: string | null; position: string | null; age: number | null }
    | { full_name: string; team: string | null; position: string | null; age: number | null }[]
    | null;
};

export default async function PointsRankingsPage() {
  const sb = getPublicSupabase();
  const { data: list } = await sb
    .from("ranked_lists")
    .select("id, version, published_at, notes")
    .eq("surface", "points")
    .eq("status", "published")
    .maybeSingle();

  const { data: entries } = await sb
    .from("ranking_entries")
    .select("rank, tier, value, change_n, players(full_name, team, position, age)")
    .eq("list_id", list?.id ?? "00000000-0000-0000-0000-000000000000")
    .order("rank", { ascending: true });

  const rows = (entries ?? []) as unknown as Row[];

  return (
    <>
      <PageHeader
        number="§ 03·1"
        marker="Tool · Points"
        title={
          <>
            ROS Points <span className="italic text-accent">Rankings</span>
          </>
        }
        lede={list?.notes ?? "Rest-of-season points rankings. Anchored to the FBI board, updated weekly."}
      />

      <Container size="2xl" className="py-16 md:py-20">
        <div className="mb-8 flex items-center justify-between border-b border-rule pb-5">
          <div className="flex items-baseline gap-4">
            <span className="label">Published</span>
            {list && <LastUpdatedChip version={list.version} publishedAt={list.published_at} />}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            {rows.length} players
          </span>
        </div>

        <div className="overflow-x-auto border border-rule">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-rule bg-canvas">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">#</th>
                <th className="px-3 py-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Tier</th>
                <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Player</th>
                <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Team</th>
                <th className="px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Pos</th>
                <th className="px-3 py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Age</th>
                <th className="px-3 py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">Δ</th>
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
                    <td className="px-3 py-3 font-display text-[16px] text-ink">
                      {p?.full_name}
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                      {p?.team}
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                      {p?.position}
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-[12px] tabular text-ink-soft">
                      {p?.age?.toFixed(1) ?? "—"}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <ChangeIndicator delta={e.change_n ?? 0} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-display text-[18px] text-accent tabular" style={{ fontVariationSettings: '"opsz" 36' }}>
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
          Free for the community · Updated weekly by FBI
        </p>
      </Container>
    </>
  );
}
