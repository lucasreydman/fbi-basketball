"use server";
import { revalidatePath } from "next/cache";
import { getAdminSupabase } from "@/lib/supabase";
import type { PremiumCurve } from "@/lib/data/types";

export async function createTradeCalcDraft(): Promise<string> {
  const admin = getAdminSupabase();
  const { data: existing } = await admin.from("trade_calc_versions")
    .select("id").eq("status", "draft").maybeSingle();
  if (existing) return existing.id;

  const { data: pub } = await admin.from("trade_calc_versions")
    .select("*").eq("status", "published").maybeSingle();
  if (!pub) throw new Error("No published trade calc to clone");

  const { data: draft, error } = await admin.from("trade_calc_versions").insert({
    status: "draft", version: pub.version + 1, notes: null,
    premium_curve: pub.premium_curve,
  }).select().single();
  if (error || !draft) throw new Error(error?.message);

  const { data: vals } = await admin.from("trade_values").select("*").eq("calc_id", pub.id);
  if (vals?.length) {
    const cloned = vals.map(({ calc_id: _omit, ...r }) => ({ ...r, calc_id: draft.id }));
    await admin.from("trade_values").insert(cloned);
  }
  return draft.id;
}

export async function saveTradeValue(calcId: string, playerId: number, value: number): Promise<void> {
  const admin = getAdminSupabase();
  const { error } = await admin.from("trade_values")
    .update({ value }).eq("calc_id", calcId).eq("player_id", playerId);
  if (error) throw new Error(error.message);
}

export async function saveCurve(calcId: string, premium_curve: PremiumCurve): Promise<void> {
  const admin = getAdminSupabase();
  const { error } = await admin.from("trade_calc_versions")
    .update({ premium_curve }).eq("id", calcId);
  if (error) throw new Error(error.message);
}

export async function publishTradeCalcDraft(notes: string | null): Promise<void> {
  const admin = getAdminSupabase();
  const { data: pub } = await admin.from("trade_calc_versions").select("id").eq("status", "published").maybeSingle();
  const { data: draft } = await admin.from("trade_calc_versions").select("id").eq("status", "draft").maybeSingle();
  if (!draft) throw new Error("No draft to publish");
  if (pub) await admin.from("trade_calc_versions").update({ status: "archived" }).eq("id", pub.id);
  await admin.from("trade_calc_versions")
    .update({ status: "published", published_at: new Date().toISOString(), notes })
    .eq("id", draft.id);
  revalidatePath("/admin", "layout");
  revalidatePath("/tools/trade-calculator");
}

export async function discardTradeCalcDraft(): Promise<void> {
  const admin = getAdminSupabase();
  await admin.from("trade_calc_versions").delete().eq("status", "draft");
  revalidatePath("/admin/trade-calc");
}
