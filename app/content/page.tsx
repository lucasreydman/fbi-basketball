import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Content · FBI",
};

const CATEGORIES = ["All", "Strategy", "Rankings", "World Cup", "Community"] as const;

export default function ContentPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);
  return (
    <>
      <PageHeader
        eyebrow="Content"
        title={
          <>
            The writing that <span className="italic text-orange">runs the conversation.</span>
          </>
        }
        description="Strategy, rankings explainers, World Cup recaps. Every post free to read. Subscribe via RSS or just bookmark."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-2 border-y border-rule py-4">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              type="button"
              className={`font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 ${i === 0 ? "bg-orange text-obsidian" : "border border-rule text-ash hover:text-bone"}`}
              style={{ borderRadius: 2 }}
            >
              {c}
            </button>
          ))}
        </div>

        <Link href={`/content/${featured.slug}`} className="group block">
          <article className="court-card mt-10 grid gap-8 p-8 lg:grid-cols-[1fr_280px] transition-colors hover:bg-surface" style={{ borderRadius: 3 }}>
            <div>
              <div className="flex items-center gap-3">
                <span className="bg-orange px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian" style={{ borderRadius: 2 }}>
                  Featured · {featured.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
                  {featured.date} · {featured.readTime} read
                </span>
              </div>
              <h2 className="display-h1 mt-5 text-[2.5rem] text-bone group-hover:text-orange-bright">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ash">{featured.excerpt}</p>
              <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                by {featured.author}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="court-floor h-full rounded-sm" />
            </div>
          </article>
        </Link>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/content/${p.slug}`}
              className="group flex flex-col border border-rule bg-canvas-soft p-6 transition-colors hover:border-orange"
              style={{ borderRadius: 3 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">{p.category}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">{p.date}</span>
              </div>
              <h3 className="display-h3 mt-4 text-[1.25rem] leading-tight text-bone group-hover:text-orange-bright">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ash">{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">by {p.author}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
