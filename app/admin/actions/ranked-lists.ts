"use server";
import { revalidatePath } from "next/cache";
import { getAdminSupabase } from "@/lib/supabase";
import type { ListSurface } from "@/lib/data/types";

export async function createDraftFromPublished(surface: ListSurface): Promise<string> {
  const admin = getAdminSupabase();

  const { data: existing } = await admin
    .from("ranked_lists").select("id").eq("surface", surface).eq("status", "draft").maybeSingle();
  if (existing) return existing.id;

  const { data: pub } = await admin
    .from("ranked_lists").select("*").eq("surface", surface).eq("status", "published").maybeSingle();
  if (!pub) throw new Error(`No published ${surface} list to clone`);

  const { data: draft, error: draftErr } = await admin
    .from("ranked_lists")
    .insert({ surface, status: "draft", version: pub.version + 1, notes: null })
    .select().single();
  if (draftErr || !draft) throw new Error(draftErr?.message);

  const { data: srcEntries } = await admin
    .from("ranking_entries").select("*").eq("list_id", pub.id);

  if (srcEntries?.length) {
    const cloned = srcEntries.map(({ list_id: _omit, ...rest }) => ({ ...rest, list_id: draft.id }));
    const { error } = await admin.from("ranking_entries").insert(cloned);
    if (error) throw new Error(error.message);
  }

  return draft.id;
}

export async function saveDraftOrder(
  listId: string,
  ordered: Array<{
    player_id: number;
    rank: number;
    tier: number | null;
    value: number | null;
    extras?: Record<string, number | null>;
  }>,
): Promise<void> {
  const admin = getAdminSupabase();
  const records = ordered.map((o) => ({
    list_id: listId,
    player_id: o.player_id,
    rank: o.rank,
    tier: o.tier,
    value: o.value,
    ...(o.extras !== undefined ? { extras: o.extras } : {}),
  }));
  const { error } = await admin.from("ranking_entries").upsert(records, {
    onConflict: "list_id,player_id",
  });
  if (error) throw new Error(error.message);
  await admin.from("ranked_lists").update({ updated_at: new Date().toISOString() }).eq("id", listId);
}

export async function saveEntryValue(listId: string, playerId: number, value: number): Promise<void> {
  const admin = getAdminSupabase();
  const { error } = await admin
    .from("ranking_entries")
    .update({ value })
    .eq("list_id", listId).eq("player_id", playerId);
  if (error) throw new Error(error.message);
}

export async function saveEntryExtra(
  listId: string, playerId: number, key: string, value: number,
): Promise<void> {
  const admin = getAdminSupabase();
  const { data: row } = await admin
    .from("ranking_entries").select("extras")
    .eq("list_id", listId).eq("player_id", playerId).single();
  const current = (row?.extras as Record<string, unknown> | null) ?? {};
  const extras = { ...current, [key]: value };
  const { error } = await admin
    .from("ranking_entries").update({ extras })
    .eq("list_id", listId).eq("player_id", playerId);
  if (error) throw new Error(error.message);
}

export async function publishDraft(surface: ListSurface, notes: string | null): Promise<void> {
  const admin = getAdminSupabase();

  const { data: pub } = await admin
    .from("ranked_lists").select("id").eq("surface", surface).eq("status", "published").maybeSingle();
  const { data: draft } = await admin
    .from("ranked_lists").select("id, version").eq("surface", surface).eq("status", "draft").maybeSingle();
  if (!draft) throw new Error("No draft to publish");

  if (pub) {
    await admin.from("ranked_lists").update({ status: "archived" }).eq("id", pub.id);
  }
  await admin.from("ranked_lists")
    .update({ status: "published", published_at: new Date().toISOString(), notes })
    .eq("id", draft.id);

  revalidatePath("/");
  revalidatePath("/admin", "layout");
  revalidatePath("/tools/rankings/" + surface);
}

export async function discardDraft(surface: ListSurface): Promise<void> {
  const admin = getAdminSupabase();
  await admin.from("ranked_lists").delete().eq("surface", surface).eq("status", "draft");
  revalidatePath("/admin/rankings/" + surface);
}
