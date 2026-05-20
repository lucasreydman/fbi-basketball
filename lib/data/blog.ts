export type BlogPost = {
  slug: string;
  title: string;
  category: "Strategy" | "Rankings" | "World Cup" | "Community";
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "trade-deadline-fallout-2026",
    title: "Trade Deadline Fallout — Who Won, Who Got Fleeced",
    category: "Strategy",
    author: "bdub",
    date: "2026-05-13",
    readTime: "8 min",
    excerpt:
      "Every dynasty-relevant deadline move, graded by what it actually does to your win window and your assets two seasons out.",
    body:
      "The 2026 trade deadline gave us two kinds of teams: the ones that decided exactly what they were, and the ones that wanted to be in both lanes at once. The second group lost.\n\nWe ran every dynasty-relevant move past three filters — does it tighten your starting nine, does it move your asset base in the right direction, and does it look defensible 18 months from now. Most contenders passed two of three. Most rebuilders passed one. The middle pack didn't pass any.\n\nThe biggest winner, on our board, is the Phoenix front office. They sent a known-quantity wing they'd already gotten value from, plus a 2028 first that was projecting somewhere in the late teens, for a top-25 dynasty asset and his trailing-three-year health profile. That's textbook win-now-with-discipline: you didn't liquidate the cabinet, you swapped a depreciating chip for a flat one.\n\nThe biggest loser isn't who you think. It's the team that quietly added two veterans on expiring deals to chase one more playoff series, and gave up the only thing that mattered in the deal — a 2027 first that, given the lottery odds, is going to land in the top six. They get one playoff bid out of it. The team across the table gets a franchise reset.\n\nFull deal-by-deal grades below…",
  },
  {
    slug: "world-cup-2026-bracket-preview",
    title: "World Cup 2026 — Bracket Preview & Power Rankings",
    category: "World Cup",
    author: "Adam",
    date: "2026-05-10",
    readTime: "12 min",
    excerpt:
      "All 12 teams, ranked. The contender, the wildcard, the rebuild-that-snuck-in, and the punt-FT% team that's going to scare everyone.",
    body:
      "The bracket is set. Twelve teams, four rounds, and one of them goes home with the gold leather. We've been watching tape, projecting category strength, and arguing about it on Discord for three weeks. Here are the power rankings, the matchups we want to see, and the upset pick nobody else will name.\n\n**Tier S — The contender**\n\nThe Phoenix Pythons aren't just the defending champs, they're the team that got better in the off-season. The Reeves front office added a second high-usage scorer without hurting their wing rotation, and the cat coverage has been steady-state since opening night. They're going to be the chalk pick.\n\n**Tier A — The bracket-breakers**\n\nFour teams that can absolutely win it — and one of them, statistically, will play in the final.\n\n…",
  },
  {
    slug: "punt-ft-build-2026",
    title: "The Punt-FT% Build That's Quietly Dominating",
    category: "Strategy",
    author: "Matt",
    date: "2026-05-06",
    readTime: "6 min",
    excerpt:
      "Punt FT% isn't new, but the way you build it in 2026 is. The new center pool changed the math.",
    body:
      "Punt FT% used to be the safest build in cats because you could spam centers and end up with 7 cats secured before tipoff. The math has shifted. The new center pool has way more 70%+ free-throw shooters than it did three years ago, which means you can't just stack big men and assume free wins.\n\nHere's the 2026 version of the build, the three players who anchor it, and the trap most people are falling into…",
  },
  {
    slug: "dynasty-rookie-tiers-q2-2026",
    title: "Dynasty Rookie Tiers — Q2 2026 Update",
    category: "Rankings",
    author: "Matt",
    date: "2026-05-01",
    readTime: "5 min",
    excerpt:
      "Quarterly re-tiering of the most recent rookie class. Two big movers, one tier collapse, and the guy I'm wrong on.",
    body:
      "The rookie tiers got noisy in Q2. Two players jumped a full tier on the back of late-season expanded roles, one tier collapsed because the team that drafted those guys is rebuilding faster than expected, and there's one player I'm going to be wrong on either way — keeping him too low or moving him too high.\n\nFull tiers below, with the rationale and the trade-value implications.",
  },
];
