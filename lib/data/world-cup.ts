export type WorldCupYear = {
  year: number;
  champion: string;
  championManager: string;
  runnerUp: string;
  finalScore: string;
  mvp: string;
  format: string;
};

export const WORLD_CUP_HISTORY: WorldCupYear[] = [
  {
    year: 2025,
    champion: "Phoenix Pythons",
    championManager: "Mortimer Reeves",
    runnerUp: "Brooklyn Black Cats",
    finalScore: "1,247.2 — 1,198.6",
    mvp: "SGA",
    format: "12-team H2H Cats · 4-round playoff",
  },
  {
    year: 2024,
    champion: "Atlanta Aether",
    championManager: "Nikita V.",
    runnerUp: "Seattle Sound",
    finalScore: "1,182.4 — 1,176.0",
    mvp: "Jokić",
    format: "12-team H2H Cats · 4-round playoff",
  },
  {
    year: 2023,
    champion: "Toronto Tempo",
    championManager: "Lucas R.",
    runnerUp: "Phoenix Pythons",
    finalScore: "1,058.8 — 1,041.2",
    mvp: "Tatum",
    format: "12-team H2H Cats · 4-round playoff",
  },
  {
    year: 2022,
    champion: "Detroit Driftwood",
    championManager: "Hannah K.",
    runnerUp: "LA Lights",
    finalScore: "984.4 — 962.8",
    mvp: "Embiid",
    format: "12-team Roto · single-table standings",
  },
  {
    year: 2021,
    champion: "London Lions",
    championManager: "Sam B.",
    runnerUp: "Manila Mango",
    finalScore: "1,011.6 — 992.2",
    mvp: "Jokić",
    format: "12-team Roto · single-table standings",
  },
];

export const WORLD_CUP_FORMAT = {
  teams: 12,
  format: "Head-to-Head, 9-Category",
  draftType: "Snake · 13 rounds",
  rosterSize: 13,
  playoffs: "Top 6 · 4 rounds incl. play-in",
  regularSeason: "20 weeks · Oct → Mar",
  fees: "Invite-only",
  registrationOpens: "September 2026",
};
