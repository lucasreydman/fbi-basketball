"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";

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
    <Container size="md" className="flex min-h-[60vh] flex-col justify-center py-20">
      <div className="label label-accent">Error · 500</div>
      <h1 className="display-6 mt-6 text-ink">
        Air ball.
      </h1>
      <div className="hr hr-accent hr-short mt-7" aria-hidden />
      <p className="mt-7 max-w-prose text-[15.5px] leading-[1.65] text-ink-soft">
        We hit an unexpected error rendering this view. Try once more — if it
        keeps happening, the issue is on our side and we&apos;re already looking.
      </p>
      {error.digest && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
          ref · <span className="tabular text-ink-mute">{error.digest}</span>
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex h-12 w-fit items-center gap-2 bg-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
      >
        Try again →
      </button>
    </Container>
  );
}
