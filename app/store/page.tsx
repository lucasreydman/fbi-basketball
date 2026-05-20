import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data/store";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Store" };

export default function StorePage() {
  return (
    <>
      <PageHeader
        number="§ 07"
        marker="Store"
        title={
          <>
            FBI merch,{" "}
            <span className="italic text-accent">made to wear in.</span>
          </>
        }
        lede="Heavyweight cottons, premium fleeces, unstructured hats. Each piece comes in dark and light variants. Worldwide shipping."
      />

      <Container size="2xl" className="py-16 md:py-20">
        <div className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <div key={p.slug} className="group flex flex-col bg-canvas-soft p-6 transition-colors hover:bg-surface">
              <div className="relative aspect-square overflow-hidden border border-rule bg-canvas">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex h-28 w-28 items-center justify-center border border-accent/30 bg-[var(--accent-soft-bg)] font-display text-accent"
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 400,
                      fontVariationSettings: '"opsz" 48',
                    }}
                  >
                    {p.sku.split(" ")[0]}
                  </div>
                </div>
                <div className="absolute left-0 top-0 bg-accent px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-accent-ink">
                  {p.category}
                </div>
                <div className="absolute right-0 bottom-0 px-2.5 py-1 font-mono text-[10px] tabular text-ink-dim">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between border-b border-rule pb-3">
                <h3 className="text-[15px] text-ink">{p.name}</h3>
                <div className="font-display tabular text-[20px] text-accent" style={{ fontVariationSettings: '"opsz" 36' }}>
                  ${p.price}
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-[1.55] text-ink-soft flex-1">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.variants.slice(0, 3).map((v) => (
                  <span
                    key={v}
                    className="border border-rule px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-mute"
                  >
                    {v}
                  </span>
                ))}
                {p.variants.length > 3 && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                    +{p.variants.length - 3}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="group/cta mt-5 inline-flex h-10 items-center justify-center gap-2 border border-rule font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
              >
                Add to cart
                <ArrowUpRight size={11} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
          Shop integration mocked · production swap to Shopify or Squarespace checkout
        </p>
      </Container>
    </>
  );
}
