import { getAdminSupabase } from "@/lib/supabase";
import { createTradeCalcDraft } from "@/app/admin/actions/trade-calc";
import { TradeCalcEditor, type ValueRow } from "@/components/admin/trade-calc-editor";
import { ToolPageHeader } from "@/components/shell/tool-page-header";
import type { PremiumCurve } from "@/lib/data/types";

export const dynamic = "force-dynamic";

export default async function AdminTradeCalcPage() {
  const sb = getAdminSupabase();

  const { data: draft0 } = await sb.from("trade_calc_versions")
    .select("id, version, premium_curve").eq("status", "draft").maybeSingle();
  let draft = draft0;
  if (!draft) {
    const id = await createTradeCalcDraft();
    const r = await sb.from("trade_calc_versions")
      .select("id, version, premium_curve").eq("id", id).single();
    draft = r.data;
  }
  if (!draft) throw new Error("Failed to create trade-calc draft");

  const { data: pub } = await sb.from("trade_calc_versions").select("version").eq("status", "published").maybeSingle();
  const { data: vals } = await sb.from("trade_values")
    .select("player_id, value, players(full_name, team)")
    .eq("calc_id", draft.id).order("value", { ascending: false });

  const values: ValueRow[] = ((vals ?? []) as unknown as Array<{
    player_id: number; value: number;
    players: { full_name: string; team: string | null } | { full_name: string; team: string | null }[] | null;
  }>).map((v) => {
    const p = Array.isArray(v.players) ? v.players[0] : v.players;
    return { player_id: v.player_id, value: Number(v.value), full_name: p?.full_name ?? "", team: p?.team ?? null };
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <ToolPageHeader
        eyebrow="Editor · Trade calc"
        title="Trade Calculator"
        subtitle="Edit player values + tune the premium curve. Published values feed every subscriber's calculator in real time."
      />
      <TradeCalcEditor
        calcId={draft.id}
        draftVersion={draft.version}
        publishedVersion={pub?.version ?? null}
        initialValues={values}
        initialPremium={draft.premium_curve as PremiumCurve}
      />
    </div>
  );
}
