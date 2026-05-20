import Link from "next/link";
import { DISCORD_URL } from "@/lib/nav";

export function Hero() {
  return (
    <section className="arena-spotlight relative overflow-hidden border-b border-rule">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 sm:pt-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="label-mono flex items-center gap-3 text-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
            est. 2018 · 12k+ Discord members
          </div>
          <h1
            className="display-h1 mt-6 text-bone"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.25rem)" }}
          >
            Fantasy basketball,{" "}
            <span className="italic text-orange">played for keeps.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ash">
            Dynasty &amp; redraft leagues that actually fill, the FBI World Cup,
            three pods worth listening to, and tools built by people who win
            their own leagues. No Substack-grade hot takes. No analytics
            wallpaper. Just the stuff that holds up at the trade deadline.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-orange px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-obsidian transition-colors hover:bg-orange-bright"
              style={{ borderRadius: 2 }}
            >
              Join the Discord →
            </a>
            <Link
              href="/world-cup"
              className="border border-rule px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-bone transition-colors hover:border-orange"
              style={{ borderRadius: 2 }}
            >
              The 2026 World Cup
            </Link>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-rule pt-8">
            <Stat label="Years running" value="8" />
            <Stat label="Leagues filled" value="40+" />
            <Stat label="World Cups" value="5" />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="court-card overflow-hidden" style={{ borderRadius: 3 }}>
            <div className="border-b border-rule px-5 py-3.5">
              <div className="label-mono text-orange">Now on air</div>
            </div>
            <div className="space-y-4 p-5">
              {[
                { tag: "BD", title: "Trade Deadline Fallout", show: "Balls Deep · ep 184", time: "1h 12m" },
                { tag: "ND", title: "The 2027 Rookie Tier Reset", show: "NBA Dynasty · ep 96", time: "52m" },
                { tag: "TML", title: "Pick Inflation — The Math", show: "Tank Me Later · ep 41", time: "1h 17m" },
              ].map((ep) => (
                <Link
                  key={ep.title}
                  href="/podcasts"
                  className="group flex items-center gap-4 border border-rule p-3 transition-colors hover:border-orange"
                  style={{ borderRadius: 2 }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center bg-orange/12 font-mono text-[11px] font-bold tracking-tight text-orange"
                    style={{ borderRadius: 2 }}
                  >
                    {ep.tag}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] text-bone group-hover:text-orange-bright">
                      {ep.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ash-dim">
                      {ep.show} · {ep.time}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-rule px-5 py-3 text-center">
              <Link
                href="/podcasts"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-orange"
              >
                All shows →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="font-display tabular text-bone"
        style={{
          fontSize: "2rem",
          lineHeight: 1,
          fontWeight: 500,
          fontVariationSettings: '"opsz" 96',
        }}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
        {label}
      </div>
    </div>
  );
}
