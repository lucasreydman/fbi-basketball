import Link from "next/link";
import { ALL_ACCESS_DEMO_URL, DISCORD_URL } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Tools · FBI",
  description:
    "Dynasty rankings, trade calculator, and the rest of the toolkit. Free for the community.",
};

const TOOLS = [
  {
    slug: "rankings",
    title: "Dynasty Rankings",
    blurb:
      "Live boards for Points, 9-Cat, and Rookies. Drag-edited and re-published by Matt. Real player data, 538 NBA players, age + injury status pulled from official roster.",
    surfaces: ["Points", "9-Cat", "Rookies"],
    status: "Live · v37 published 2026-05-18",
    href: `${ALL_ACCESS_DEMO_URL}/rankings/points`,
    cta: "Open the board",
  },
  {
    slug: "trade-calculator",
    title: "Trade Calculator",
    blurb:
      "Premium-curve trade math anchored to the latest rankings. Pin a value to override the curve; everything else snaps to its new rank on every publish (R² 96–99%).",
    surfaces: ["Points", "9-Cat"],
    status: "Live · linked to v37",
    href: `${ALL_ACCESS_DEMO_URL}/trade-calculator`,
    cta: "Run a trade",
  },
  {
    slug: "schedule-strength",
    title: "Schedule Strength",
    blurb:
      "Weekly back-to-back, off-night, and rest-day breakdowns by team and player. Helps you set lineups and target streaming weeks.",
    surfaces: ["Weekly view", "Season view"],
    status: "Q3 2026",
    href: "#",
    cta: "Coming soon",
    disabled: true,
  },
  {
    slug: "league-sync",
    title: "League Sync",
    blurb:
      "One-click roster import from Yahoo, ESPN, Fantrax, Sleeper. Get a trade analysis for your actual team without re-typing 13 names.",
    surfaces: ["Yahoo", "ESPN", "Fantrax", "Sleeper"],
    status: "Q4 2026",
    href: "#",
    cta: "Coming soon",
    disabled: true,
  },
  {
    slug: "draft-mock",
    title: "Mock Draft Room",
    blurb:
      "Multi-user mock drafts that run on Matt's ADP. Bot-fill open seats, freeze the board for review, export to CSV.",
    surfaces: ["12-team", "10-team", "8-team"],
    status: "Q4 2026",
    href: "#",
    cta: "Coming soon",
    disabled: true,
  },
  {
    slug: "punt-builder",
    title: "Punt Builder",
    blurb:
      "Pick a category to punt; the tool generates an ideal target list and an auto-draft cheat sheet. The fastest way to learn the format.",
    surfaces: ["FT%", "FG%", "AST", "REB", "TO"],
    status: "Q1 2027",
    href: "#",
    cta: "Coming soon",
    disabled: true,
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The toolkit"
        title={
          <>
            Built so you can <span className="italic text-orange">stop using a spreadsheet.</span>
          </>
        }
        description="Two tools live today, four on the roadmap. Everything anchored to Matt's published values and the FBI community's standards. Free, no email-gate."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Card key={t.slug} tool={t} />
          ))}
        </div>

        <div className="mt-16 border border-rule p-8 text-center" style={{ borderRadius: 3 }}>
          <div className="label-mono text-orange">Want a tool that isn&apos;t here?</div>
          <h3 className="display-h2 mt-3 text-[1.5rem] text-bone">
            Drop the idea in the Discord. We build what people actually use.
          </h3>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-orange px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
            style={{ borderRadius: 2 }}
          >
            Request a tool →
          </a>
        </div>
      </section>
    </>
  );
}

type ToolCard = (typeof TOOLS)[number];

function Card({ tool }: { tool: ToolCard }) {
  const live = !("disabled" in tool && tool.disabled);
  return (
    <div className="court-card flex flex-col p-7" style={{ borderRadius: 3 }}>
      <div className="flex items-center justify-between">
        <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${live ? "text-orange" : "text-ash-dim"}`}>
          {live ? "Live" : "Roadmap"}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">{tool.status}</div>
      </div>

      <h3 className="display-h3 mt-5 text-[1.5rem] text-bone">{tool.title}</h3>
      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ash">{tool.blurb}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.surfaces.map((s) => (
          <span
            key={s}
            className="border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash"
            style={{ borderRadius: 2 }}
          >
            {s}
          </span>
        ))}
      </div>

      {live ? (
        <Link
          href={tool.href}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-block bg-orange py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
          style={{ borderRadius: 2 }}
        >
          {tool.cta} →
        </Link>
      ) : (
        <span
          className="mt-7 inline-block border border-rule py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ash-dim"
          style={{ borderRadius: 2 }}
        >
          {tool.cta}
        </span>
      )}
    </div>
  );
}
