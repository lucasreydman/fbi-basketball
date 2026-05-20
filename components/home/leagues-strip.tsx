import Link from "next/link";
import { LEAGUE_OFFERINGS } from "@/lib/data/leagues";
import { SectionHeading } from "./section-heading";

const STATUS_TONE: Record<string, string> = {
  open: "text-positive",
  waitlist: "text-orange",
  full: "text-ash-dim",
};

const STATUS_LABEL: Record<string, string> = {
  open: "Spots open",
  waitlist: "Waitlist",
  full: "Full",
};

export function LeaguesStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Leagues"
        title={
          <>
            Pick your <span className="italic text-orange">commitment level.</span>
          </>
        }
        description="From draft-and-log-off to year-round dynasty wars. Every league is commissioner-run, vet-managed, and full of people who'll actually trade with you."
        cta={{ href: "/leagues", label: "All formats" }}
      />

      <div className="grid gap-px overflow-hidden border border-rule sm:grid-cols-2 lg:grid-cols-4" style={{ borderRadius: 3 }}>
        {LEAGUE_OFFERINGS.map((l) => (
          <Link
            key={l.slug}
            href="/leagues"
            className="group flex flex-col bg-canvas-soft p-6 transition-colors hover:bg-surface"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                {l.format.split(" · ")[1] ?? l.format}
              </div>
              <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${STATUS_TONE[l.spots]}`}>
                · {STATUS_LABEL[l.spots]}
              </div>
            </div>
            <h3 className="display-h3 mt-5 text-[1.5rem] text-bone group-hover:text-orange-bright">
              {l.name}
            </h3>
            <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ash">{l.blurb}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-rule pt-4">
              <Meta label="Size" value={l.size} />
              <Meta label="Cadence" value={l.cadence.split(" · ")[0]} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-dim">{label}</div>
      <div className="mt-1 text-[12.5px] text-ash">{value}</div>
    </div>
  );
}
