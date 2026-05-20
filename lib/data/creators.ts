export type Creator = {
  slug: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  podcasts: string[];
  patreon?: string;
  twitter?: string;
  longBio: string;
};

export const CREATORS: Creator[] = [
  {
    slug: "bdub",
    name: "bdub",
    handle: "@HiddenUpside",
    role: "Founder · Commissioner · Voice of the FBI World Cup",
    bio: "Built FBI from a Discord server into the largest dynasty community on the internet. Runs the World Cup. Hosts Balls Deep + Tank Me Later.",
    podcasts: ["balls-deep", "tank-me-later"],
    twitter: "https://x.com/HiddenUpside",
    longBio:
      "bdub started FBI because every other fantasy basketball community he found was either too redraft-pilled or too far up the analytics rabbit hole to be useful at 11 PM the night before your trade deadline. Eight years later FBI runs the most competitive invite-only dynasty bracket in the format, plus a Discord that's a full-time job to moderate. He hosts the flagship pod, runs the World Cup, and probably knows your starting lineup better than you do.",
  },
  {
    slug: "matt",
    name: "Matt Lawson",
    handle: "@NBADynastyADP",
    role: "Dynasty Ranker · Trade-Value Architect · Host of NBA Dynasty",
    bio: "The dynasty rankings + trade value curve people quote when they want to win the argument. Patreon subscribers get the publish-day push.",
    podcasts: ["nba-dynasty", "balls-deep"],
    patreon: "https://www.patreon.com/c/NBADynastyADP",
    twitter: "https://x.com/NBADynastyADP",
    longBio:
      "Matt is the ranking guy. Points, categories, rookies — he publishes the boards and the trade-value sheet that anchor most serious dynasty conversations in this community. The premium-curve math behind his trade calculator is fit to his own published numbers (R² 96–99%) and re-snaps to every new publish. His Patreon is the move if you want the rankings the day they drop.",
  },
  {
    slug: "adam",
    name: "Adam",
    handle: "@FBIBasketAdam",
    role: "Redraft Lead · Rebuild Theorist · Co-host of Tank Me Later",
    bio: "Carries the redraft side and the rebuild side, which sounds contradictory until you've heard him talk asset cycles for an hour.",
    podcasts: ["tank-me-later", "balls-deep"],
    twitter: "https://x.com/FBIBasketAdam",
    longBio:
      "Adam handles the side of fantasy basketball that doesn't get the algorithm love — the redraft labor of love, the long rebuilds, the asset accumulation games where you sell three roleplayers for a future first and wait. If you've ever been told 'you're tanking wrong,' it was probably him.",
  },
];
