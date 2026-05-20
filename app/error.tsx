"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[fbi error]", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-6 py-16">
      <div className="label-mono text-orange">Error</div>
      <h1
        className="display-h1 mt-4 text-bone"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
      >
        Air ball.
      </h1>
      <span className="gold-rule mt-6" aria-hidden />
      <p className="mt-6 max-w-prose text-[14.5px] leading-relaxed text-ash">
        We hit an unexpected error rendering this view. Try once more — if it
        keeps happening, the issue is on our side and we&apos;re already looking.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-dim">
          ref · <span className="tabular text-ash">{error.digest}</span>
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 bg-orange px-6 py-3 font-mono text-[12px] uppercase tracking-[0.24em] text-obsidian transition-colors hover:bg-orange-bright"
        style={{ borderRadius: 2 }}
      >
        Try again →
      </button>
    </main>
  );
}
