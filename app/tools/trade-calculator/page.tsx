import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { getPublicSupabase } from "@/lib/supabase";
import { TradeCalculator, type Asset } from "@/components/tool/trade-calculator";
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

export default async function TradeCalculatorPage() {
  const sb = getPublicSupabase();

  const { data: calc } = await sb
    .from("trade_calc_versions")
    .select("id, version, published_at, premium_curve")
    .eq("status", "published")
    .maybeSingle();

  const { data: pointsList } = await sb
    .from("ranked_lists")
    .select("version")
    .eq("surface", "points")
    .eq("status", "published")
    .maybeSingle();

  let assets: Asset[] = [];
  if (calc) {
    const { data: vals } = await sb
      .from("trade_values")
      .select("player_id, value, players(full_name, team, position)")
      .eq("calc_id", calc.id)
      .order("value", { ascending: false });

    assets = (
      (vals ?? []) as unknown as Array<{
        player_id: number;
        value: number;
        players:
          | { full_name: string; team: string | null; position: string | null }
          | { full_name: string; team: string | null; position: string | null }[]
          | null;
      }>
    ).map((v) => {
      const p = Array.isArray(v.players) ? v.players[0] : v.players;
      return {
        id: v.player_id,
        label: p?.full_name ?? "Unknown",
        sub: [p?.team, p?.position].filter(Boolean).join(" · "),
        value: Number(v.value),
      };
    });
  }

  return (
    <>
      <PageHeader
        number="§ 03·3"
        marker="Tool · Trade calc"
        title={
          <>
            Trade <span className="italic text-accent">Calculator</span>
          </>
        }
        lede="Premium-curve trade math anchored to the FBI board. Add players to either side — values re-snap on every publish."
      />

      <Container size="2xl" className="py-16 md:py-20">
        <TradeCalculator
          assets={assets}
          premium={(calc?.premium_curve as PremiumCurve) ?? FALLBACK_CURVE}
          calcVersion={calc?.version ?? 0}
          pointsVersion={pointsList?.version ?? 0}
          publishedAt={calc?.published_at ?? null}
        />

        <div className="mt-12 border border-rule p-6 bg-canvas-soft">
          <div className="label">How it works</div>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.65] text-ink-soft">
            Raw value is the straight sum of trade values. Premium-adjusted applies an FBI curve that
            rewards concentrated star power — a single 95 is worth more than three 35s. The verdict
            compares premium-adjusted totals across both sides.
          </p>
        </div>
      </Container>
    </>
  );
}
