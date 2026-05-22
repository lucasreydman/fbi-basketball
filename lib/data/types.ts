export type ListSurface = "points" | "cats";
export type ListStatus = "draft" | "published" | "archived";

export interface Player {
  id: number;
  full_name: string;
  slug: string;
  team: string | null;
  position: string | null;
  age: number | null;
  external_nba_id: number | null;
}

export interface RankedList {
  id: string;
  surface: ListSurface;
  status: ListStatus;
  version: number;
  published_at: string | null;
  notes: string | null;
}

export interface RankingEntry {
  list_id: string;
  player_id: number;
  rank: number;
  tier: number | null;
  value: number | null;
  change_n: number;
  extras: Record<string, number | null>;
  notes: string | null;
}

export interface PremiumCurve {
  coef_a: number;
  coef_b: number;
  exponent: number;
  max_list: number;
  max_trade: number;
}

export interface TradeCalcVersion {
  id: string;
  status: ListStatus;
  version: number;
  published_at: string | null;
  notes: string | null;
  premium_curve: PremiumCurve;
}

export interface TradeValue {
  calc_id: string;
  player_id: number;
  value: number;
}
