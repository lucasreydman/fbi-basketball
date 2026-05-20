import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import {
  PRIMARY_NAV,
  DISCORD_URL,
  TWITTER_URL,
  YOUTUBE_URL,
  EMAIL_URL,
} from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="relative z-[2] mt-24 border-t border-rule bg-canvas-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Wordmark size="md" />
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ash">
            The world&apos;s premier fantasy basketball community. Dynasty &
            redraft leagues, the FBI World Cup, three pods, and a full toolkit
            for serious managers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-orange px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
              style={{ borderRadius: 2 }}
            >
              Discord
            </a>
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
              style={{ borderRadius: 2 }}
            >
              X / Twitter
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
              style={{ borderRadius: 2 }}
            >
              YouTube
            </a>
            <a
              href={EMAIL_URL}
              className="border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:border-orange hover:text-bone"
              style={{ borderRadius: 2 }}
            >
              Email
            </a>
          </div>
        </div>

        <div>
          <div className="label-mono">Explore</div>
          <ul className="mt-4 space-y-2.5">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[14px] text-ash transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="label-mono">Community</div>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] text-ash transition-colors hover:text-bone"
              >
                Join the Discord
              </a>
            </li>
            <li>
              <Link
                href="/world-cup"
                className="text-[14px] text-ash transition-colors hover:text-bone"
              >
                FBI World Cup
              </Link>
            </li>
            <li>
              <Link
                href="/creators"
                className="text-[14px] text-ash transition-colors hover:text-bone"
              >
                Meet the creators
              </Link>
            </li>
            <li>
              <Link
                href="/leagues"
                className="text-[14px] text-ash transition-colors hover:text-bone"
              >
                Run with us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
            © Fantasy Basketball International 2026 · est. 2018
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
            Built by community, for community.
          </p>
        </div>
      </div>
    </footer>
  );
}
