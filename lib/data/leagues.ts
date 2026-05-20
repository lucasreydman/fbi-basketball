export type LeagueOffering = {
  slug: string;
  name: string;
  format: string;
  size: string;
  cadence: string;
  blurb: string;
  details: string[];
  spots: "open" | "waitlist" | "full";
};

export const LEAGUE_OFFERINGS: LeagueOffering[] = [
  {
    slug: "dynasty-keeper",
    name: "Dynasty",
    format: "9-Cat H2H · Dynasty",
    size: "12 teams",
    cadence: "Year-round · annual rookie draft",
    blurb:
      "The long game. Build a roster across five seasons, trade picks two years out, and protect your wing depth like it's a national resource.",
    details: [
      "13-round rookie draft in September",
      "Up to 4-team trades allowed",
      "Rookie + future-pick markets open year-round",
      "Vet commissioner team; no rebuild rules",
    ],
    spots: "waitlist",
  },
  {
    slug: "redraft-9cat",
    name: "Redraft · 9-Cat",
    format: "9-Cat H2H · Redraft",
    size: "12 teams",
    cadence: "October draft · Apr finale",
    blurb:
      "The clean slate. New draft every October, no carryover, no excuses. The format that built FBI.",
    details: [
      "Snake draft, 13 rounds",
      "Top-6 playoff bracket",
      "FAAB waivers, $100 budget",
      "Commish does the boring stuff; you do the trades",
    ],
    spots: "open",
  },
  {
    slug: "draft-only",
    name: "Draft-Only",
    format: "Best-ball · Single draft event",
    size: "10 teams",
    cadence: "October only",
    blurb:
      "Show up, draft, log off. Optimal lineups set automatically each week — no waivers, no roster moves, no excuses for not finishing top 3.",
    details: [
      "20-round snake",
      "Auto-set optimal lineups weekly",
      "Final standings = total cat score",
      "Multiple flights run concurrently",
    ],
    spots: "open",
  },
  {
    slug: "rookie-only",
    name: "Rookie-Only Dynasty",
    format: "9-Cat H2H · Dynasty (rookie pool)",
    size: "10 teams",
    cadence: "Year-round",
    blurb:
      "A dynasty where the only thing you can roster is rookies and second-year players. The patience format.",
    details: [
      "Trade picks 3 years out",
      "Players age out into FA after year 2",
      "Curve favors hit rate over ceiling",
      "Cult favorite",
    ],
    spots: "waitlist",
  },
];
