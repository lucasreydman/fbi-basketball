import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ALL_ACCESS_DEMO_URL, DISCORD_URL } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Tools",
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
    live: true,
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
    live: true,
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
    live: false,
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
    live: false,
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
    live: false,
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
    live: false,
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        number="§ 03"
        marker="The toolkit · free"
        title={
          <>
            Built so you can{" "}
            <span className="italic text-accent">stop using a spreadsheet.</span>
          </>
        }
        lede="Two tools live today, four on the roadmap. Everything anchored to Matt's published values and the FBI community's standards. Free, no email-gate."
      />

      <Container size="2xl" className="py-20 md:py-24">
        <div className="grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <ToolCard key={t.slug} index={i} tool={t} />
          ))}
        </div>

        <div className="mt-16 border border-rule p-10 text-center bg-canvas-soft">
          <div className="label label-accent">Want a tool that isn&apos;t here?</div>
          <h3 className="display-3 mt-4 text-ink">
            Drop the idea in the Discord. We build what people actually use.
          </h3>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex h-12 items-center gap-2 bg-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
          >
            Request a tool
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </>
  );
}

function ToolCard({ tool, index }: { tool: (typeof TOOLS)[number]; index: number }) {
  return (
    <div className="group relative flex flex-col gap-6 bg-canvas-soft p-7 md:p-9 transition-colors hover:bg-surface">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] tabular text-ink-dim">
          {String(index + 1).padStart(2, "0")} / {String(TOOLS.length).padStart(2, "0")}
        </span>
        <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tool.live ? "text-accent" : "text-ink-dim"}`}>
          {tool.live ? "● Live" : "○ Roadmap"}
        </span>
      </div>

      <div>
        <h3 className="display-3 text-ink">{tool.title}</h3>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          {tool.status}
        </div>
      </div>

      <p className="text-[14px] leading-[1.65] text-ink-soft flex-1">{tool.blurb}</p>

      <div className="flex flex-wrap gap-2">
        {tool.surfaces.map((s) => (
          <span
            key={s}
            className="border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-mute"
          >
            {s}
          </span>
        ))}
      </div>

      {tool.live ? (
        <Link
          href={tool.href}
          target="_blank"
          rel="noreferrer"
          className="group/cta inline-flex h-11 items-center justify-center gap-2 bg-accent px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
        >
          {tool.cta}
          <ArrowUpRight size={13} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      ) : (
        <span className="inline-flex h-11 items-center justify-center border border-rule font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
          {tool.cta}
        </span>
      )}
    </div>
  );
}
