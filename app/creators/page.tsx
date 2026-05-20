import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CREATORS } from "@/lib/data/creators";
import { PODCASTS } from "@/lib/data/podcasts";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Creators" };

export default function CreatorsPage() {
  return (
    <>
      <PageHeader
        number="§ 05"
        marker="The voices"
        title={
          <>
            The people behind the rankings, the bracket,{" "}
            <span className="italic text-accent">the takes.</span>
          </>
        }
        lede="Their work stands on its own. Their Patreons are the move if you want what they publish the day it drops."
      />

      <Container size="lg" className="py-20 md:py-28 space-y-28">
        {CREATORS.map((c, i) => {
          const shows = PODCASTS.filter((p) => c.podcasts.includes(p.slug));
          return (
            <section
              key={c.slug}
              id={c.slug}
              className={`scroll-mt-24 ${i > 0 ? "border-t border-rule pt-28" : ""}`}
            >
              <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
                <div>
                  <div
                    className="aspect-square w-full border border-accent/40 bg-gradient-to-br from-[var(--accent-soft-bg)] to-transparent flex items-center justify-center font-display text-accent"
                    style={{
                      fontSize: "clamp(4rem, 9vw, 7rem)",
                      fontWeight: 400,
                      fontVariationSettings: '"opsz" 144',
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <div className="mt-5 flex flex-col gap-2">
                    {c.patreon && (
                      <a
                        href={c.patreon}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between bg-accent px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-ink transition-colors hover:bg-accent-bright"
                      >
                        Patreon <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {c.twitter && (
                      <a
                        href={c.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border border-rule px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                      >
                        X / Twitter <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] tabular text-ink-dim">
                    {String(i + 1).padStart(2, "0")} / 03
                  </div>
                  <h2 className="display-5 mt-3 text-ink">{c.name}</h2>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                    {c.handle}
                  </div>
                  <div className="mt-5 border-y border-rule py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {c.role}
                  </div>
                  <p className="mt-8 drop-cap text-[16px] leading-[1.7] text-ink-soft">{c.longBio}</p>

                  <div className="mt-10 border-t border-rule pt-6">
                    <div className="label">On these shows</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {shows.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/podcasts#${s.slug}`}
                          className="inline-flex items-center gap-2 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                        >
                          <span className="text-accent">{s.cover}</span>
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
