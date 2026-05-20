import Link from "next/link";
import { LEAGUE_OFFERINGS } from "@/lib/data/leagues";
import { DISCORD_URL } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Leagues · FBI",
};

const STATUS_TONE: Record<string, { bg: string; text: string }> = {
  open: { bg: "bg-positive/15", text: "text-positive" },
  waitlist: { bg: "bg-orange/15", text: "text-orange" },
  full: { bg: "bg-graphite", text: "text-ash-dim" },
};
const STATUS_LABEL: Record<string, string> = {
  open: "Spots open",
  waitlist: "Waitlist",
  full: "Full",
};

export default function LeaguesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Run with us"
        title={
          <>
            Every format we run, <span className="italic text-orange">in plain language.</span>
          </>
        }
        description="Commissioner-run, vet-managed, low-fee or no-fee. We don't run gambling leagues; we run leagues."
      />

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-10">
        {LEAGUE_OFFERINGS.map((l) => {
          const tone = STATUS_TONE[l.spots];
          return (
            <article
              key={l.slug}
              className="court-card grid gap-8 p-8 lg:grid-cols-[1fr_auto]"
              style={{ borderRadius: 3 }}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.text}`}>
                    {STATUS_LABEL[l.spots]}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
                    · {l.size} · {l.cadence}
                  </span>
                </div>
                <h2 className="display-h2 mt-4 text-[2rem] text-bone">{l.name}</h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-orange">
                  {l.format}
                </p>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ash">{l.blurb}</p>
                <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {l.details.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-[13.5px] text-ash">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="flex flex-col justify-between lg:items-end">
                <div className={`px-4 py-3 ${tone.bg} ${tone.text}`} style={{ borderRadius: 2 }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em]">
                    {STATUS_LABEL[l.spots]}
                  </div>
                </div>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block border border-orange px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-orange transition-colors hover:bg-orange hover:text-obsidian"
                  style={{ borderRadius: 2 }}
                >
                  {l.spots === "open" ? "Register →" : "Get on list →"}
                </a>
              </aside>
            </article>
          );
        })}
      </div>

      <section className="border-t border-rule bg-canvas-soft py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="label-mono text-orange">Custom league</div>
          <h3 className="display-h2 mt-4 text-[1.75rem] text-bone">
            Got 11 friends and a format that doesn&apos;t fit any of these?
          </h3>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ash">
            We&apos;ll commish it. Auction, salary cap, contract leagues, sim leagues — if it&apos;s
            basketball and you bring the people, we&apos;ll bring the spreadsheets.
          </p>
          <Link
            href={DISCORD_URL}
            className="mt-7 inline-block bg-orange px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
            style={{ borderRadius: 2 }}
          >
            Pitch a custom league →
          </Link>
        </div>
      </section>
    </>
  );
}
