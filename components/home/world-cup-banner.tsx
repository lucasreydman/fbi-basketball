import Link from "next/link";
import { WORLD_CUP_FORMAT } from "@/lib/data/world-cup";

export function WorldCupBanner() {
  return (
    <section className="border-b border-t border-rule">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-6 py-20">
        <div className="absolute inset-0 court-floor opacity-40" aria-hidden />
        <div className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="label-mono text-orange">FBI World Cup · 2026</div>
            <h2
              className="display-h1 mt-4 text-bone"
              style={{ fontSize: "clamp(2rem, 4.8vw, 3.5rem)" }}
            >
              The bracket that <span className="italic text-orange">means something.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ash">
              Twelve teams. Five seasons of trash talk. The only competitive
              dynasty bracket that runs on invite-only. Registration opens
              September — the waitlist is already 80 deep.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-4 border-t border-rule pt-6">
              <Spec label="Format" value={WORLD_CUP_FORMAT.format} />
              <Spec label="Teams" value={`${WORLD_CUP_FORMAT.teams}`} />
              <Spec label="Draft" value={WORLD_CUP_FORMAT.draftType} />
              <Spec label="Playoffs" value={WORLD_CUP_FORMAT.playoffs} />
              <Spec label="Season" value={WORLD_CUP_FORMAT.regularSeason} />
              <Spec label="Fees" value={WORLD_CUP_FORMAT.fees} />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/world-cup"
                className="bg-orange px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-obsidian transition-colors hover:bg-orange-bright"
                style={{ borderRadius: 2 }}
              >
                World Cup HQ →
              </Link>
              <Link
                href="/world-cup#history"
                className="border border-rule px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-bone transition-colors hover:border-orange"
                style={{ borderRadius: 2 }}
              >
                Past champions
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div
              className="relative h-full overflow-hidden border border-orange/30 bg-orange/5 p-7"
              style={{ borderRadius: 3 }}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange/15 blur-3xl" aria-hidden />
              <div className="relative">
                <div className="label-mono text-orange">Defending champion</div>
                <div
                  className="mt-3 font-display text-bone"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    fontVariationSettings: '"opsz" 96',
                  }}
                >
                  Phoenix Pythons
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  Mortimer Reeves · 2025
                </div>
                <p className="mt-5 text-[14px] leading-relaxed text-ash">
                  Won the final 1,247.2 — 1,198.6 over Brooklyn Black Cats.
                  Reeves rode an SGA / Wemby core to a 4-round bracket sweep,
                  with one of the best AST/TO finals in tournament history.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-orange/30 pt-5">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-orange/80">
                      Final score
                    </div>
                    <div className="mt-1 font-display tabular text-[18px] text-bone">1,247.2</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-orange/80">
                      MVP
                    </div>
                    <div className="mt-1 font-display text-[18px] text-bone">SGA</div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-orange/80">
                      Margin
                    </div>
                    <div className="mt-1 font-display tabular text-[18px] text-bone">+48.6</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-dim">{label}</div>
      <div className="mt-1 text-[13px] text-bone">{value}</div>
    </div>
  );
}
