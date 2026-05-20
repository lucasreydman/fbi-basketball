import { PODCASTS } from "@/lib/data/podcasts";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Podcasts · FBI",
  description: "Balls Deep, NBA Dynasty, Tank Me Later — three fantasy basketball pods, one feed.",
};

export default function PodcastsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Three pods · one feed"
        title={
          <>
            Listen to <span className="italic text-orange">the people who win their leagues.</span>
          </>
        }
        description="The flagship, the dynasty deep-dive, and the rebuild bible. Every episode on Spotify, Apple, and YouTube — free, no member-only nonsense."
      />

      <div className="mx-auto max-w-5xl px-6 py-20">
        {PODCASTS.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            className={`scroll-mt-24 ${i > 0 ? "mt-24 border-t border-rule pt-20" : ""}`}
          >
            <div className="grid gap-10 lg:grid-cols-[180px_1fr]">
              <div>
                <div
                  className="aspect-square w-full bg-gradient-to-br from-orange/30 to-orange-deep flex items-center justify-center font-display text-bone"
                  style={{ borderRadius: 4, fontSize: "3.5rem", fontWeight: 500 }}
                >
                  {p.cover}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={p.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-rule px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
                    style={{ borderRadius: 2 }}
                  >
                    Spotify
                  </a>
                  <a
                    href={p.apple}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-rule px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
                    style={{ borderRadius: 2 }}
                  >
                    Apple
                  </a>
                  <a
                    href={p.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-rule px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
                    style={{ borderRadius: 2 }}
                  >
                    YouTube
                  </a>
                </div>
              </div>

              <div>
                <h2
                  className="display-h2 text-bone"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
                >
                  {p.name}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ash">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
                  <span>Hosts · <span className="text-bone">{p.hosts.join(", ")}</span></span>
                  <span>{p.cadence}</span>
                </div>

                <ul className="mt-9 divide-y divide-rule border-y border-rule">
                  {p.episodes.map((ep) => (
                    <li key={ep.number} className="grid gap-3 py-5 sm:grid-cols-[80px_1fr_80px]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                        ep {ep.number}
                      </span>
                      <div>
                        <div className="text-[15.5px] leading-snug text-bone">{ep.title}</div>
                        <p className="mt-2 text-[13px] leading-relaxed text-ash">{ep.blurb}</p>
                        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                          {ep.date} · {ep.duration}
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <a
                          href={p.spotify}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-orange"
                        >
                          Play →
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
