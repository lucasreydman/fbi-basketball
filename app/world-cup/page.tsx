import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WORLD_CUP_FORMAT, WORLD_CUP_HISTORY } from "@/lib/data/world-cup";
import { DISCORD_URL } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "FBI World Cup",
};

export default function WorldCupPage() {
  return (
    <>
      <PageHeader
        number="§ 01"
        marker="FBI World Cup · 2026 · #FBIWorldCup"
        title={
          <>
            576 teams. 48 divisions.{" "}
            <span className="italic text-accent">One champion.</span>
          </>
        }
        lede="The largest 9-cat re-draft tournament in the format. Three phases. Two re-drafts. One champion crowned across 48 divisions of 12 teams each. $21 to enter. $11,500+ in prizes. Registration opens September."
      />

      {/* The scale strip — six big numbers */}
      <Container size="2xl" className="pt-12">
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-6">
          <ScaleCell label="Teams" value="576" />
          <ScaleCell label="Divisions" value="48" />
          <ScaleCell label="Per division" value="12" />
          <ScaleCell label="Phases" value="3" />
          <ScaleCell label="Re-drafts" value="2" />
          <ScaleCell label="Champion" value="1" />
        </div>
      </Container>

      {/* Format spec table */}
      <Container size="2xl" className="pt-14" id="format">
        <div className="flex items-baseline gap-4 border-b border-rule pb-5">
          <span className="font-mono text-[11px] tabular text-accent">§ 01.A</span>
          <span className="label label-accent">The format</span>
        </div>
        <div className="mt-10 overflow-hidden border border-rule">
          <table className="w-full">
            <tbody className="divide-y divide-rule">
              <SpecRow label="Format" value={WORLD_CUP_FORMAT.format} />
              <SpecRow label="Teams per division" value={`${WORLD_CUP_FORMAT.teamsPerDivision}`} />
              <SpecRow label="Divisions" value={`${WORLD_CUP_FORMAT.divisions}`} />
              <SpecRow label="Total teams" value={`${WORLD_CUP_FORMAT.totalTeams.toLocaleString()}`} />
              <SpecRow label="Phases" value={`${WORLD_CUP_FORMAT.phases}`} />
              <SpecRow label="Re-drafts" value={`${WORLD_CUP_FORMAT.reDrafts}`} />
              <SpecRow label="Draft" value={WORLD_CUP_FORMAT.draftType} />
              <SpecRow label="Roster size" value={`${WORLD_CUP_FORMAT.rosterSize}`} />
              <SpecRow label="Playoffs" value={WORLD_CUP_FORMAT.playoffs} />
              <SpecRow label="Regular season" value={WORLD_CUP_FORMAT.regularSeason} />
              <SpecRow label="Entry fee" value={`$${WORLD_CUP_FORMAT.entryFee} USD`} highlight />
              <SpecRow label="Prize pool" value={`$${WORLD_CUP_FORMAT.prizePool.toLocaleString()}+ USD`} highlight />
              <SpecRow label="Registration opens" value={WORLD_CUP_FORMAT.registrationOpens} highlight />
            </tbody>
          </table>
        </div>
      </Container>

      {/* Three phases diagram */}
      <Container size="2xl" className="py-24 md:py-32">
        <div className="flex items-baseline gap-4 border-b border-rule pb-5">
          <span className="font-mono text-[11px] tabular text-accent">§ 01.B</span>
          <span className="label label-accent">How the three phases work</span>
        </div>
        <h2 className="display-5 mt-8 max-w-3xl text-ink">
          Three drafts. Three brackets.{" "}
          <span className="italic text-accent">One champion left standing.</span>
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule lg:grid-cols-3">
          <PhaseCard
            n="01"
            title="Phase 1 — Division play"
            blurb="576 teams across 48 divisions of 12. Snake-draft each division. Standard 9-cat H2H regular season."
            count="48 divisions"
          />
          <PhaseCard
            n="02"
            title="Phase 2 — First re-draft"
            blurb="Division winners and qualifiers move on. Fresh draft pool. Bracket re-seeds based on division-phase finish."
            count="Re-draft 1"
          />
          <PhaseCard
            n="03"
            title="Phase 3 — Final re-draft"
            blurb="The last bracket. Fresh draft, single-elimination. One champion crowned across all 576 teams that entered."
            count="Re-draft 2 → Champion"
          />
        </div>
      </Container>

      {/* How to register */}
      <Container size="2xl" className="py-24 md:py-32 border-t border-rule">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-baseline gap-4 border-b border-rule pb-5">
              <span className="font-mono text-[11px] tabular text-accent">§ 01.C</span>
              <span className="label label-accent">Getting in</span>
            </div>
            <h2 className="display-5 mt-8 text-ink">How to register.</h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-[1.65] text-ink-soft">
              Registration opens September 2026. $21 USD entry. Open registration —
              first-come on division slots until all 48 fill, then waitlist for
              cancellations.
            </p>
            <ol className="mt-10 divide-y divide-rule border-y border-rule">
              {[
                "Join the Discord and head to #world-cup-2026.",
                "Submit the registration form when it opens September 1.",
                "Pay the $21 entry to confirm your slot.",
                "Receive your division assignment by mid-September.",
                "Draft kicks off the second week of October.",
              ].map((step, i) => (
                <li key={i} className="grid grid-cols-[32px_1fr] gap-4 py-5">
                  <span className="font-mono text-[11px] tabular text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex h-12 items-center gap-2 bg-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
            >
              Get on the waitlist
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <aside>
            <div className="border border-accent/30 bg-[var(--accent-soft-bg)] p-8 md:p-10">
              <div className="label label-accent">The economics</div>
              <h3 className="display-4 mt-6 text-ink">
                $21 in. $11,500+ on the line.
              </h3>
              <p className="mt-5 text-[14.5px] leading-[1.65] text-ink-soft">
                Lowest-buy-in major in fantasy basketball. Prize pool grows with
                registration — historical pools have cleared the $11.5K+ mark with
                a fully-subscribed 576-team bracket.
              </p>
              <dl className="mt-8 divide-y divide-accent/30 border-y border-accent/30">
                {[
                  ["Entry fee", "$21 USD"],
                  ["Target prize pool", "$11,500+"],
                  ["Per-team economics", "Roughly $20 in, return distribution skewed to deep runs"],
                  ["Payment", "Handled in #world-cup-2026 channel"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                    <dt className="text-ink-mute">{k}</dt>
                    <dd className="text-right text-accent">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>

      {/* History — empty registry placeholder */}
      <section id="history" className="scroll-mt-24 border-t border-rule bg-canvas-soft">
        <Container size="2xl" className="py-24 md:py-32">
          <div className="flex items-baseline gap-4 border-b border-rule pb-5">
            <span className="font-mono text-[11px] tabular text-accent">§ 01.D</span>
            <span className="label label-accent">Champions registry</span>
          </div>
          {WORLD_CUP_HISTORY.length === 0 ? (
            <div className="mt-14 border border-dashed border-rule p-12 text-center">
              <div className="label">Coming with the 2026 edition</div>
              <h2 className="display-4 mt-5 max-w-2xl mx-auto text-ink">
                The champions registry lives here when the bracket archive is published.
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-[14.5px] leading-[1.65] text-ink-soft">
                Past winners, division champions, MVPs, and finals scores will be
                catalogued each season. Want to claim your place in the registry?
                Register for World Cup 2026 in September.
              </p>
            </div>
          ) : (
            <div className="mt-14 overflow-hidden border border-rule bg-canvas">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-rule font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                    <th className="px-5 py-4 w-20">Year</th>
                    <th className="px-5 py-4">Champion</th>
                    <th className="px-5 py-4">Manager</th>
                    <th className="px-5 py-4 hidden sm:table-cell">Division</th>
                    <th className="px-5 py-4 hidden md:table-cell">Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {WORLD_CUP_HISTORY.map((row) => (
                    <tr key={row.year} className="almanac-row">
                      <td className="px-5 py-5 font-display tabular text-accent text-[20px]" style={{ fontVariationSettings: '"opsz" 48' }}>
                        {row.year}
                      </td>
                      <td className="px-5 py-5 text-ink">{row.champion}</td>
                      <td className="px-5 py-5 text-ink-soft">{row.championManager}</td>
                      <td className="px-5 py-5 hidden text-ink-mute sm:table-cell">{row.division}</td>
                      <td className="px-5 py-5 hidden font-mono tabular text-ink-mute md:table-cell">{row.finalScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/leagues"
              className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-accent"
            >
              Other formats and leagues
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function ScaleCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas-soft px-5 py-6">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim">{label}</div>
      <div
        className="mt-2 font-display tabular text-ink"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          lineHeight: 1,
          fontWeight: 400,
          fontVariationSettings: '"opsz" 72',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <tr className={highlight ? "bg-[var(--accent-soft-bg)]" : ""}>
      <td className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim w-1/3">
        {label}
      </td>
      <td className={`px-6 py-4 text-[14.5px] ${highlight ? "text-accent" : "text-ink"}`}>
        {value}
      </td>
    </tr>
  );
}

function PhaseCard({
  n,
  title,
  blurb,
  count,
}: {
  n: string;
  title: string;
  blurb: string;
  count: string;
}) {
  return (
    <div className="bg-canvas-soft p-8 md:p-10">
      <div className="flex items-baseline justify-between">
        <span className="font-display tabular text-accent" style={{ fontSize: "1.75rem", fontVariationSettings: '"opsz" 48' }}>
          {n}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          {count}
        </span>
      </div>
      <h3 className="display-3 mt-5 text-[1.4rem] text-ink">{title}</h3>
      <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-soft">{blurb}</p>
    </div>
  );
}
