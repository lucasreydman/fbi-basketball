export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className="arena-spotlight relative border-b border-rule">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-16">
        <div className="label-mono text-orange">{eyebrow}</div>
        <h1
          className="display-h1 mt-5 text-bone"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ash">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
