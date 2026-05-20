import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import { SectionHeading } from "./section-heading";

export function ContentRow() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1, 4);

  return (
    <section className="border-t border-rule bg-canvas-soft">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Latest Content"
          title={
            <>
              Writing that <span className="italic text-orange">holds up at the deadline.</span>
            </>
          }
          description="Strategy, rankings, World Cup recaps, community pieces. Free to read, no paywall, no email-gate."
          cta={{ href: "/content", label: "All posts" }}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Featured */}
          <Link
            href={`/content/${featured.slug}`}
            className="group lg:col-span-7"
          >
            <article className="court-card flex h-full flex-col p-7 transition-colors hover:bg-surface" style={{ borderRadius: 3 }}>
              <div className="flex items-center gap-3">
                <span
                  className="bg-orange px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian"
                  style={{ borderRadius: 2 }}
                >
                  {featured.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                  {featured.date} · {featured.readTime} read
                </span>
              </div>
              <h3
                className="display-h2 mt-6 text-bone group-hover:text-orange-bright"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)" }}
              >
                {featured.title}
              </h3>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ash">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                  by {featured.author}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                  Read →
                </span>
              </div>
            </article>
          </Link>

          {/* Side list */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/content/${p.slug}`}
                className="group block border border-rule bg-canvas p-5 transition-colors hover:border-orange"
                style={{ borderRadius: 3 }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
                    {p.date}
                  </span>
                </div>
                <h4 className="mt-3 text-[16.5px] leading-snug text-bone group-hover:text-orange-bright">
                  {p.title}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-ash line-clamp-2">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
