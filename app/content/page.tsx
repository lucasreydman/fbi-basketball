import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Content" };

const CATEGORIES = ["All", "Strategy", "Rankings", "World Cup", "Community"] as const;

export default function ContentPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);
  return (
    <>
      <PageHeader
        number="§ 06"
        marker="Content"
        title={
          <>
            The writing that{" "}
            <span className="italic text-accent">runs the conversation.</span>
          </>
        }
        lede="Strategy, rankings explainers, World Cup recaps. Every post free to read. Subscribe via RSS or just bookmark."
      />

      <Container size="2xl" className="py-16 md:py-20">
        <div className="flex flex-wrap gap-2 border-y border-rule py-4">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              type="button"
              className={
                i === 0
                  ? "h-9 px-4 bg-accent font-mono text-[10px] uppercase tracking-[0.22em] text-accent-ink"
                  : "h-9 px-4 border border-rule font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        <Link href={`/content/${featured.slug}`} className="group block">
          <article className="mt-10 grid gap-10 border border-rule bg-canvas-soft p-8 md:p-12 lg:grid-cols-[1fr_280px] transition-colors hover:bg-surface">
            <div>
              <div className="flex items-center gap-4">
                <span className="bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-ink">
                  Featured · {featured.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                  {featured.date} · {featured.readTime} read
                </span>
              </div>
              <h2 className="display-6 mt-7 text-ink group-hover:text-accent-bright transition-colors">
                {featured.title}
              </h2>
              <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.65] text-ink-soft">
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
            </div>
            <div className="hidden lg:block">
              <div className="hardwood h-full border-l border-rule pl-6" />
            </div>
          </article>
        </Link>

        <div className="mt-14 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/content/${p.slug}`}
              className="group flex flex-col gap-5 bg-canvas-soft p-7 transition-colors hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{p.category}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">{p.date}</span>
              </div>
              <h3 className="display-3 text-[1.4rem] leading-tight text-ink group-hover:text-accent-bright transition-colors">
                {p.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-ink-soft flex-1">{p.excerpt}</p>
              <div className="flex items-center justify-between border-t border-rule pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">by {p.author}</span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Read <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
