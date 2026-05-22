import { getAdminSupabase } from "@/lib/supabase";
import { createDraftFromPublished } from "@/app/admin/actions/ranked-lists";
import type { ListSurface } from "./types";
import type { EditorEntry } from "@/components/admin/ranked-list-editor";

export async function loadDraftAndEntries(surface: ListSurface) {
  const sb = getAdminSupabase();

  const { data: existing } = await sb
    .from("ranked_lists").select("id, version")
    .eq("surface", surface).eq("status", "draft").maybeSingle();

  let draft: { id: string; version: number } | null = existing ?? null;
  if (!draft) {
    const newDraftId = await createDraftFromPublished(surface);
    const r = await sb.from("ranked_lists").select("id, version").eq("id", newDraftId).single();
    draft = r.data;
  }
  if (!draft) throw new Error(`Failed to create ${surface} draft`);

  const { data: entries } = await sb
    .from("ranking_entries")
    .select("player_id, rank, tier, value, extras, players(full_name, team)")
    .eq("list_id", draft.id).order("rank", { ascending: true });

  const { data: pub } = await sb
    .from("ranked_lists").select("version").eq("surface", surface).eq("status", "published").maybeSingle();

  const mapped: EditorEntry[] = ((entries ?? []) as unknown as Array<{
    player_id: number; rank: number; tier: number | null; value: number | null;
    extras: Record<string, number | null> | null;
    players: { full_name: string; team: string | null } | { full_name: string; team: string | null }[] | null;
  }>).map((e) => {
    const p = Array.isArray(e.players) ? e.players[0] : e.players;
    return {
      player_id: e.player_id, rank: e.rank, tier: e.tier, value: e.value,
      extras: e.extras ?? {},
      full_name: p?.full_name ?? "", team: p?.team ?? null,
    };
  });

  return {
    listId: draft.id,
    draftVersion: draft.version,
    publishedVersion: pub?.version ?? null,
    entries: mapped,
  };
}
