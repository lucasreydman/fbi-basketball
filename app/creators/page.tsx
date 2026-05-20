import { ArrowUpRight } from "lucide-react";
import { CREATORS, type FollowLink } from "@/lib/data/creators";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Creators" };

const PLATFORM_LABEL: Record<FollowLink["platform"], string> = {
  Patreon: "Patreon",
  Substack: "Substack",
  X: "X / Twitter",
  YouTube: "YouTube",
};

export default function CreatorsPage() {
  return (
    <>
      <PageHeader
        number="§ 04"
        marker="The voices"
        title={
          <>
            The people behind the rankings, the bracket,{" "}
            <span className="italic text-accent">the takes.</span>
          </>
        }
        lede="Their work stands on its own. Subscribe to whichever feed is yours — Patreon for the publish-day rankings, Substack for the longer analytical pieces, X for everything else."
      />

      <Container size="lg" className="py-20 md:py-28 space-y-28">
        {CREATORS.map((c, i) => {
          const primary = c.links.find((l) => l.primary) ?? c.links[0];
          const secondary = c.links.filter((l) => l !== primary);
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
                    <a
                      href={primary.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between bg-accent px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-ink transition-colors hover:bg-accent-bright"
                    >
                      <span className="truncate">{primary.label}</span>
                      <ArrowUpRight size={12} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    {secondary.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border border-rule px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                      >
                        <span>{PLATFORM_LABEL[l.platform]}</span>
                        <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
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
                </div>
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
