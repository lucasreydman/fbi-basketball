import Link from "next/link";
import { CREATORS } from "@/lib/data/creators";
import { SectionHeading } from "./section-heading";

export function CreatorsRow() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="The Voices"
        title={
          <>
            Three creators. <span className="italic text-orange">Same standard.</span>
          </>
        }
        description="The people behind the rankings, the bracket, and every take that makes it onto the feed. Their individual work is worth subscribing to, separately."
        cta={{ href: "/creators", label: "Full bios" }}
      />

      <div className="grid gap-px overflow-hidden border border-rule md:grid-cols-3" style={{ borderRadius: 3 }}>
        {CREATORS.map((c) => (
          <div key={c.slug} className="flex flex-col bg-canvas-soft p-6">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center bg-orange/12 font-display text-[24px] text-orange"
                style={{ borderRadius: 999 }}
              >
                {c.name[0]}
              </div>
              <div>
                <div className="display-h3 text-[1.25rem] text-bone">{c.name}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
                  {c.handle}
                </div>
              </div>
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
              {c.role.split(" · ").slice(0, 2).join(" · ")}
            </div>
            <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ash">{c.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-rule pt-4">
              {c.patreon && (
                <a
                  href={c.patreon}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-orange transition-colors hover:bg-orange hover:text-obsidian"
                  style={{ borderRadius: 2 }}
                >
                  Patreon
                </a>
              )}
              {c.twitter && (
                <a
                  href={c.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash transition-colors hover:border-orange hover:text-bone"
                  style={{ borderRadius: 2 }}
                >
                  X
                </a>
              )}
              <Link
                href={`/creators#${c.slug}`}
                className="border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash transition-colors hover:border-orange hover:text-bone"
                style={{ borderRadius: 2 }}
              >
                Bio
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
