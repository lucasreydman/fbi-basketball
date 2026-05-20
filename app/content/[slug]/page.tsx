import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not found · FBI" };
  return { title: `${post.title} · FBI` };
}

export default async function ContentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/content"
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-orange"
      >
        ← Back to content
      </Link>

      <header className="mt-8 border-b border-rule pb-10">
        <div className="flex items-center gap-3">
          <span
            className="bg-orange px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian"
            style={{ borderRadius: 2 }}
          >
            {post.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash-dim">
            {post.date} · {post.readTime} read
          </span>
        </div>
        <h1
          className="display-h1 mt-6 text-bone"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
        >
          {post.title}
        </h1>
        <p className="mt-6 text-[18px] leading-relaxed text-ash">{post.excerpt}</p>
        <div className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
          by {post.author}
        </div>
      </header>

      <div className="mt-10 space-y-6 text-[16px] leading-[1.75] text-ash">
        {post.body.split("\n\n").map((para, i) =>
          para.startsWith("**") && para.endsWith("**") ? (
            <h2
              key={i}
              className="display-h3 pt-4 text-[1.4rem] text-bone"
            >
              {para.replace(/\*\*/g, "")}
            </h2>
          ) : (
            <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-bone">$1</strong>') }} />
          ),
        )}
      </div>

      <footer className="mt-16 border-t border-rule pt-10">
        <div className="label-mono text-orange">Keep going</div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/content/${p.slug}`}
                className="group block border border-rule p-5 transition-colors hover:border-orange"
                style={{ borderRadius: 2 }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange">
                  {p.category}
                </div>
                <div className="mt-2 text-[14.5px] leading-snug text-bone group-hover:text-orange-bright">
                  {p.title}
                </div>
              </Link>
            ))}
        </div>
      </footer>
    </article>
  );
}
