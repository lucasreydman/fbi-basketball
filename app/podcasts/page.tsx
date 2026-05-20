import { ArrowUpRight } from "lucide-react";
import { PODCASTS } from "@/lib/data/podcasts";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Podcasts",
  description: "Balls Deep, NBA Dynasty, Tank Me Later — three fantasy basketball pods, one feed.",
};

export default function PodcastsPage() {
  return (
    <>
      <PageHeader
        number="§ 04"
        marker="Three pods · one feed"
        title={
          <>
            Listen to the people who{" "}
            <span className="italic text-accent">win their own leagues.</span>
          </>
        }
        lede="The flagship, the dynasty deep-dive, and the rebuild bible. Every episode on Spotify, Apple, and YouTube — free, no member-only nonsense."
      />

      <Container size="lg" className="py-20 md:py-28">
        {PODCASTS.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            className={`scroll-mt-24 ${i > 0 ? "mt-24 border-t border-rule pt-24" : ""}`}
          >
            <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
              <div>
                <div
                  className="aspect-square w-full border border-accent/40 bg-gradient-to-br from-[var(--accent-soft-bg)] to-transparent flex items-center justify-center font-display text-accent"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 4.5rem)",
                    fontWeight: 420,
                    fontVariationSettings: '"opsz" 144',
                  }}
                >
                  {p.cover}
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  {[
                    { label: "Spotify", href: p.spotify },
                    { label: "Apple", href: p.apple },
                    { label: "YouTube", href: p.youtube },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border border-rule px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                    >
                      {l.label}
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] tabular text-ink-dim">
                  {String(i + 1).padStart(2, "0")} / 03
                </div>
                <h2 className="display-5 mt-3 text-ink">{p.name}</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-ink-soft">{p.tagline}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 border-y border-rule py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                  <span>Hosts · <span className="text-ink">{p.hosts.join(", ")}</span></span>
                  <span>{p.cadence}</span>
                  <span>{p.episodes.length}+ episodes</span>
                </div>

                <ul className="mt-10 divide-y divide-rule border-b border-rule">
                  {p.episodes.map((ep) => (
                    <li key={ep.number} className="grid gap-3 py-7 sm:grid-cols-[80px_1fr_80px]">
                      <span className="font-mono text-[11px] tabular text-accent">
                        ep {String(ep.number).padStart(3, "0")}
                      </span>
                      <div>
                        <div className="display-3 text-[1.25rem] leading-snug text-ink">{ep.title}</div>
                        <p className="mt-3 text-[14px] leading-[1.65] text-ink-soft">{ep.blurb}</p>
                        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                          {ep.date} · {ep.duration}
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <a
                          href={p.spotify}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-accent"
                        >
                          Play <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
