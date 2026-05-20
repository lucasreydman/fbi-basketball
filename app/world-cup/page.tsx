import Link from "next/link";
import { WORLD_CUP_HISTORY, WORLD_CUP_FORMAT } from "@/lib/data/world-cup";
import { DISCORD_URL } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "FBI World Cup · The bracket that means something",
};

export default function WorldCupPage() {
  return (
    <>
      <PageHeader
        eyebrow="FBI World Cup · 2026"
        title={
          <>
            Twelve teams. Five seasons. <span className="italic text-orange">One bracket.</span>
          </>
        }
        description="The only competitive dynasty bracket that runs invite-only. Built so the people who put in the work get the matchups they earned, and the bench-warmers stay in the regular season."
      />

      {/* Format spec sheet */}
      <section className="mx-auto max-w-5xl px-6 pt-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-rule sm:grid-cols-3 lg:grid-cols-6" style={{ borderRadius: 3 }}>
          {[
            { l: "Teams", v: `${WORLD_CUP_FORMAT.teams}` },
            { l: "Format", v: WORLD_CUP_FORMAT.format },
            { l: "Draft", v: WORLD_CUP_FORMAT.draftType },
            { l: "Roster", v: `${WORLD_CUP_FORMAT.rosterSize}` },
            { l: "Playoffs", v: WORLD_CUP_FORMAT.playoffs },
            { l: "Season", v: WORLD_CUP_FORMAT.regularSeason },
          ].map((s) => (
            <div key={s.l} className="bg-canvas-soft p-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-dim">{s.l}</div>
              <div className="mt-2 text-[14px] leading-snug text-bone">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How to get in */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="label-mono text-orange">Getting in</div>
            <h2 className="display-h2 mt-4 text-[2rem] text-bone">How to register.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ash">
              Registration opens September 2026. Invite-only — managers who placed top 4 in any
              FBI league last season get auto-priority. After that, the waitlist runs first-come.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                "Join the Discord and tag @bdub in #world-cup-2026.",
                "Get verified by a mod (proof of a finished prior season).",
                "Receive your bracket assignment by Sep 30.",
                "Mock draft scheduled for the second week of October.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 font-mono text-[14px] tabular text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-ash">{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-block bg-orange px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-obsidian transition-colors hover:bg-orange-bright"
              style={{ borderRadius: 2 }}
            >
              Get on the waitlist →
            </a>
          </div>

          <aside>
            <div
              className="court-card p-7"
              style={{ borderRadius: 3 }}
            >
              <div className="label-mono text-orange">The prize</div>
              <h3 className="display-h2 mt-4 text-[1.75rem] text-bone">
                Gold leather + a banner on the home page for a year.
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-ash">
                We don&apos;t do cash leagues at FBI. The prize is the leather, the banner, and
                the right to talk shit on the pods for the next 12 months.
              </p>
              <ul className="mt-6 space-y-3 border-t border-rule pt-5">
                <li className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  <span>Champion trophy</span>
                  <span className="text-orange">Gold leather</span>
                </li>
                <li className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  <span>Home-page banner</span>
                  <span className="text-orange">12 months</span>
                </li>
                <li className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  <span>Pod appearance</span>
                  <span className="text-orange">Guaranteed</span>
                </li>
                <li className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  <span>Auto-entry next year</span>
                  <span className="text-orange">Yes</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* History */}
      <section id="history" className="border-t border-rule bg-canvas-soft py-20 scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="label-mono text-orange">History · since 2021</div>
          <h2 className="display-h2 mt-4 text-[2.25rem] text-bone">
            Champions, MVPs, and one finals nobody is going to let me forget.
          </h2>

          <div className="mt-12 overflow-hidden border border-rule" style={{ borderRadius: 3 }}>
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-rule bg-surface font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
                  <th className="px-5 py-3">Year</th>
                  <th className="px-5 py-3">Champion</th>
                  <th className="px-5 py-3">Manager</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Runner-up</th>
                  <th className="px-5 py-3 hidden md:table-cell">Final</th>
                  <th className="px-5 py-3 hidden md:table-cell">MVP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {WORLD_CUP_HISTORY.map((row) => (
                  <tr key={row.year}>
                    <td className="px-5 py-4 font-display tabular text-orange">{row.year}</td>
                    <td className="px-5 py-4 text-bone">{row.champion}</td>
                    <td className="px-5 py-4 text-ash">{row.championManager}</td>
                    <td className="px-5 py-4 hidden text-ash sm:table-cell">{row.runnerUp}</td>
                    <td className="px-5 py-4 hidden font-mono tabular text-ash md:table-cell">{row.finalScore}</td>
                    <td className="px-5 py-4 hidden text-bone md:table-cell">{row.mvp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/leagues"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-orange"
            >
              Other formats and leagues →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
