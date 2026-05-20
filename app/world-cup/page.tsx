import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WORLD_CUP_HISTORY, WORLD_CUP_FORMAT } from "@/lib/data/world-cup";
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
        number="§ 02"
        marker="FBI World Cup · 2026"
        title={
          <>
            Twelve teams. Five seasons of receipts.{" "}
            <span className="italic text-accent">One bracket.</span>
          </>
        }
        lede="The only competitive dynasty bracket that runs invite-only. Built so the people who put in the work get the matchups they earned, and the bench-warmers stay in the regular season."
      />

      {/* Format spec table */}
      <Container size="2xl" className="pt-14">
        <div className="overflow-hidden border border-rule">
          <table className="w-full">
            <tbody className="divide-y divide-rule">
              <SpecRow label="Teams"      value={`${WORLD_CUP_FORMAT.teams}`} />
              <SpecRow label="Format"     value={WORLD_CUP_FORMAT.format} />
              <SpecRow label="Draft"      value={WORLD_CUP_FORMAT.draftType} />
              <SpecRow label="Roster"     value={`${WORLD_CUP_FORMAT.rosterSize}`} />
              <SpecRow label="Playoffs"   value={WORLD_CUP_FORMAT.playoffs} />
              <SpecRow label="Regular season" value={WORLD_CUP_FORMAT.regularSeason} />
              <SpecRow label="Fees"       value={WORLD_CUP_FORMAT.fees} />
              <SpecRow label="Reg opens"  value={WORLD_CUP_FORMAT.registrationOpens} highlight />
            </tbody>
          </table>
        </div>
      </Container>

      {/* How to register */}
      <Container size="2xl" className="py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-baseline gap-4 border-b border-rule pb-5">
              <span className="font-mono text-[11px] tabular text-accent">§ 02.A</span>
              <span className="label label-accent">Getting in</span>
            </div>
            <h2 className="display-5 mt-8 text-ink">How to register.</h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-[1.65] text-ink-soft">
              Registration opens September 2026. Invite-only — managers who placed top-4
              in any FBI league last season get auto-priority. After that, the waitlist
              runs first-come.
            </p>
            <ol className="mt-10 divide-y divide-rule border-y border-rule">
              {[
                "Join the Discord and tag @bdub in #world-cup-2026.",
                "Get verified by a mod (proof of a finished prior season).",
                "Receive your bracket assignment by Sep 30.",
                "Mock draft scheduled for the second week of October.",
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
              <div className="label label-accent">The prize</div>
              <h3 className="display-4 mt-6 text-ink">
                Gold leather + a banner on the home page for a year.
              </h3>
              <p className="mt-5 text-[14.5px] leading-[1.65] text-ink-soft">
                We don&apos;t do cash leagues at FBI. The prize is the leather, the
                banner, and the right to talk shit on the pods for the next 12 months.
              </p>
              <dl className="mt-8 divide-y divide-accent/30 border-y border-accent/30">
                {[
                  ["Champion trophy", "Gold leather"],
                  ["Home-page banner", "12 months"],
                  ["Pod appearance", "Guaranteed"],
                  ["Auto-entry next year", "Yes"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between py-3 font-mono text-[11px] uppercase tracking-[0.22em]">
                    <dt className="text-ink-mute">{k}</dt>
                    <dd className="text-accent">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>

      {/* History */}
      <section id="history" className="scroll-mt-24 border-t border-rule bg-canvas-soft">
        <Container size="2xl" className="py-24 md:py-32">
          <div className="flex items-baseline gap-4 border-b border-rule pb-5">
            <span className="font-mono text-[11px] tabular text-accent">§ 02.B</span>
            <span className="label label-accent">History · since 2021</span>
          </div>
          <h2 className="display-5 mt-8 max-w-3xl text-ink">
            Champions, MVPs, and one finals nobody&apos;s going to let me forget.
          </h2>

          <div className="mt-14 overflow-hidden border border-rule bg-canvas">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-rule font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                  <th className="px-5 py-4 w-20">Year</th>
                  <th className="px-5 py-4">Champion</th>
                  <th className="px-5 py-4">Manager</th>
                  <th className="px-5 py-4 hidden sm:table-cell">Runner-up</th>
                  <th className="px-5 py-4 hidden md:table-cell">Final</th>
                  <th className="px-5 py-4 hidden md:table-cell">MVP</th>
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
                    <td className="px-5 py-5 hidden text-ink-mute sm:table-cell">{row.runnerUp}</td>
                    <td className="px-5 py-5 hidden font-mono tabular text-ink-mute md:table-cell">{row.finalScore}</td>
                    <td className="px-5 py-5 hidden text-ink md:table-cell">{row.mvp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

function SpecRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <tr className={highlight ? "bg-[var(--accent-soft-bg)]" : ""}>
      <td className="px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim w-1/3">
        {label}
      </td>
      <td className={`px-6 py-5 text-[14.5px] ${highlight ? "text-accent" : "text-ink"}`}>
        {value}
      </td>
    </tr>
  );
}
