import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container size="md" className="flex min-h-[60vh] flex-col justify-center py-20">
      <div className="label label-accent">404</div>
      <h1 className="display-6 mt-6 text-ink">Off the bracket.</h1>
      <div className="hr hr-accent hr-short mt-7" aria-hidden />
      <p className="mt-7 max-w-prose text-[15.5px] leading-[1.65] text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist — or it lives under a different URL now.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 w-fit items-center gap-2 border border-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent hover:text-accent-ink"
      >
        ← Back to the floor
      </Link>
    </Container>
  );
}
