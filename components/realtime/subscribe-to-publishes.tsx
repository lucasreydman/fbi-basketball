"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase";
import type { ListSurface } from "@/lib/data/types";

export function SubscribeToPublishes({ surface }: { surface: ListSurface }) {
  const router = useRouter();
  useEffect(() => {
    const supabase = getBrowserSupabase();
    const channel = supabase
      .channel(`publishes:${surface}`)
      .on(
        "postgres_changes" as never,
        { event: "UPDATE", schema: "public", table: "ranked_lists", filter: `surface=eq.${surface}` },
        (payload: { new?: { status?: string } }) => {
          if (payload.new?.status === "published") router.refresh();
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [surface, router]);
  return null;
}
