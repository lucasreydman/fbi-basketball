import { getPublicSupabase } from "@/lib/supabase";
import { SubscribeToTradeCalc } from "@/components/realtime/subscribe-to-trade-calc";
import { TradeCalculator, type Asset } from "@/components/subscriber/trade-calculator";
import { ToolPageHeader } from "@/components/shell/tool-page-header";
import type { PremiumCurve } from "@/lib/data/types";

export const metadata = {
  title: "Trade Calculator",
  description: "Premium-curve trade math anchored to the latest FBI ROS Points rankings.",
};

export const revalidate = 60;

const FALLBACK_CURVE: PremiumCurve = {
  coef_a: 0.10,
  coef_b: 0.04,
  exponent: 8,
  max_list: 100,
  max_trade: 200,
};

export default async function TradeCalcPage() {
  const sb = getPublicSupabase();
  const { data: calc } = await sb.from("trade_calc_versions")
    .select("id, version, published_at, premium_curve").eq("status", "published").maybeSingle();
  const { data: pointsList } = await sb.from("ranked_lists")
    .select("version").eq("surface", "points").eq("status", "published").maybeSingle();

  const assets: Asset[] = [];
  if (calc) {
    const { data: vals } = await sb.from("trade_values")
      .select("player_id, value, players(full_name, team)").eq("calc_id", calc.id);
    for (const v of ((vals ?? []) as unknown as Array<{
      player_id: number; value: number;
      players: { full_name: string; team: string | null } | { full_name: string; team: string | null }[] | null;
    }>)) {
      const p = Array.isArray(v.players) ? v.players[0] : v.players;
      assets.push({
        kind: "player", id: v.player_id,
        label: p?.full_name ?? "Unknown", sub: p?.team ?? "",
        value: Number(v.value),
      });
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <ToolPageHeader
        eyebrow="Tool"
        title="Trade Calculator"
        subtitle="Premium-curve adjusted. Always anchored to the latest published rankings — never drifts."
      />
      <SubscribeToTradeCalc />
      <TradeCalculator
        assets={assets}
        premium={(calc?.premium_curve as PremiumCurve) ?? FALLBACK_CURVE}
        calcVersion={calc?.version ?? 0}
        pointsVersion={pointsList?.version ?? 0}
        publishedAt={calc?.published_at ?? null}
      />
    </div>
  );
}
