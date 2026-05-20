import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Container } from "@/components/ui/container";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return { title: post.title };
}

export default async function ContentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <Container size="md" className="py-16 md:py-24">
      <Link
        href="/content"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-accent"
      >
        ← All content
      </Link>

      <header className="mt-10 border-b border-rule pb-12">
        <div className="flex items-center gap-4">
          <span className="bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent-ink">
            {post.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            {post.date} · {post.readTime} read
          </span>
        </div>
        <h1 className="display-6 mt-8 text-ink">
          {post.title}
        </h1>
        <p className="mt-7 text-[19px] leading-[1.55] text-ink-soft">{post.excerpt}</p>
        <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          by {post.author}
        </div>
      </header>

      <div className="mt-12 space-y-7 text-[17px] leading-[1.78] text-ink-soft">
        {post.body.split("\n\n").map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return (
              <h2 key={i} className="display-3 pt-6 text-ink">
                {para.replace(/\*\*/g, "")}
              </h2>
            );
          }
          if (i === 0) {
            return (
              <p
                key={i}
                className="drop-cap"
                dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>'),
                }}
              />
            );
          }
          return (
            <p
              key={i}
              dangerouslySetInnerHTML={{
                __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-medium">$1</strong>'),
              }}
            />
          );
        })}
      </div>

      <footer className="mt-20 border-t border-rule pt-10">
        <div className="label label-accent">Keep going</div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug)
            .slice(0, 2)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/content/${p.slug}`}
                className="group block border border-rule bg-canvas-soft p-5 transition-colors hover:border-accent"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {p.category}
                </div>
                <div className="mt-2.5 display-2 text-[1.15rem] leading-snug text-ink group-hover:text-accent-bright transition-colors">
                  {p.title}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute group-hover:text-accent">
                  Read <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
        </div>
      </footer>
    </Container>
  );
}
