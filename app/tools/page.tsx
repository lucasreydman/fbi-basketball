import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DISCORD_URL, TOOL_POINTS, TOOL_CATS, TOOL_TRADE_CALC } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Tools",
  description:
    "ROS rankings, 9-cat rankings, and a trade calculator. Free for the FBI community.",
};

const TOOLS = [
  {
    slug: "rankings-points",
    title: "ROS Points Rankings",
    blurb:
      "Rest-of-season points board, tiered, with weekly publishes. The board the FBI community quotes — free, no email-gate.",
    surfaces: ["Points", "Tiered", "Weekly"],
    status: "Live",
    href: TOOL_POINTS,
    cta: "Open the board",
    live: true,
  },
  {
    slug: "rankings-cats",
    title: "ROS 9-Cat Rankings",
    blurb:
      "Full 9-category board with per-stat ROS projections. Punts-friendly, stat-rate weighted. Updated alongside the points board.",
    surfaces: ["9-cat", "Per-stat", "Tiered"],
    status: "Live",
    href: TOOL_CATS,
    cta: "Open the board",
    live: true,
  },
  {
    slug: "trade-calculator",
    title: "Trade Calculator",
    blurb:
      "Premium-curve trade math anchored to the latest ROS board. Add players to either side, get a verdict, re-snaps on every publish.",
    surfaces: ["Points", "Premium-curve", "Live-linked"],
    status: "Live · linked to v1",
    href: TOOL_TRADE_CALC,
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
      "One-click roster import from Yahoo, ESPN, Fantrax, Sleeper. Trade analysis for your actual team without re-typing 13 names.",
    surfaces: ["Yahoo", "ESPN", "Fantrax", "Sleeper"],
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
        lede="Three tools live today, three on the roadmap. Everything anchored to the FBI community's standards. Free, no email-gate."
      />

      <Container size="2xl" className="py-20 md:py-24">
        <div className="grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <ToolCard key={t.slug} index={i} tool={t} total={TOOLS.length} />
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

function ToolCard({ tool, index, total }: { tool: (typeof TOOLS)[number]; index: number; total: number }) {
  return (
    <div className="group relative flex flex-col gap-6 bg-canvas-soft p-7 md:p-9 transition-colors hover:bg-surface">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] tabular text-ink-dim">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
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
