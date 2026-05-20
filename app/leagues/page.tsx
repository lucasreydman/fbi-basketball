import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LEAGUE_OFFERINGS } from "@/lib/data/leagues";
import { DISCORD_URL } from "@/lib/nav";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Leagues" };

const STATUS: Record<string, { label: string; tone: string }> = {
  open:     { label: "Open · register now",  tone: "text-positive border-positive/40" },
  waitlist: { label: "Waitlist · contact",   tone: "text-accent border-accent/40" },
  full:     { label: "Full · closed",        tone: "text-ink-dim border-rule" },
};

export default function LeaguesPage() {
  return (
    <>
      <PageHeader
        number="§ 01"
        marker="Run with us"
        title={
          <>
            Every format we run,{" "}
            <span className="italic text-accent">in plain language.</span>
          </>
        }
        lede="Commissioner-run, vet-managed, low-fee or no-fee. We don't run gambling leagues; we run leagues."
      />

      <Container size="2xl" className="py-16 md:py-20 space-y-px bg-rule border border-rule">
        {LEAGUE_OFFERINGS.map((l, i) => {
          const status = STATUS[l.spots];
          return (
            <article
              key={l.slug}
              className="grid gap-8 bg-canvas-soft p-8 md:p-10 lg:grid-cols-[80px_1fr_auto] lg:items-start"
            >
              <div>
                <div className="font-mono text-[11px] tabular text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                  Format
                </div>
              </div>

              <div className="lg:max-w-2xl">
                <h2 className="display-4 text-ink">{l.name}</h2>
                <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent">
                  {l.format}  ·  {l.size}  ·  {l.cadence}
                </div>
                <p className="mt-6 text-[15.5px] leading-[1.65] text-ink-soft">{l.blurb}</p>

                <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {l.details.map((d) => (
                    <li
                      key={d}
                      className="grid grid-cols-[16px_1fr] items-start gap-3 border-t border-rule pt-3 text-[13.5px] text-ink-soft"
                    >
                      <span className="mt-1 font-mono text-[10px] text-accent">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="flex flex-col items-start gap-4 lg:items-end">
                <span className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] ${status.tone}`}>
                  {status.label}
                </span>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 border border-accent px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  {l.spots === "open" ? "Register" : "Get on list"}
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </aside>
            </article>
          );
        })}
      </Container>

      {/* Custom league */}
      <section className="border-t border-rule bg-canvas-soft">
        <Container size="lg" className="py-20 md:py-24 text-center">
          <div className="label label-accent">Custom league</div>
          <h3 className="display-4 mt-5 max-w-2xl mx-auto text-ink">
            Got 11 friends and a format that doesn&apos;t fit any of these?
          </h3>
          <p className="mt-6 max-w-xl mx-auto text-[15px] leading-[1.65] text-ink-soft">
            We&apos;ll commish it. Auction, salary cap, contract leagues, sim leagues —
            if it&apos;s basketball and you bring the people, we&apos;ll bring the spreadsheets.
          </p>
          <Link
            href={DISCORD_URL}
            className="group mt-9 inline-flex h-12 items-center gap-2 bg-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
          >
            Pitch a custom league
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Container>
      </section>
    </>
  );
}
