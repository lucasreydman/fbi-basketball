// Static preview rows for the home-page tools section. Production rankings
// live in Supabase and render on /tools/rankings/points (see lib/supabase.ts).
// This file exists purely to render a punchy preview without a DB roundtrip
// during home-page render.

export type PreviewRow = {
  rank: number;
  tier: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  team: string;
  pos: string;
  age: number;
  change: number; // +/- vs last publish
  value: number; // ROS points value
};

export const POINTS_PREVIEW: PreviewRow[] = [
  { rank: 1, tier: 1, name: "Shai Gilgeous-Alexander", team: "OKC", pos: "G", age: 27.7, change: 0,  value: 100 },
  { rank: 2, tier: 1, name: "Nikola Jokic",             team: "DEN", pos: "C", age: 31.2, change: 1,  value: 98 },
  { rank: 3, tier: 1, name: "Victor Wembanyama",        team: "SAS", pos: "C", age: 22.4, change: -1, value: 96 },
  { rank: 4, tier: 1, name: "Anthony Edwards",          team: "MIN", pos: "G", age: 24.6, change: 0,  value: 93 },
  { rank: 5, tier: 1, name: "Giannis Antetokounmpo",    team: "MIL", pos: "F", age: 31.5, change: 0,  value: 91 },
  { rank: 6, tier: 1, name: "Luka Dončić",              team: "DAL", pos: "G", age: 27.2, change: -2, value: 88 },
  { rank: 7, tier: 1, name: "Tyrese Haliburton",        team: "IND", pos: "G", age: 26.2, change: 1,  value: 86 },
  { rank: 8, tier: 1, name: "Jayson Tatum",             team: "BOS", pos: "F", age: 28.1, change: 0,  value: 85 },
  { rank: 9, tier: 1, name: "Devin Booker",             team: "PHX", pos: "G", age: 29.6, change: 2,  value: 82 },
  { rank: 10, tier: 1, name: "Karl-Anthony Towns",      team: "NYK", pos: "C", age: 30.4, change: 0,  value: 80 },
  { rank: 11, tier: 2, name: "Donovan Mitchell",        team: "CLE", pos: "G", age: 29.5, change: 1,  value: 76 },
  { rank: 12, tier: 2, name: "Cade Cunningham",         team: "DET", pos: "G", age: 24.5, change: 3,  value: 74 },
];

export const TRADE_PRESET = {
  give: ["Devin Booker", "Coby White"],
  get: ["Cade Cunningham"],
  giveValue: 82 + 18,
  getValue: 74,
};
