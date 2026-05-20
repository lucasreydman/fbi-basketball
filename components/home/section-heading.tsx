import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="mb-12 grid items-end gap-8 sm:grid-cols-[1fr_auto]">
      <div>
        <div className="label-mono text-orange">{eyebrow}</div>
        <h2
          className="display-h2 mt-4 text-bone"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ash">
            {description}
          </p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-orange"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}
