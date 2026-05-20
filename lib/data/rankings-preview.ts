// Condensed preview of Matt's published dynasty rankings, mocked for the FBI hub.
// The full live tool lives at https://all-access-dynasty.vercel.app

export type PreviewRow = {
  rank: number;
  tier: 1 | 2 | 3 | 4;
  name: string;
  team: string;
  pos: string;
  age: number;
  change: number; // +/- vs last publish
  value: number; // points trade value (Matt's curve)
};

export const POINTS_PREVIEW: PreviewRow[] = [
  { rank: 1, tier: 1, name: "Victor Wembanyama", team: "SAS", pos: "C", age: 22.4, change: 0, value: 100 },
  { rank: 2, tier: 1, name: "Shai Gilgeous-Alexander", team: "OKC", pos: "G", age: 27.7, change: 1, value: 95 },
  { rank: 3, tier: 1, name: "Anthony Edwards", team: "MIN", pos: "G", age: 24.6, change: -1, value: 93 },
  { rank: 4, tier: 1, name: "Luka Dončić", team: "DAL", pos: "G", age: 27.2, change: 0, value: 91 },
  { rank: 5, tier: 2, name: "Nikola Jokić", team: "DEN", pos: "C", age: 31.2, change: 0, value: 84 },
  { rank: 6, tier: 2, name: "Jayson Tatum", team: "BOS", pos: "F", age: 28.1, change: 2, value: 82 },
  { rank: 7, tier: 2, name: "Cade Cunningham", team: "DET", pos: "G", age: 24.5, change: 1, value: 80 },
  { rank: 8, tier: 2, name: "Devin Booker", team: "PHX", pos: "G", age: 29.6, change: -2, value: 79 },
  { rank: 9, tier: 2, name: "Tyrese Haliburton", team: "IND", pos: "G", age: 26.2, change: -1, value: 77 },
  { rank: 10, tier: 2, name: "Paolo Banchero", team: "ORL", pos: "F", age: 23.5, change: 3, value: 75 },
  { rank: 11, tier: 2, name: "Chet Holmgren", team: "OKC", pos: "C", age: 24.0, change: 1, value: 73 },
  { rank: 12, tier: 2, name: "Scottie Barnes", team: "TOR", pos: "F", age: 24.7, change: 0, value: 71 },
];

export const TRADE_PRESET = {
  give: ["Devin Booker", "2027 Phoenix 1st"],
  get: ["Cade Cunningham"],
  giveValue: 79 + 32, // pick value approximated
  getValue: 80,
};
