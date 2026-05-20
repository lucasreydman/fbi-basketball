export type Episode = {
  number: number;
  title: string;
  date: string;
  duration: string;
  blurb: string;
};

export type Podcast = {
  slug: string;
  name: string;
  tagline: string;
  hosts: string[];
  cadence: string;
  spotify: string;
  youtube: string;
  apple: string;
  cover: string;
  episodes: Episode[];
};

export const PODCASTS: Podcast[] = [
  {
    slug: "balls-deep",
    name: "Balls Deep",
    tagline: "The flagship fantasy basketball pod. Wheat from the chaff, weekly.",
    hosts: ["bdub", "Matt", "Adam"],
    cadence: "Weekly · Tuesdays",
    spotify: "https://open.spotify.com/show/balls-deep",
    youtube: "https://www.youtube.com/@FantasyBasketballInternational",
    apple: "https://podcasts.apple.com/balls-deep",
    cover: "BD",
    episodes: [
      {
        number: 184,
        title: "Trade Deadline Fallout — Who Won, Who Got Fleeced",
        date: "2026-05-13",
        duration: "1h 12m",
        blurb:
          "We grade every dynasty-relevant deal from the deadline, score the win-now buys, and call out the rebuilds that look like panic.",
      },
      {
        number: 183,
        title: "Rookie Re-Draft — One Year On",
        date: "2026-05-06",
        duration: "58m",
        blurb:
          "If we drafted last year's rookie class today, where would they go? Hot takes, cold takes, and the one guy we all got wrong.",
      },
      {
        number: 182,
        title: "Categories vs Points — Settle It Forever",
        date: "2026-04-29",
        duration: "1h 04m",
        blurb:
          "The ongoing format war, decided by the only people who matter: us. Plus listener mailbag on punt builds.",
      },
      {
        number: 181,
        title: "World Cup Roster Reveal",
        date: "2026-04-22",
        duration: "47m",
        blurb:
          "The 12 teams. The bracket. The trash talk. Everything you need to know before the FBI World Cup tips off.",
      },
    ],
  },
  {
    slug: "nba-dynasty",
    name: "NBA Dynasty",
    tagline: "Long-horizon dynasty strategy with Matt — the ADP, the rankings, the wedge.",
    hosts: ["Matt"],
    cadence: "Weekly · Fridays",
    spotify: "https://open.spotify.com/show/nba-dynasty",
    youtube: "https://www.youtube.com/@FantasyBasketballInternational",
    apple: "https://podcasts.apple.com/nba-dynasty",
    cover: "ND",
    episodes: [
      {
        number: 96,
        title: "The 2027 Rookie Tier Reset",
        date: "2026-05-16",
        duration: "52m",
        blurb:
          "Where the freshly-drafted class slots into my tier sheet, what the curve says they're worth, and the two I'm wrong on.",
      },
      {
        number: 95,
        title: "Trade Value Curve Deep-Dive",
        date: "2026-05-09",
        duration: "1h 02m",
        blurb:
          "How I rebuild the premium-curve fit every publish, what 'anchored to' really means in the calc, and why pinning matters.",
      },
      {
        number: 94,
        title: "Sell-High Window — Five Names Closing Fast",
        date: "2026-05-02",
        duration: "44m",
        blurb:
          "Five guys whose dynasty value will not look like this 90 days from now. Move them.",
      },
    ],
  },
  {
    slug: "tank-me-later",
    name: "Tank Me Later",
    tagline: "Rebuild speedruns, asset accumulation, and the patience to see them through.",
    hosts: ["bdub", "Adam"],
    cadence: "Bi-weekly · Thursdays",
    spotify: "https://open.spotify.com/show/tank-me-later",
    youtube: "https://www.youtube.com/@FantasyBasketballInternational",
    apple: "https://podcasts.apple.com/tank-me-later",
    cover: "TML",
    episodes: [
      {
        number: 41,
        title: "Pick Inflation — The Math Behind the Madness",
        date: "2026-05-15",
        duration: "1h 17m",
        blurb:
          "Why first-round picks two years out are trading hands for what a top-50 used to. Is it a bubble or new normal?",
      },
      {
        number: 40,
        title: "Speedrunning a Rebuild in 18 Months",
        date: "2026-05-01",
        duration: "54m",
        blurb:
          "Case study: a championship contender, three tear-downs, six smart sells. The exact roster move-by-move.",
      },
    ],
  },
];
