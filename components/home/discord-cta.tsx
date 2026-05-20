import { DISCORD_URL } from "@/lib/nav";

export function DiscordCta() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div
          className="relative overflow-hidden border border-rule p-12 text-center"
          style={{ borderRadius: 4 }}
        >
          <div className="absolute inset-0 arena-spotlight" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <div className="label-mono text-orange">12k+ members · 8 years live</div>
            <h2
              className="display-h2 mt-5 text-bone"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              The Discord is <span className="italic text-orange">where it actually happens.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ash">
              Daily trade talk, in-game reactions, league-finder threads, mock
              draft rooms, and the channel where Matt drops rankings the second
              they publish. Free, always.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-orange px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-obsidian transition-colors hover:bg-orange-bright"
                style={{ borderRadius: 2 }}
              >
                Join the Discord →
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
                No bots. No spam. Just the league.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
