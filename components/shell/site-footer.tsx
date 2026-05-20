import Link from "next/link";
import {
  PRIMARY_NAV,
  DISCORD_URL,
  TWITTER_URL,
  YOUTUBE_URL,
  EMAIL_URL,
} from "@/lib/nav";
import { Seal, SealWatermark } from "@/components/ui/seal";

const COLOPHON = [
  { k: "Built", v: "Next.js 16 · React 19" },
  { k: "Type", v: "Source Serif 4 · Bricolage · IBM Plex Mono" },
  { k: "Hosted", v: "Vercel — Toronto / Sydney edges" },
  { k: "Established", v: "Year of our Lord 2018" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-[2] mt-32 overflow-hidden border-t border-rule bg-canvas-soft">
      <SealWatermark className="-right-32 -bottom-40 -rotate-12 hidden md:block" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        {/* Massive serif tagline as the footer header — editorial */}
        <div className="grid gap-10 border-b border-rule pb-16 lg:grid-cols-[1fr_auto]">
          <h2 className="display-5 max-w-3xl text-ink">
            The world&apos;s premier{" "}
            <span className="italic text-accent">fantasy basketball</span>{" "}
            community.
          </h2>
          <div className="flex items-end gap-6">
            <Seal size={72} />
            <div>
              <div className="label">Volume 8 · 2026</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                Toronto / Sydney
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Manifesto */}
          <div>
            <div className="label label-accent">Manifesto</div>
            <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-ink-soft">
              FBI has been the basketball room for managers who take this
              seriously, but not so seriously they stop laughing.
              Dynasty &amp; redraft leagues that actually fill. A World Cup
              that means something. Three pods. One Discord that runs the day.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <FootBtn href={DISCORD_URL} primary>
                Discord
              </FootBtn>
              <FootBtn href={TWITTER_URL}>X / Twitter</FootBtn>
              <FootBtn href={YOUTUBE_URL}>YouTube</FootBtn>
              <FootBtn href={EMAIL_URL}>Email</FootBtn>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <div className="label">Sections</div>
            <ul className="mt-5 space-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-ink-mute transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label">Community</div>
            <ul className="mt-5 space-y-3 text-[14px] text-ink-mute">
              <li>
                <Link href="/world-cup" className="hover:text-ink">
                  FBI World Cup
                </Link>
              </li>
              <li>
                <Link href="/creators" className="hover:text-ink">
                  Meet the creators
                </Link>
              </li>
              <li>
                <Link href="/leagues" className="hover:text-ink">
                  Run with us
                </Link>
              </li>
              <li>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink"
                >
                  Join the Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Colophon */}
          <div>
            <div className="label">Colophon</div>
            <dl className="mt-5 space-y-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
              {COLOPHON.map((c) => (
                <div key={c.k}>
                  <dt className="text-ink-dim">{c.k}</dt>
                  <dd className="mt-1 text-ink-soft">{c.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            © Fantasy Basketball International · 2018 — 2026
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            Built by community, for community.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FootBtn({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={
        primary
          ? "inline-flex h-9 items-center gap-2 bg-accent px-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-ink transition-colors hover:bg-accent-bright"
          : "inline-flex h-9 items-center gap-2 border border-rule px-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
      }
    >
      {children}
    </a>
  );
}
