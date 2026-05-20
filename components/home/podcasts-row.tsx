import Link from "next/link";
import { PODCASTS } from "@/lib/data/podcasts";
import { SectionHeading } from "./section-heading";

export function PodcastsRow() {
  return (
    <section className="border-t border-rule bg-canvas-soft">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Three pods. One feed."
          title={
            <>
              The shows that <span className="italic text-orange">anchor the week.</span>
            </>
          }
          description="Balls Deep is the flagship. NBA Dynasty is Matt's deep-dive ranking work. Tank Me Later is the rebuild bible. New episode every couple of days."
          cta={{ href: "/podcasts", label: "All episodes" }}
        />

        <div className="grid gap-px overflow-hidden border border-rule md:grid-cols-3" style={{ borderRadius: 3 }}>
          {PODCASTS.map((p) => (
            <Link
              key={p.slug}
              href={`/podcasts#${p.slug}`}
              className="group flex flex-col bg-canvas p-6 transition-colors hover:bg-surface"
            >
              <div
                className="flex h-14 w-14 items-center justify-center bg-orange/15 font-mono text-[14px] font-bold tracking-tight text-orange"
                style={{ borderRadius: 3 }}
              >
                {p.cover}
              </div>
              <h3 className="display-h3 mt-5 text-[1.5rem] text-bone group-hover:text-orange-bright">
                {p.name}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ash">{p.tagline}</p>

              <div className="mt-5 border-t border-rule pt-4">
                <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ash-dim">
                  Latest episode
                </div>
                <div className="mt-2 text-[14px] leading-snug text-bone">
                  {p.episodes[0].title}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                  ep {p.episodes[0].number} · {p.episodes[0].duration}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash" style={{ borderRadius: 2 }}>
                  Spotify
                </span>
                <span className="border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash" style={{ borderRadius: 2 }}>
                  YouTube
                </span>
                <span className="border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash" style={{ borderRadius: 2 }}>
                  Apple
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
