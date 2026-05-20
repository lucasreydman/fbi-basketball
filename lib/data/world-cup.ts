export const WORLD_CUP_FORMAT = {
  // Per-division
  teamsPerDivision: 12,
  format: "9-Cat · H2H",
  draftType: "Snake · 13 rounds",
  rosterSize: 13,

  // Across the tournament
  divisions: 48,
  totalTeams: 576,
  phases: 3,
  reDrafts: 2,
  champions: 1,

  // Economics
  entryFee: 21,
  prizePool: 11_500,

  // Calendar
  regularSeason: "20 weeks · Oct → Mar",
  playoffs: "Top 6 per division · 3-phase bracket",
  registrationOpens: "September 2026",
  hashtag: "#FBIWorldCup",
};

/**
 * Past champions intentionally left empty.
 * Brendan can drop the registry into this array when ready — UI auto-renders.
 */
export type WorldCupYear = {
  year: number;
  champion: string;
  championManager: string;
  division: string;
  finalScore: string;
};

export const WORLD_CUP_HISTORY: WorldCupYear[] = [];
