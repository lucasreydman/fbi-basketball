"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EditorialHeader, EditorialSection } from "./editorial-section";

export function ContentRow() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1, 4);

  return (
    <EditorialSection className="border-t border-rule bg-canvas-soft">
      <EditorialHeader
        number="§ 05"
        marker="Latest content"
        title={
          <>
            Writing that <span className="italic text-accent">holds up at the deadline.</span>
          </>
        }
        lede="Strategy, rankings explainers, World Cup recaps, community pieces — pulled from the creators' own Substacks and the league commissioners' notes. Free to read."
        cta={{ href: "/content", label: "All posts" }}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        {/* Featured — full editorial card */}
        <Reveal className="lg:col-span-7">
          <Link href={`/content/${featured.slug}`} className="group block">
            <article className="relative border border-rule bg-canvas p-8 md:p-10 transition-colors hover:bg-surface">
              <div className="flex items-center gap-4">
                <span className="bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-ink">
                  Featured · {featured.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                  {featured.date} · {featured.readTime} read
                </span>
              </div>
              <h3 className="display-5 mt-7 text-ink group-hover:text-accent-bright transition-colors">
                {featured.title}
              </h3>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.65] text-ink-soft">
                {featured.excerpt}
              </p>
              <div className="mt-9 flex items-center justify-between border-t border-rule pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  by {featured.author}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Read <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          </Link>
        </Reveal>

        {/* Side list */}
        <Stagger className="flex flex-col gap-4 lg:col-span-5">
          {rest.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/content/${p.slug}`}
                className="group block border border-rule bg-canvas p-6 transition-colors hover:border-accent hover:bg-surface"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                    {p.date}
                  </span>
                </div>
                <h4 className="display-2 mt-4 text-[1.25rem] leading-snug text-ink group-hover:text-accent-bright transition-colors">
                  {p.title}
                </h4>
                <p className="mt-2 text-[13px] leading-[1.6] text-ink-soft line-clamp-2">
                  {p.excerpt}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </EditorialSection>
  );
}
