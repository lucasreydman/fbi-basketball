import Link from "next/link";
import { CREATORS } from "@/lib/data/creators";
import { PODCASTS } from "@/lib/data/podcasts";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Creators · FBI",
};

export default function CreatorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The voices"
        title={
          <>
            The people behind the <span className="italic text-orange">rankings, the bracket, the takes.</span>
          </>
        }
        description="Their work stands on its own. Their Patreons are the move if you want what they publish the day it drops."
      />

      <div className="mx-auto max-w-5xl space-y-24 px-6 py-20">
        {CREATORS.map((c) => {
          const shows = PODCASTS.filter((p) => c.podcasts.includes(p.slug));
          return (
            <section
              key={c.slug}
              id={c.slug}
              className="scroll-mt-24 grid gap-10 lg:grid-cols-[200px_1fr]"
            >
              <div>
                <div
                  className="aspect-square w-full bg-gradient-to-br from-orange/25 to-orange-deep flex items-center justify-center font-display"
                  style={{ borderRadius: "50%", fontSize: "5rem", fontWeight: 500 }}
                >
                  {c.name[0]}
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  {c.patreon && (
                    <a
                      href={c.patreon}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-orange px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
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
                      className="block border border-rule px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
                      style={{ borderRadius: 2 }}
                    >
                      X / Twitter
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h2 className="display-h1 text-[2.25rem] text-bone">{c.name}</h2>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                  {c.handle}
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                  {c.role}
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-ash">{c.longBio}</p>

                <div className="mt-8 border-t border-rule pt-6">
                  <div className="label-mono">On these shows</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {shows.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/podcasts#${s.slug}`}
                        className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash transition-colors hover:border-orange hover:text-bone"
                        style={{ borderRadius: 2 }}
                      >
                        <span className="text-orange">{s.cover}</span>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
