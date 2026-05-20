import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-6 py-16">
      <div className="label-mono text-orange">404</div>
      <h1
        className="display-h1 mt-4 text-bone"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
      >
        Off the bracket.
      </h1>
      <span className="gold-rule mt-6" aria-hidden />
      <p className="mt-6 max-w-prose text-[14.5px] leading-relaxed text-ash">
        The page you&apos;re looking for doesn&apos;t exist — or it lives under a
        different URL now.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-orange/60 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.24em] text-orange transition-colors hover:bg-orange/10"
        style={{ borderRadius: 2 }}
      >
        ← Back to the floor
      </Link>
    </main>
  );
}
