"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase";

export function SubscribeToTradeCalc() {
  const router = useRouter();
  useEffect(() => {
    const supabase = getBrowserSupabase();
    const channel = supabase
      .channel("publishes:trade_calc")
      .on(
        "postgres_changes" as never,
        { event: "UPDATE", schema: "public", table: "trade_calc_versions" },
        (payload: { new?: { status?: string } }) => {
          if (payload.new?.status === "published") router.refresh();
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);
  return null;
}
